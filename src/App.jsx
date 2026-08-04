import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Component, lazy, Suspense, useLayoutEffect } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ScrollFlow from './components/ScrollFlow/ScrollFlow';
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton';

const Home = lazy(() => import('./pages/Home/Home'));
const Products = lazy(() => import('./pages/Products/Products'));
const ProductCategory = lazy(() => import('./pages/ProductCategory/ProductCategory'));
const ProductDetail = lazy(() => import('./pages/ProductDetail/ProductDetail'));
const About = lazy(() => import('./pages/About/About'));
const Contact = lazy(() => import('./pages/Contact/Contact'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <div className="app">
        <ScrollFlow />
        <Header />
        <main id="main-content">
          <RouteErrorBoundary>
            <Suspense fallback={<RouteLoading />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/detail/:productSlug" element={<ProductDetail />} />
                <Route path="/products/:categorySlug" element={<ProductCategory />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </RouteErrorBoundary>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </BrowserRouter>
  );
}

function RouteLoading() {
  return (
    <div className="route-loading" role="status" aria-live="polite">
      <span className="route-loading__spinner" aria-hidden="true" />
      <span className="visually-hidden">Loading page</span>
    </div>
  );
}

class RouteErrorBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) {
      return (
        <section className="route-error" role="alert">
          <h1>We couldn&apos;t load this page</h1>
          <p>Please check your connection and try again.</p>
          <button type="button" className="btn btn--primary" onClick={() => window.location.reload()}>
            Reload page
          </button>
        </section>
      );
    }
    return this.props.children;
  }
}

export default App;
