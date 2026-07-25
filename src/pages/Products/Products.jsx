import SectionHeader from '../../components/SectionHeader/SectionHeader';
import './Products.css';

const products = [
  {
    tag: 'Hardware',
    name: 'WindSense Pro',
    tagline: 'Ultra-precision sonic anemometer.',
    description:
      'Class-leading accuracy (±0.1 m/s) with zero moving parts. Engineered to survive 25 years in brutal offshore environments with IP68 rating.',
    specs: ['±0.1 m/s accuracy', 'IP68 rated', '25-year lifespan', 'No moving parts'],
  },
  {
    tag: 'Hardware',
    name: 'GaleGuard Mast',
    tagline: 'Modular measurement mast system.',
    description:
      'A corrosion-resistant, self-supporting mast built to hold a full sensor array steady through category 5 wind loads.',
    specs: ['Up to 120m height', 'Category 5 rated', 'Modular sections', 'Rapid deployment'],
  },
  {
    tag: 'Software',
    name: 'MetricCloud Analytics',
    tagline: 'Predictive wind intelligence platform.',
    description:
      'Cloud software that ingests billions of data points from your sensor network and turns them into forecasts, alerts, and yield predictions.',
    specs: ['Real-time dashboards', 'ML-based forecasting', 'API access', '99.9% uptime SLA'],
  },
];

function Products() {
  return (
    <section className="page">
      <div className="container">
        <SectionHeader
          eyebrow="The Arsenal"
          title="Precision instruments for extreme conditions."
          description="From physical sensors facing category 5 hurricanes to cloud platforms processing billions of data points. Every tool is built with uncompromising quality."
        />

        <div className="products">
          {products.map((product, index) => (
            <article
              key={product.name}
              className={`product-card ${index % 2 === 1 ? 'product-card--reverse' : ''}`}
            >
              <div className="product-card__media">
                <span className="product-card__tag">{product.tag}</span>
              </div>

              <div className="product-card__body">
                <h3>{product.name}</h3>
                <p className="product-card__tagline">{product.tagline}</p>
                <p className="product-card__description">{product.description}</p>
                <ul className="product-card__specs">
                  {product.specs.map((spec) => (
                    <li key={spec}>{spec}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Products;
