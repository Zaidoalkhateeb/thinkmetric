import { useState } from 'react';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import Button from '../../components/Button/Button';
import './Contact.css';

const offices = [
  { city: 'Copenhagen', role: 'HQ / Key Market' },
  { city: 'London', role: 'Regional Office' },
  { city: 'Istanbul', role: 'Primary Market — Turkey' },
];

const initialForm = {
  name: '',
  email: '',
  interest: '',
  message: '',
};

function Contact() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    setForm(initialForm);
  };

  return (
    <section className="page">
      <div className="container">
        <SectionHeader
          align="center"
          eyebrow="Get In Touch"
          title="Connect with ThinkMetric"
          description="Serving wind energy operators across Europe with a primary focus on Turkey's rapidly growing renewable energy market. Our team is ready to help."
        />

        <div className="contact-grid">
          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              Name
              <input
                type="text"
                name="name"
                placeholder="Your full name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Email
              <input
                type="email"
                name="email"
                placeholder="your@company.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Product Interest
              <input
                type="text"
                name="interest"
                placeholder="e.g. WindSense Pro Hardware"
                value={form.interest}
                onChange={handleChange}
              />
            </label>

            <label>
              Message
              <textarea
                name="message"
                rows={5}
                placeholder="Tell us about your project or wind farm..."
                value={form.message}
                onChange={handleChange}
                required
              />
            </label>

            <Button type="submit">Submit →</Button>

            {submitted && (
              <p className="contact-form__success">
                Thanks — we&apos;ve received your message and will be in touch soon.
              </p>
            )}
          </form>

          <div className="offices">
            <h3>Our Offices</h3>
            <ul>
              {offices.map((office) => (
                <li key={office.city} className="office">
                  <span className="office__dot" />
                  <div>
                    <p className="office__city">{office.city}</p>
                    <p className="office__role">{office.role}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
