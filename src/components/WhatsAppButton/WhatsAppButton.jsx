import { useEffect, useRef, useState } from 'react';
import { Mail, MessageCircle, Phone, X } from 'lucide-react';
import { contact } from '../../data/siteContent';
import './WhatsAppButton.css';

// +90 541 340 36 89, digits only, as required by the wa.me click-to-chat link.
const WHATSAPP_NUMBER = '905413403689';

function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [nearFooter, setNearFooter] = useState(false);
  const scrollTimer = useRef(null);

  // Fade the button out while the page is actively moving so it never sits
  // on top of the line of text the user is mid-scroll toward, and hide it
  // entirely once the footer (which repeats the same contact details) is
  // in view, so it doesn't cover its own duplicate content there.
  useEffect(() => {
    const footer = document.querySelector('.site-footer');

    const onScroll = () => {
      setScrolling(true);
      clearTimeout(scrollTimer.current);
      scrollTimer.current = setTimeout(() => setScrolling(false), 250);

      if (footer) {
        const footerTop = footer.getBoundingClientRect().top;
        setNearFooter(footerTop < window.innerHeight);
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(scrollTimer.current);
    };
  }, []);

  const isFaded = (scrolling || nearFooter) && !open;

  return (
    <div className={`floating-contact ${open ? 'is-open' : ''} ${isFaded ? 'is-faded' : ''}`}>
      <button
        type="button"
        className="floating-contact__toggle"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? 'Close contact options' : 'Show contact options'}
      >
        {open ? <X size={22} aria-hidden="true" /> : <MessageCircle size={22} aria-hidden="true" />}
      </button>

      <a
        href={contact.phoneHref}
        className="floating-contact__btn"
        aria-label={`Call ThinkMetric at ${contact.phoneDisplay}`}
      >
        <Phone size={24} aria-hidden="true" />
        <span className="floating-contact__tip" aria-hidden="true">
          {contact.phoneDisplay}
        </span>
      </a>
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-contact__btn"
        aria-label={`Chat with ThinkMetric on WhatsApp at ${contact.phoneDisplay}`}
      >
        <svg viewBox="0 0 448 512" width="26" height="26" fill="currentColor" aria-hidden="true">
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
        </svg>
        <span className="floating-contact__tip" aria-hidden="true">
          {contact.phoneDisplay}
        </span>
      </a>
      <a
        href={`mailto:${contact.generalEmail}`}
        className="floating-contact__btn"
        aria-label={`Email ThinkMetric at ${contact.generalEmail}`}
      >
        <Mail size={24} aria-hidden="true" />
        <span className="floating-contact__tip" aria-hidden="true">
          {contact.generalEmail}
        </span>
      </a>
      <a
        href="https://www.linkedin.com/showcase/think-metric/"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-contact__btn"
        aria-label="ThinkMetric on LinkedIn"
      >
        <svg viewBox="0 0 448 512" width="22" height="22" fill="currentColor" aria-hidden="true">
          <path d="M100.28 448H7.4V148.9h92.88zm-46.44-340C24.09 108 0 83.5 0 53.24a53.24 53.24 0 0 1 106.48 0C106.48 83.5 82.35 108 53.84 108zM447.9 448h-92.68V302.4c0-34.7-.7-79.3-48.29-79.3-48.29 0-55.7 37.7-55.7 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.28 61.9 111.28 142.3z" />
        </svg>
        <span className="floating-contact__tip" aria-hidden="true">
          LinkedIn
        </span>
      </a>
    </div>
  );
}

export default WhatsAppButton;
