// Central, editable source of truth for company-level content.
// Non-developers can update copy, contact details, and the map link here
// without touching component code.

export const siteUrl = 'https://www.think-metric.co';

export const brand = {
  name: 'ThinkMetric',
  displayWordmark: 'THINKMETRIC',
  tagline: 'Measure the invisible. Decide with confidence.',
};

export const contact = {
  generalEmail: 'info@think-metric.co',
  salesEmail: 'sales@think-metric.co',
  phoneDisplay: '+90 541 340 36 89',
  phoneHref: 'tel:+905413403689',
};

export const location = {
  city: 'Istanbul',
  country: 'Türkiye',
  label: 'Istanbul, Türkiye',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Istanbul%2C%20T%C3%BCrkiye',
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Istanbul%2C%20T%C3%BCrkiye',
  // Approximate coordinates used only for the stylized regional map marker.
  lat: 41.0082,
  lng: 28.9784,
};

export const about = {
  heroHeading: 'Precision begins in the field.',
  paragraphs: [
    'ThinkMetric is a provider of advanced environmental measurement, remote monitoring, and autonomous power solutions for the renewable energy and industrial sectors.',
    'We supply a carefully selected portfolio of high-performance technologies, including wind LiDAR systems, boundary layer and atmospheric LiDAR, meteorological sensing solutions, and autonomous off-grid power systems designed for demanding field applications. Our product range supports wind resource assessment, atmospheric research, industrial monitoring, and long-term remote measurement campaigns.',
    'At ThinkMetric, we believe that reliable data begins with reliable equipment. Every solution is chosen to deliver accuracy, durability, and dependable operation in challenging environments, backed by technical expertise and responsive customer support.',
    'Whether supporting a single measurement campaign or a large-scale monitoring programme, ThinkMetric is committed to delivering precision measurement solutions that enable confident decision-making.',
  ],
  principles: [
    {
      title: 'Precision in selection',
      description:
        'Every technology in our portfolio is chosen for accuracy and fit-for-purpose performance, not added to fill a catalog.',
    },
    {
      title: 'Dependability in demanding environments',
      description:
        'From exposed ridgelines to remote uplands, our equipment is selected to operate reliably where onshore conditions are unforgiving.',
    },
    {
      title: 'Responsive technical support',
      description:
        'Our technical team works alongside yours from configuration through deployment, so your measurement campaign stays on track.',
    },
  ],
};

export const applications = [
  'Wind resource assessment',
  'Atmospheric research',
  'Industrial monitoring',
  'Long-term remote measurement campaigns',
];

export const processStages = [
  {
    step: '01',
    title: 'Define the measurement objective',
    description:
      'Every campaign starts with a clear question — wind resource, turbine performance, boundary-layer behaviour, or air quality.',
  },
  {
    step: '02',
    title: 'Select and configure the technology',
    description:
      'The right instrument is chosen from our portfolio and configured for the site, application, and environmental conditions.',
  },
  {
    step: '03',
    title: 'Deploy and monitor in the field',
    description:
      'Equipment is installed on land or via airborne platforms, built to keep operating through demanding onshore field conditions.',
  },
  {
    step: '04',
    title: 'Use dependable data for confident decisions',
    description:
      'Consistent, well-instrumented measurement supports resource assessment, research, and operational decision-making.',
  },
];

export const categories = [
  {
    slug: 'remote-power-supply-systems',
    number: '01',
    label: 'Remote Power Supply Systems',
    shortLabel: 'Remote Power',
    description:
      'Autonomous off-grid power solutions designed to support measurement equipment in demanding and remote field environments.',
    applications: ['Off-grid measurement sites', 'Remote monitoring stations', 'Extended field campaigns'],
    icon: 'remotePower',
    pending: true,
  },
  {
    slug: 'wind-measurement-lidar',
    number: '02',
    label: 'Wind Measurement — LiDAR',
    shortLabel: 'Wind LiDAR',
    description:
      'Remote sensing technologies for wind-resource, turbine, boundary-layer, scanning, onshore, and airborne measurement applications.',
    applications: ['Wind resource assessment', 'Turbine performance', 'Onshore campaigns', 'Boundary-layer profiling'],
    icon: 'windLidar',
  },
  {
    slug: 'wind-measurement-met-mast',
    number: '03',
    label: 'Wind Measurement — Met Mast',
    shortLabel: 'Met Mast',
    description:
      'Meteorological mast solutions for dependable, long-term wind and site measurement campaigns.',
    applications: ['Site measurement campaigns', 'Long-term monitoring', 'Wind resource validation'],
    icon: 'metMast',
    pending: true,
  },
  {
    slug: 'environmental-meteorological-lidar',
    number: '04',
    label: 'Environmental & Meteorological LiDAR',
    shortLabel: 'Environment',
    description:
      'Atmospheric sensing technologies for temperature, humidity, aerosols, particulate matter, ozone, and gas-flux research and monitoring.',
    applications: ['Atmospheric research', 'Air quality monitoring', 'Gas-flux studies'],
    icon: 'atmosphericLidar',
  },
];

export const atmosphericModes = [
  {
    id: 'wind',
    label: 'Wind',
    description:
      'Horizontal wind flow measured at multiple heights, revealing shear and turbulence across a rotor swept area.',
  },
  {
    id: 'boundary-layer',
    label: 'Boundary Layer',
    description:
      'The atmospheric layer nearest the surface, where wind behaviour is shaped by terrain, heat, and turbulence.',
  },
  {
    id: 'atmosphere',
    label: 'Atmosphere',
    description:
      'Temperature, humidity, and aerosol structure through the atmospheric column, sensed remotely without physical contact.',
  },
  {
    id: 'remote-power',
    label: 'Remote Power',
    description:
      'Autonomous power systems that keep measurement equipment operating independently of grid infrastructure.',
  },
];

export const seoDefaults = {
  titleSuffix: ' | ThinkMetric',
  ogImage: '/images/og-image.jpg',
};
