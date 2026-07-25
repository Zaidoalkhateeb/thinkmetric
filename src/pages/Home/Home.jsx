import Button from '../../components/Button/Button';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import './Home.css';

const features = [
  {
    title: 'Zero moving parts',
    description:
      'Sonic sensing technology means nothing to wear out, even after decades in the field.',
  },
  {
    title: 'Offshore-grade durability',
    description:
      'IP68-rated hardware engineered to survive category 5 hurricanes and salt-air corrosion.',
  },
  {
    title: 'Real-time analytics',
    description:
      'Cloud platforms process billions of data points to turn raw wind readings into forecasts.',
  },
];

function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero__inner">
          <span className="hero__eyebrow">
            <span className="hero__dot" /> Redefining wind analytics
          </span>
          <h1>
            Data clarity you&apos;ve <span className="highlight">never had before.</span>
          </h1>
          <p className="hero__description">
            ThinkMetric engineers the world&apos;s most precise wind measurement
            hardware and predictive analytics software. No guessing. Just
            absolute truth.
          </p>
          <div className="hero__actions">
            <Button to="/products">Explore Products →</Button>
            <Button to="/contact" variant="secondary">
              Talk to an Engineer
            </Button>
          </div>
        </div>
      </section>

      <section className="page">
        <div className="container">
          <SectionHeader
            align="center"
            eyebrow="Why ThinkMetric"
            title="Built for the harshest conditions"
            description="From physical sensors facing extreme weather to cloud platforms processing billions of data points, every tool is built with uncompromising quality."
          />

          <div className="feature-grid">
            {features.map((feature) => (
              <div key={feature.title} className="feature-card">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container cta__inner">
          <h2>Ready to see it in action?</h2>
          <p>
            Explore our lineup of hardware and software, or get in touch with
            our engineering team.
          </p>
          <div className="hero__actions">
            <Button to="/products">View Products</Button>
            <Button to="/about" variant="secondary">
              About Us
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
