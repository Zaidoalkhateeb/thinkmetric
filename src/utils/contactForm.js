import { contact } from '../data/siteContent';

export const inquiryTypes = [
  { value: 'sales', label: 'Sales' },
  { value: 'general', label: 'General' },
  { value: 'corporate', label: 'Corporate' },
  { value: 'technical', label: 'Technical discussion' },
];

export const initialContactForm = {
  name: '',
  email: '',
  company: '',
  country: '',
  inquiryType: 'general',
  interest: '',
  message: '',
  consent: false,
  website: '',
};

export function validateContactForm(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Enter your full name.';
  if (!form.email.trim()) {
    errors.email = 'Enter your email.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Enter a valid email address.';
  }
  if (!form.company.trim()) errors.company = 'Enter your company.';
  if (!form.country.trim()) errors.country = 'Select your country.';
  if (!form.message.trim()) errors.message = 'Describe your project.';
  if (!form.consent) errors.consent = 'Please confirm you agree before submitting.';
  return errors;
}

export function buildContactMailto(form) {
  const inquiryLabel = inquiryTypes.find((type) => type.value === form.inquiryType)?.label || 'Inquiry';
  const to = contact.salesEmail;
  const subject = encodeURIComponent(`${inquiryLabel} — ${form.company || form.name}`);
  const body = encodeURIComponent(
    [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Company: ${form.company}`,
      `Country: ${form.country}`,
      `Inquiry type: ${inquiryLabel}`,
      `Category interest: ${form.interest || 'N/A'}`,
      '',
      'Project description:',
      form.message,
    ].join('\n')
  );
  return `mailto:${to}?subject=${subject}&body=${body}`;
}
