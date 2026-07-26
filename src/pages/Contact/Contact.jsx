import { Mail, Phone, MapPin } from 'lucide-react';
import SEO from '../../components/SEO/SEO';
import ContactForm from '../../components/ContactForm/ContactForm';
import TurkeyMap from '../../components/TurkeyMap/TurkeyMap';
import Reveal from '../../components/Reveal/Reveal';
import ScrollIndicator from '../../components/ScrollIndicator/ScrollIndicator';
import { contact, location } from '../../data/siteContent';
import './Contact.css';

const otherWaysToReachUs = [
  {
    label: 'General Enquiries',
    value: contact.generalEmail,
    href: `mailto:${contact.generalEmail}`,
    icon: Mail,
  },
  {
    label: 'Sales  Enquiries',
    value: contact.salesEmail,
    href: `mailto:${contact.salesEmail}`,
    icon: Mail,
  },
  {
    label: 'Phone',
    value: contact.phoneDisplay,
    href: contact.phoneHref,
    icon: Phone,
  },
  {
    label: 'Address',
    value: location.label,
    href: location.mapsUrl,
    icon: MapPin,
    external: true,
  },
];

function Contact() {
  return (
    <>
      <SEO
        title="Contact ThinkMetric"
        description="Get in touch with ThinkMetric's technical and sales team, based in Istanbul, Türkiye."
        path="/contact"
      />

      <section className="page-hero contact-hero">
        <picture className="contact-hero__photo" aria-hidden="true">
          <source srcSet="/media/thinkmetric-hero-poster.webp" type="image/webp" />
          <img src="/media/thinkmetric-hero-poster.jpg" alt="" loading="eager" />
        </picture>
        <div className="contact-hero__tint" aria-hidden="true" />
        <div className="contact-hero__bg" aria-hidden="true" />
        <div className="container">
          <Reveal variant="fade">
            <span className="eyebrow">Get In Touch</span>
          </Reveal>
          <Reveal variant="up" delay={80}>
            <h1 className="page-hero__title">
              Connect with
              <br />
              ThinkMetric
            </h1>
          </Reveal>
          <Reveal variant="up" delay={160}>
            <p className="page-hero__lede">
              Whether you&apos;re planning a wind resource campaign, an atmospheric research programme, or
              need a remote power solution. Our team is ready to help.
            </p>
          </Reveal>
        </div>
        <ScrollIndicator />
      </section>

      <section className="section">
        <div className="container contact-grid">
          <Reveal as="div" variant="left" className="contact-grid__form">
            <span className="eyebrow">Send an Inquiry</span>
            <h2 className="home-section__title">Tell us about your project</h2>
            <ContactForm />
          </Reveal>
          <Reveal as="div" variant="right" delay={120} className="contact-grid__map">
            <span className="eyebrow">Location</span>
            <h2 className="home-section__title">{location.label}</h2>
            <TurkeyMap />
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal variant="fade">
            <span className="eyebrow">Other Ways to Reach Us</span>
          </Reveal>
          <div className="contact-cards">
            {otherWaysToReachUs.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.label} variant="up" delay={i * 90}>
                  <a
                    href={item.href}
                    className="contact-card"
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                  >
                    <span className="contact-card__icon">
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    <div>
                      <span className="contact-card__label">{item.label}</span>
                      <span className="contact-card__value">{item.value}</span>
                    </div>
                  </a>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
