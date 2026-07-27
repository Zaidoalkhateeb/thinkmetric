import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEO from '../../components/SEO/SEO';
import Reveal from '../../components/Reveal/Reveal';
import PdfAction from '../../components/PdfAction/PdfAction';
import ProductCard from '../../components/ProductCard/ProductCard';
import { categoryIcons } from '../../components/IconMark/IconMark';
import { categories, siteUrl } from '../../data/siteContent';
import { getProductBySlug, getRelatedProducts } from '../../data/products';
import './ProductDetail.css';

function ProductDetail() {
  const { productSlug } = useParams();
  const product = getProductBySlug(productSlug);

  if (!product) return <Navigate to="/products" replace />;

  const category = categories.find((c) => c.slug === product.categorySlug);
  const Icon = category ? categoryIcons[category.icon] : null;
  const related = getRelatedProducts(product);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.modelName,
    category: product.categoryLabel,
    description: product.summary,
    url: `${siteUrl}/products/detail/${product.slug}`,
  };

  return (
    <>
      <SEO
        title={`${product.modelName} — ${product.productType}`}
        description={product.summary}
        path={`/products/detail/${product.slug}`}
        jsonLd={jsonLd}
      />

      <section className="section product-detail">
        <div className="container">
          <nav aria-label="Breadcrumb" className="breadcrumbs">
            <Link to="/products">Products &amp; Services</Link>
            <span aria-hidden="true">/</span>
            <Link to={`/products/${product.categorySlug}`}>{product.categoryLabel}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{product.modelName}</span>
          </nav>

          <div className="product-detail__grid">
            <Reveal as="div" variant="left" className="product-detail__media">
              {product.image ? (
                <img src={product.image} alt={product.modelName} />
              ) : (
                <div className="product-detail__placeholder" aria-hidden="true">
                  {Icon && <Icon />}
                  <span className="mono">Product visual placeholder — {product.modelName}</span>
                </div>
              )}
            </Reveal>

            <Reveal as="div" variant="right" delay={100} className="product-detail__body">
              <span className="tag-pill">{product.productType}</span>
              <h1 className="product-detail__title">{product.modelName}</h1>
              <p className="product-detail__summary">{product.summary}</p>

              {product.features.length > 0 && (
                <div className="product-detail__features">
                  <h2 className="product-detail__section-title">Key Features</h2>
                  <ul>
                    {product.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </div>
              )}

              {product.applications.length > 0 && (
                <div className="product-detail__applications">
                  <h2 className="product-detail__section-title">Typical Applications</h2>
                  <ul className="category-hero__tags">
                    {product.applications.map((app) => (
                      <li key={app} className="tag-pill">
                        {app}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {product.optionalExtras.length > 0 && (
                <div className="product-detail__extras">
                  <h2 className="product-detail__section-title">Optional Extras</h2>
                  <ul>
                    {product.optionalExtras.map((e) => (
                      <li key={e}>{e}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="product-detail__pdf">
                <h2 className="product-detail__section-title">Datasheet</h2>
                <PdfAction pdfUrl={product.pdfUrl} modelName={product.modelName} />
              </div>

              <Link
                to={`/contact?type=sales&product=${encodeURIComponent(product.modelName)}`}
                className="btn btn--primary product-detail__contact-cta"
              >
                Contact Sales About {product.modelName}
              </Link>

              <Link to={`/products/${product.categorySlug}`} className="category-back">
                <ArrowLeft size={16} aria-hidden="true" /> Back to {product.categoryLabel}
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section section--fog">
          <div className="container">
            <span className="eyebrow">Related Products</span>
            <h2 className="home-section__title">More from {product.categoryLabel}</h2>
            <div className="product-catalog__grid">
              {related.map((p, i) => (
                <Reveal key={p.slug} variant="up" delay={i * 90}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default ProductDetail;
