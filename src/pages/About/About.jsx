import SectionHeader from '../../components/SectionHeader/SectionHeader';
import './About.css';

const values = [
  {
    title: 'Precision first',
    description: 'Every measurement matters. We chase accuracy to the decimal point.',
  },
  {
    title: 'Built to last',
    description: 'Our hardware is designed for decades in the field, not just the lab.',
  },
  {
    title: 'Clarity over noise',
    description: 'We turn chaotic, invisible forces into data teams can actually use.',
  },
];

const stats = [
  { value: '25+', label: 'Years hardware lifespan' },
  { value: '±0.1 m/s', label: 'Measurement accuracy' },
  { value: '1B+', label: 'Data points processed daily' },
];

function About() {
  return (
    <section className="page">
      <div className="container">
        <SectionHeader
          eyebrow="Who We Are"
          title={<>Engineering the <span className="highlight">invisible.</span></>}
          description="Wind is chaotic, invisible, and immensely powerful. Our mission is to capture its exact behavior with uncompromising precision, transforming raw forces into absolute clarity for the energy grid of tomorrow."
        />

        <div className="about-media" />

        <div className="values">
          {values.map((value) => (
            <div key={value.title} className="value-card">
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </div>
          ))}
        </div>

        <div className="stats">
          {stats.map((stat) => (
            <div key={stat.label} className="stat">
              <span className="stat__value">{stat.value}</span>
              <span className="stat__label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
