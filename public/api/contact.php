<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

const RECIPIENT = 'sales@think-metric.co';
const SENDER = 'no-reply@think-metric.co';
const MAX_BODY_BYTES = 32768;
const RATE_WINDOW_SECONDS = 600;
const RATE_MAX_REQUESTS = 5;

function respond(int $status, array $payload): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function text_value(array $data, string $key, int $maxLength): string
{
    $value = isset($data[$key]) && is_string($data[$key]) ? trim($data[$key]) : '';
    $length = function_exists('mb_strlen') ? mb_strlen($value, 'UTF-8') : strlen($value);
    return $length <= $maxLength ? $value : '';
}

function header_value(string $value): string
{
    return trim((string) preg_replace('/[\r\n]+/', ' ', $value));
}

function enforce_rate_limit(): void
{
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $path = sys_get_temp_dir() . '/thinkmetric-contact-' . hash('sha256', $ip) . '.json';
    $handle = @fopen($path, 'c+');
    if ($handle === false || !flock($handle, LOCK_EX)) {
        if (is_resource($handle)) fclose($handle);
        return;
    }

    $contents = stream_get_contents($handle);
    $decoded = $contents ? json_decode($contents, true) : [];
    $attempts = is_array($decoded) ? $decoded : [];
    $cutoff = time() - RATE_WINDOW_SECONDS;
    $attempts = array_values(array_filter($attempts, static function ($timestamp) use ($cutoff): bool {
        return is_int($timestamp) && $timestamp >= $cutoff;
    }));

    if (count($attempts) >= RATE_MAX_REQUESTS) {
        flock($handle, LOCK_UN);
        fclose($handle);
        respond(429, ['ok' => false, 'message' => 'Too many requests. Please try again later.']);
    }

    $attempts[] = time();
    ftruncate($handle, 0);
    rewind($handle);
    fwrite($handle, json_encode($attempts));
    fflush($handle);
    flock($handle, LOCK_UN);
    fclose($handle);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['ok' => false, 'message' => 'Method not allowed.']);
}

$contentLength = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
if ($contentLength <= 0 || $contentLength > MAX_BODY_BYTES) {
    respond(413, ['ok' => false, 'message' => 'Invalid request size.']);
}

// Same-origin browser requests only. This is not the primary security layer,
// but it prevents other websites from posting directly to this form handler.
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$host = strtolower((string) preg_replace('/:\d+$/', '', $_SERVER['HTTP_HOST'] ?? ''));
if ($origin !== '') {
    $originHost = strtolower((string) parse_url($origin, PHP_URL_HOST));
    if ($originHost === '' || $originHost !== $host) {
        respond(403, ['ok' => false, 'message' => 'Origin not allowed.']);
    }
}

$raw = file_get_contents('php://input');
$data = is_string($raw) ? json_decode($raw, true) : null;
if (!is_array($data)) {
    respond(400, ['ok' => false, 'message' => 'Invalid JSON request.']);
}

// Honeypot: bots commonly fill every field. Return success without sending so
// the endpoint does not teach automated spam clients how they were detected.
if (text_value($data, 'website', 200) !== '') {
    respond(200, ['ok' => true]);
}

enforce_rate_limit();

$name = text_value($data, 'name', 120);
$email = text_value($data, 'email', 254);
$company = text_value($data, 'company', 160);
$country = text_value($data, 'country', 100);
$inquiryType = text_value($data, 'inquiryType', 40);
$interest = text_value($data, 'interest', 160);
$message = text_value($data, 'message', 5000);
$consent = isset($data['consent']) && $data['consent'] === true;

if (
    $name === '' || $company === '' || $country === '' || $message === '' || !$consent ||
    !filter_var($email, FILTER_VALIDATE_EMAIL)
) {
    respond(422, ['ok' => false, 'message' => 'Please complete all required fields correctly.']);
}

$safeName = header_value($name);
$safeCompany = header_value($company);
$safeEmail = header_value($email);
$subjectText = 'Website inquiry - ' . ($safeCompany !== '' ? $safeCompany : $safeName);
$subject = '=?UTF-8?B?' . base64_encode($subjectText) . '?=';

$body = implode("\n", [
    'New ThinkMetric website inquiry',
    '--------------------------------',
    'Name: ' . $name,
    'Email: ' . $email,
    'Company: ' . $company,
    'Country: ' . $country,
    'Inquiry type: ' . ($inquiryType !== '' ? $inquiryType : 'General'),
    'Category interest: ' . ($interest !== '' ? $interest : 'N/A'),
    '',
    'Project description:',
    $message,
    '',
    'Consent to contact: Yes',
    'Submitted: ' . gmdate('Y-m-d H:i:s') . ' UTC',
]);

$headers = implode("\r\n", [
    'From: ThinkMetric Website <' . SENDER . '>',
    'Reply-To: ' . $safeEmail,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'X-Mailer: ThinkMetric Contact Form',
]);

if (!mail(RECIPIENT, $subject, $body, $headers)) {
    error_log('ThinkMetric contact form: mail() returned false');
    respond(502, ['ok' => false, 'message' => 'Email delivery failed. Please contact sales directly.']);
}

respond(200, ['ok' => true]);
