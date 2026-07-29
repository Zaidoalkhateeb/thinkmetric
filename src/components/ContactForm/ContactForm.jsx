import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowRight, Check, CheckCircle2 } from 'lucide-react';
import CustomSelect from '../CustomSelect/CustomSelect';
import { contact } from '../../data/siteContent';
import { countries } from '../../data/countries';
import './ContactForm.css';

const countryOptions = countries.map((c) => ({ value: c, label: c }));

const inquiryTypes = [
  { value: 'sales', label: 'Sales' },
  { value: 'general', label: 'General' },
  { value: 'corporate', label: 'Corporate' },
  { value: 'technical', label: 'Technical discussion' },
];

const categoryOptions = [
  'Environmental LiDAR',
  'Wind Measurement — LiDAR',
  'Power Solutions',
];

const initialForm = {
  name: '',
  email: '',
  company: '',
  country: '',
  inquiryType: 'general',
  interest: '',
  message: '',
  consent: false,
};

function routeEmail(inquiryType) {
  return inquiryType === 'general' ? contact.generalEmail : contact.salesEmail;
}

function ContactForm() {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [shake, setShake] = useState(false);
  const errorSummaryRef = useRef(null);

  const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT;

  useEffect(() => {
    const type = searchParams.get('type');
    const product = searchParams.get('product');
    setForm((prev) => ({
      ...prev,
      inquiryType: inquiryTypes.some((t) => t.value === type) ? type : prev.inquiryType,
      interest: product || prev.interest,
    }));
  }, [searchParams]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleBlur = (event) => {
    setTouched((prev) => ({ ...prev, [event.target.name]: true }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Enter your full name.';
    if (!form.email.trim()) {
      next.email = 'Enter your email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'Enter a valid email address.';
    }
    if (!form.company.trim()) next.company = 'Enter your company.';
    if (!form.country.trim()) next.country = 'Select your country.';
    if (!form.message.trim()) next.message = 'Describe your project.';
    if (!form.consent) next.consent = 'Please confirm you agree before submitting.';
    return next;
  };

  const buildMailtoHref = () => {
    const to = routeEmail(form.inquiryType);
    const subject = encodeURIComponent(
      `${inquiryTypes.find((t) => t.value === form.inquiryType)?.label || 'Inquiry'} — ${form.company || form.name}`
    );
    const bodyLines = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Company: ${form.company}`,
      `Country: ${form.country}`,
      `Inquiry type: ${inquiryTypes.find((t) => t.value === form.inquiryType)?.label}`,
      `Category interest: ${form.interest || 'N/A'}`,
      '',
      'Project description:',
      form.message,
    ];
    const body = encodeURIComponent(bodyLines.join('\n'));
    return `mailto:${to}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validation = validate();
    setErrors(validation);

    if (Object.keys(validation).length > 0) {
      setTouched({ name: true, email: true, company: true, country: true, message: true, consent: true });
      setShake(true);
      setTimeout(() => setShake(false), 420);
      requestAnimationFrame(() => errorSummaryRef.current?.focus());
      return;
    }

    setSubmitting(true);

    if (endpoint) {
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error('Request failed');
        setSubmitted(true);
      } catch {
        setErrors({ submit: 'The form endpoint could not be reached. Use the email option below instead.' });
      } finally {
        setSubmitting(false);
      }
      return;
    }

    // No backend configured — honest fallback: open a prefilled email draft.
    // A brief, deliberate delay keeps the loading state perceptible rather
    // than flashing instantly for what is otherwise a synchronous action.
    await new Promise((resolve) => setTimeout(resolve, 550));
    window.location.href = buildMailtoHref();
    setSubmitting(false);
    setSubmitted(true);
  };

  const resetForm = () => {
    setForm(initialForm);
    setErrors({});
    setTouched({});
    setSubmitted(false);
  };

  const errorList = useMemo(() => Object.entries(errors).filter(([k]) => k !== 'submit'), [errors]);

  const interestOptions = useMemo(() => {
    const opts = categoryOptions.map((c) => ({ value: c, label: c }));
    if (form.interest && !categoryOptions.includes(form.interest)) {
      opts.push({ value: form.interest, label: form.interest });
    }
    return opts;
  }, [form.interest]);

  if (submitted) {
    return (
      <div className="contact-form contact-form__success-panel">
        <span className="contact-form__success-check">
          <CheckCircle2 size={40} aria-hidden="true" />
        </span>
        <h3>Inquiry Sent Successfully</h3>
        <p>
          {endpoint
            ? "Thanks — we've received your message and will be in touch soon."
            : 'Your email client should now open with your inquiry pre-filled. If it did not, please email us directly below.'}
        </p>
        <p className="contact-form__success-note">
          Thank you for contacting ThinkMetric. Our team will respond within one business day.
        </p>
        <button type="button" className="btn btn--secondary btn--sm" onClick={resetForm}>
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <form className={`contact-form ${shake ? 'contact-form--shake' : ''}`} onSubmit={handleSubmit} noValidate>
      {errorList.length > 0 && (
        <div
          className="contact-form__error-summary"
          role="alert"
          tabIndex={-1}
          ref={errorSummaryRef}
        >
          <p>Please fix the following before submitting:</p>
          <ul>
            {errorList.map(([field, msg]) => (
              <li key={field}>
                <a href={`#field-${field}`}>{msg}</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {errors.submit && (
        <div className="contact-form__error-summary" role="alert">
          <p>{errors.submit}</p>
        </div>
      )}

      <div className="contact-form__row">
        <Field
          id="field-name"
          label="Full name"
          name="name"
          value={form.name}
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched.name}
          error={errors.name}
          autoComplete="name"
          required
        />
        <Field
          id="field-email"
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched.email}
          error={errors.email}
          autoComplete="email"
          required
        />
      </div>

      <div className="contact-form__row">
        <Field
          id="field-company"
          label="Company"
          name="company"
          value={form.company}
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched.company}
          error={errors.company}
          autoComplete="organization"
          required
        />
        <CustomSelect
          id="field-country"
          label="Country"
          name="country"
          value={form.country}
          onChange={handleChange}
          options={countryOptions}
          placeholder="Select your country"
          searchable
          error={errors.country}
          required
        />
      </div>

      <div className="contact-form__row">
        <CustomSelect
          id="field-inquiryType"
          label="Inquiry type"
          name="inquiryType"
          value={form.inquiryType}
          onChange={handleChange}
          options={inquiryTypes}
        />
        <CustomSelect
          id="field-interest"
          label="Category interest"
          name="interest"
          value={form.interest}
          onChange={handleChange}
          options={interestOptions}
          placeholder="Select an option"
        />
      </div>

      <Field
        id="field-message"
        label="Project description"
        name="message"
        as="textarea"
        rows={5}
        value={form.message}
        onChange={handleChange}
        onBlur={handleBlur}
        touched={touched.message}
        error={errors.message}
        required
      />

      <label className="contact-form__consent" htmlFor="field-consent">
        <input
          type="checkbox"
          id="field-consent"
          name="consent"
          checked={form.consent}
          onChange={handleChange}
          aria-invalid={!!errors.consent}
          aria-describedby={errors.consent ? 'field-consent-error' : undefined}
        />
        <span>
          I agree that ThinkMetric may contact me about this inquiry using the details provided above.
        </span>
      </label>
      {errors.consent && (
        <span className="contact-form__field-error" id="field-consent-error">
          {errors.consent}
        </span>
      )}

      <button type="submit" className="btn btn--primary contact-form__submit" disabled={submitting}>
        {submitting ? (
          <>
            <span className="contact-form__spinner" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            Send Inquiry
            <ArrowRight size={16} className="contact-form__submit-arrow" aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  name,
  value,
  onChange,
  onBlur,
  touched,
  error,
  type = 'text',
  as = 'input',
  rows,
  autoComplete,
  required,
}) {
  const isValid = touched && !error && String(value).trim().length > 0;
  const Tag = as;

  return (
    <div className={`contact-form__field ${error ? 'has-error' : ''} ${isValid ? 'is-valid' : ''}`}>
      <label htmlFor={id}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      <div className="contact-form__field-control">
        <Tag
          id={id}
          name={name}
          type={as === 'input' ? type : undefined}
          rows={as === 'textarea' ? rows : undefined}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        {isValid && <Check size={16} className="contact-form__field-check" aria-hidden="true" />}
      </div>
      {error && (
        <span className="contact-form__field-error" id={`${id}-error`}>
          {error}
        </span>
      )}
    </div>
  );
}

export default ContactForm;
