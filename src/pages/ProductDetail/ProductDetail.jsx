import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEO from '../../components/SEO/SEO';
import Reveal from '../../components/Reveal/Reveal';
import PdfAction from '../../components/PdfAction/PdfAction';
import { categoryIcons } from '../../components/IconMark/IconMark';
import { categories, siteUrl } from '../../data/siteContent';
import { getProductBySlug } from '../../data/products';
import './ProductDetail.css';

function ProductDetail() {
  const { productSlug } = useParams();
  const product = getProductBySlug(productSlug);

  if (!product) return <Navigate to="/products" replace />;

  const category = categories.find((c) => c.slug === product.categorySlug);
  const Icon = category ? categoryIcons[category.icon] : null;

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
          <Link to={`/products/${product.categorySlug}`} className="category-back category-back--top">
            <ArrowLeft size={16} aria-hidden="true" /> Back to {category ? category.shortLabel : 'all products'}
          </Link>

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

              {product.specifications.length > 0 && (
                <div className="product-detail__specs">
                  <h2 className="product-detail__section-title">Specifications</h2>
                  <dl>
                    {product.specifications.map((spec) => (
                      <div className="product-detail__specs-row" key={spec.label}>
                        <dt>{spec.label}</dt>
                        <dd>{spec.value}</dd>
                      </div>
                    ))}
                  </dl>
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

              {product.categorySlug !== 'remote-power-supply-systems' && (
                <div className="product-detail__pdf">
                  <h2 className="product-detail__section-title">Datasheet</h2>
                  <PdfAction pdfUrl={product.pdfUrl} modelName={product.modelName} />
                </div>
              )}
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductDetail;
