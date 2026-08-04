import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ArrowRight, MessageCircle, Radar, Zap } from 'lucide-react';
import { categories } from '../../data/siteContent';
import { getProductsByCategory } from '../../data/products';
import './Header.css';

const megaMenuImages = {
  'remote-power-supply-systems': '/images/remote-power-container.webp',
  lidars: '/images/lidars-mega-menu.webp',
};
const defaultMegaMenuImage = '/images/field-turbine-hills.webp';

// Max rendered height of the header bar (the unscrolled 84px state) — used
// as the clearance threshold below so the header slides away before it can
// ever paint over the footer at the bottom of short mobile pages.
const HEADER_CLEARANCE = 84;

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [nearBottom, setNearBottom] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(categories[0].slug);
  const location = useLocation();
  const closeTimer = useRef(null);
  const menuItemRef = useRef(null);
  const menuTriggerRef = useRef(null);
  const mobileTriggerRef = useRef(null);
  const mobilePanelRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const distanceFromBottom =
        document.documentElement.scrollHeight - window.scrollY - window.innerHeight;
      // A lazy route initially renders a short loading shell. At scrollY 0
      // that shell can look "near the bottom" until the page chunk mounts,
      // so never hide the primary navigation while the user is still at the
      // top of the page.
      setNearBottom(window.scrollY > HEADER_CLEARANCE && distanceFromBottom < HEADER_CLEARANCE);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
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

  useEffect(() => {
    if (!mobileOpen) return undefined;

    const panel = mobilePanelRef.current;
    panel?.focus({ preventScroll: true });

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
        mobileTriggerRef.current?.focus();
        return;
      }
      if (event.key !== 'Tab' || !panel) return;

      const focusable = panel.querySelectorAll('a[href], button:not([disabled])');
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === panel)) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    const onResize = () => {
      if (window.innerWidth > 900) setMobileOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
    };
  }, [mobileOpen]);

  const openMega = () => {
    clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 140);
  };
  const closeMegaNow = () => {
    clearTimeout(closeTimer.current);
    setMegaOpen(false);
  };
  const onMenuItemBlur = (event) => {
    if (!menuItemRef.current?.contains(event.relatedTarget)) {
      closeMegaNow();
    }
  };
  const onMenuItemKeyDown = (event) => {
    if (event.key === 'Escape' && megaOpen) {
      closeMegaNow();
      menuTriggerRef.current?.focus();
    }
  };

  const isSolid = scrolled || mobileOpen;
  const isDarkText = isSolid || location.pathname !== '/';
  const isHidden = nearBottom && !mobileOpen && !megaOpen;

  return (
    <>
      <header
        className={`site-header ${isSolid ? 'site-header--solid' : ''} ${
          isDarkText ? 'site-header--dark-text' : ''
        } ${mobileOpen ? 'site-header--menu-open' : ''} ${isHidden ? 'site-header--hidden' : ''}`}
      >
      <div className="container site-header__inner">
        <Link to="/" className="site-header__brand" aria-label="ThinkMetric home">
          <img
            src={mobileOpen || !isDarkText ? '/brand/logo-light.png' : '/brand/logo-primary.png'}
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
            ref={menuItemRef}
            onMouseEnter={openMega}
            onMouseLeave={scheduleClose}
            onFocus={openMega}
            onBlur={onMenuItemBlur}
            onKeyDown={onMenuItemKeyDown}
          >
            <Link
              to="/products"
              ref={menuTriggerRef}
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
            ref={mobileTriggerRef}
            className="site-header__burger"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      </header>

      {mobileOpen && <MobileNav ref={mobilePanelRef} onNavigate={() => setMobileOpen(false)} />}
    </>
  );
}

function MobileNav({ onNavigate, ref }) {
  return (
    <div
      id="mobile-navigation"
      ref={ref}
      className="mobile-nav"
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
    >
      <div className="container mobile-nav__inner">
        <div className="mobile-nav__layout">
          <section className="mobile-nav__primary" aria-labelledby="mobile-menu-label">
            <p id="mobile-menu-label" className="mobile-nav__eyebrow">Menu</p>
            <nav className="mobile-nav__main-links" aria-label="Mobile primary navigation">
              <Link to="/" className="mobile-nav__link" onClick={onNavigate}>
                <span className="mobile-nav__link-label">Home</span>
              </Link>
            </nav>
          </section>

          <section className="mobile-nav__products" aria-labelledby="mobile-products-label">
            <p id="mobile-products-label" className="mobile-nav__eyebrow">Products</p>
            <Link to="/products" className="mobile-nav__view-all" onClick={onNavigate}>
              View all products
            </Link>
            <div className="mobile-nav__product-list">
              <Link to="/products/remote-power-supply-systems" className="mobile-nav__product-card" onClick={onNavigate}>
                <span className="mobile-nav__product-icon" aria-hidden="true"><Zap size={24} /></span>
                <span className="mobile-nav__product-copy">
                  <strong>Power Solutions</strong>
                </span>
              </Link>
              <Link to="/products/lidars" className="mobile-nav__product-card" onClick={onNavigate}>
                <span className="mobile-nav__product-icon" aria-hidden="true"><Radar size={24} /></span>
                <span className="mobile-nav__product-copy">
                  <strong>Lidars</strong>
                </span>
              </Link>
            </div>
          </section>

          <section className="mobile-nav__secondary">
            <nav className="mobile-nav__main-links" aria-label="Mobile secondary navigation">
              <Link to="/about" className="mobile-nav__link" onClick={onNavigate}>
                <span className="mobile-nav__link-label">About Us</span>
              </Link>
            </nav>
          </section>
        </div>

        <aside className="mobile-nav__cta" aria-label="Contact ThinkMetric">
          <span className="mobile-nav__cta-icon" aria-hidden="true"><MessageCircle size={23} /></span>
          <span className="mobile-nav__cta-copy">
            <strong>Have a project in mind?</strong>
            <small>Let&apos;s build the future together.</small>
          </span>
          <Link to="/contact" className="mobile-nav__cta-link" onClick={onNavigate}>
            Contact us
          </Link>
        </aside>
      </div>
    </div>
  );
}

export default Header;
