import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { categories } from '../../data/siteContent';
import { categoryIcons } from '../IconMark/IconMark';
import './Header.css';

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const closeTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const openMega = () => {
    clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 140);
  };

  const isSolid = scrolled || mobileOpen;
  const isDarkText = isSolid || location.pathname !== '/';

  return (
    <header
      className={`site-header ${isSolid ? 'site-header--solid' : ''} ${
        isDarkText ? 'site-header--dark-text' : ''
      }`}
    >
      <div className="container site-header__inner">
        <Link to="/" className="site-header__brand" aria-label="ThinkMetric home">
          <img
            src={isDarkText ? '/brand/logo-primary.png' : '/brand/logo-light.png'}
            alt="ThinkMetric"
            className="site-header__logo"
          />
        </Link>

        <nav className="site-header__nav" aria-label="Primary">
          <NavLink to="/" end className={({ isActive }) => `site-header__link ${isActive ? 'is-active' : ''}`}>
            Home
          </NavLink>

          <div
            className="site-header__menu-item"
            onMouseEnter={openMega}
            onMouseLeave={scheduleClose}
          >
            <button
              type="button"
              className={`site-header__link site-header__link--btn ${megaOpen ? 'is-active' : ''}`}
              aria-expanded={megaOpen}
              aria-haspopup="true"
              onClick={() => setMegaOpen((v) => !v)}
            >
              Products &amp; Services
              <ChevronDown size={15} aria-hidden="true" />
            </button>

            {megaOpen && (
              <div className="mega-menu" role="menu" onMouseEnter={openMega} onMouseLeave={scheduleClose}>
                <div className="mega-menu__grid">
                  {categories.map((cat) => {
                    const Icon = categoryIcons[cat.icon];
                    return (
                      <Link key={cat.slug} to={`/products/${cat.slug}`} className="mega-menu__item" role="menuitem">
                        <span className="mega-menu__icon">
                          <Icon aria-hidden="true" />
                        </span>
                        <span>
                          <span className="mega-menu__title">{cat.label}</span>
                          <span className="mega-menu__desc">{cat.description}</span>
                        </span>
                      </Link>
                    );
                  })}
                </div>
                <Link to="/products" className="mega-menu__all" role="menuitem">
                  View all products &amp; services <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </div>
            )}
          </div>

          <NavLink to="/about" className={({ isActive }) => `site-header__link ${isActive ? 'is-active' : ''}`}>
            About Us
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => `site-header__link ${isActive ? 'is-active' : ''}`}>
            Contact Us
          </NavLink>
        </nav>

        <div className="site-header__actions">
          <button
            type="button"
            className="site-header__burger"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && <MobileNav onNavigate={() => setMobileOpen(false)} />}
    </header>
  );
}

function MobileNav({ onNavigate }) {
  return (
    <div className="mobile-nav" role="dialog" aria-modal="true" aria-label="Mobile navigation">
      <div className="container mobile-nav__inner">
        <Link to="/" className="mobile-nav__link" onClick={onNavigate}>
          Home
        </Link>

        <p className="mobile-nav__group-label">Products &amp; Services</p>
        <div className="mobile-nav__sublist">
          {categories.map((cat) => (
            <Link key={cat.slug} to={`/products/${cat.slug}`} className="mobile-nav__sublink" onClick={onNavigate}>
              {cat.label}
            </Link>
          ))}
          <Link to="/products" className="mobile-nav__sublink mobile-nav__sublink--all" onClick={onNavigate}>
            View all products &amp; services
          </Link>
        </div>

        <Link to="/about" className="mobile-nav__link" onClick={onNavigate}>
          About Us
        </Link>
        <Link to="/contact" className="mobile-nav__link" onClick={onNavigate}>
          Contact Us
        </Link>
      </div>
    </div>
  );
}

export default Header;
