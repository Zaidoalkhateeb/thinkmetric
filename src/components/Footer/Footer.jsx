import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">
            THINK<span>METRIC</span>
          </span>
          <p>Precision wind measurement hardware and analytics software.</p>
        </div>

        <nav className="footer__links">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <p className="footer__copy">© {year} ThinkMetric. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
