import { describe, expect, it } from 'vitest';
import {
  buildContactMailto,
  initialContactForm,
  validateContactForm,
} from './contactForm';

describe('contact form rules', () => {
  it('reports every required field on an empty submission', () => {
    expect(validateContactForm(initialContactForm)).toEqual({
      name: 'Enter your full name.',
      email: 'Enter your email.',
      company: 'Enter your company.',
      country: 'Select your country.',
      message: 'Describe your project.',
      consent: 'Please confirm you agree before submitting.',
    });
  });

  it('accepts a complete valid inquiry', () => {
    const form = {
      ...initialContactForm,
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      company: 'Analytical Engines',
      country: 'United Kingdom',
      message: 'We need a wind measurement campaign.',
      consent: true,
    };
    expect(validateContactForm(form)).toEqual({});
  });

  it('routes technical inquiries to sales with encoded content', () => {
    const href = buildContactMailto({
      ...initialContactForm,
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      company: 'Analytical Engines',
      inquiryType: 'technical',
      message: 'LiDAR & power',
    });
    expect(href).toContain('mailto:sales@think-metric.co');
    expect(decodeURIComponent(href)).toContain('Technical discussion — Analytical Engines');
    expect(decodeURIComponent(href)).toContain('LiDAR & power');
  });

  it('routes general inquiries to the sales mailbox too', () => {
    const href = buildContactMailto({
      ...initialContactForm,
      name: 'Grace Hopper',
      company: 'Navy',
      inquiryType: 'general',
      message: 'General inquiry',
    });
    expect(href).toContain('mailto:sales@think-metric.co');
  });
});
