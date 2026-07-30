import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { categories } from '../../data/siteContent';
import { getProductsByCategory } from '../../data/products';
import './Header.css';

const megaMenuImages = {
  'remote-power-supply-systems': '/images/remote-power-container.webp',
  lidars: '/images/lidars-mega-menu.webp',
};
const defaultMegaMenuImage = '/images/field-turbine-hills.webp';

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(categories[0].slug);
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
            <Link
              to="/products"
              className={`site-header__link ${megaOpen ? 'is-active' : ''}`}
              aria-expanded={megaOpen}
              aria-haspopup="true"
            >
              Products &amp; Services
              <ChevronDown size={15} aria-hidden="true" />
            </Link>

            {megaOpen && (
              <div className="mega-menu" role="menu" onMouseEnter={openMega} onMouseLeave={scheduleClose}>
                <div className="mega-menu__body">
                  <div className="mega-menu__sidebar">
                    {categories.map((cat) => (
                      <Link
                        key={cat.slug}
                        to={`/products/${cat.slug}`}
                        className={`mega-menu__tab ${activeCategory === cat.slug ? 'is-active' : ''}`}
                        onMouseEnter={() => setActiveCategory(cat.slug)}
                        onFocus={() => setActiveCategory(cat.slug)}
                        role="menuitem"
                      >
                        {cat.shortLabel}
                      </Link>
                    ))}
                  </div>

                  {categories.map((cat) => {
                    if (cat.slug !== activeCategory) return null;
                    const catProducts = getProductsByCategory(cat.slug);
                    const mid = Math.ceil(catProducts.length / 2);
                    const columns = [catProducts.slice(0, mid), catProducts.slice(mid)];

                    return (
                      <div className="mega-menu__panel" key={cat.slug}>
                        {catProducts.length > 0 ? (
                          <div className="mega-menu__columns">
                            {columns.map((col, i) => (
                              <ul className="mega-menu__list" key={i}>
                                {col.map((p) => (
                                  <li key={p.slug}>
                                    <Link to={`/products/detail/${p.slug}`} className="mega-menu__product" role="menuitem">
                                      <span className="mega-menu__bullet" aria-hidden="true" />
                                      <span>{p.modelName}</span>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            ))}
                          </div>
                        ) : (
                          <div className="mega-menu__empty">
                            <p>{cat.description}</p>
                            <Link to={`/products/${cat.slug}`} className="mega-menu__empty-link" role="menuitem">
                              View category <ArrowRight size={14} aria-hidden="true" />
                            </Link>
                          </div>
                        )}
                      </div>
                    );
                  })}

                  <div
                    className={`mega-menu__media ${activeCategory === 'lidars' ? 'mega-menu__media--contain' : ''}`}
                    aria-hidden="true"
                  >
                    <img src={megaMenuImages[activeCategory] || defaultMegaMenuImage} alt="" />
                  </div>
                </div>
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
