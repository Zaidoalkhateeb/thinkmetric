import { Link } from 'react-router-dom';
import { Mail, Phone } from 'lucide-react';
import { brand, contact, location, categories } from '../../data/siteContent';
import { LocationIcon } from '../IconMark/IconMark';
import './Footer.css';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__col site-footer__brand-col">
          <img src="/brand/logo-light.png" alt={brand.name} className="site-footer__logo" />
          <p className="site-footer__tagline">
            Environmental measurement, remote monitoring, and autonomous power technologies for renewable
            energy and industrial applications.
          </p>
        </div>

        <div className="site-footer__col site-footer__col--company">
          <h3 className="site-footer__heading">Company</h3>
          <ul className="site-footer__list">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Products &amp; Services</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>

        <div className="site-footer__col">
          <h3 className="site-footer__heading">Products &amp; Services</h3>
          <ul className="site-footer__list">
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link to={`/products/${cat.slug}`}>{cat.shortLabel}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="site-footer__col">
          <h3 className="site-footer__heading">Contact Us</h3>
          <ul className="site-footer__list site-footer__contact-list">
            <li>
              <a href={`mailto:${contact.generalEmail}`}>
                <Mail size={15} aria-hidden="true" /> {contact.generalEmail}
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.salesEmail}`}>
                <Mail size={15} aria-hidden="true" /> {contact.salesEmail}
              </a>
            </li>
            <li>
              <a href={contact.phoneHref}>
                <Phone size={15} aria-hidden="true" /> {contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={location.mapsUrl} target="_blank" rel="noopener noreferrer">
                <LocationIcon aria-hidden="true" /> {location.label}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
