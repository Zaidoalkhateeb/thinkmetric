// Central, editable source of truth for company-level content.
// Non-developers can update copy, contact details, and the map link here
// without touching component code.

export const siteUrl = 'https://www.think-metric.co';

export const brand = {
  name: 'ThinkMetric',
};

export const contact = {
  generalEmail: 'info@think-metric.co',
  salesEmail: 'sales@think-metric.co',
  phoneDisplay: '+90 541 340 36 89',
  phoneHref: 'tel:+905413403689',
};

const fullAddress =
  'Kayabaşı Mah. Gazi Yaşargil Cad. Başakşehir Evleri 1. Etap 4. Ksm A2 Blok No: 14 H İç Kapı No: 3, Başakşehir / İstanbul';

export const location = {
  city: 'Başakşehir',
  country: 'Türkiye',
  label: 'Istanbul / Türkiye',
  fullAddress,
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`,
  directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress)}`,
  // Approximate coordinates used only for the stylized regional map marker.
  lat: 41.0958,
  lng: 28.8006,
};

export const about = {
  paragraphs: [
    'ThinkMetric is a provider of advanced environmental measurement, remote monitoring, and autonomous power solutions for the renewable energy and industrial sectors.',
    'We supply a focused portfolio of high performance technologies  wind LiDAR, boundary layer and atmospheric LiDAR, meteorological sensing, and autonomous off grid power systems built for demanding field conditions, supporting wind resource assessment, atmospheric research, industrial monitoring, and long term measurement campaigns.',
    'Every solution is chosen for accuracy, durability, and dependable operation in challenging environments, backed by technical expertise and responsive support.',
    'Whether supporting a single campaign or a large scale monitoring programme, we help clients make confident, data driven decisions.',
  ],
  principles: [
    {
      title: 'Precision in selection',
      description:
        'Every technology in our portfolio is chosen for accuracy and fit for purpose performance, not added to fill a catalog.',
    },
    {
      title: 'Trusted in the field',
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

export const processStages = [
  {
    step: '01',
    title: 'Define the measurement objective',
    description:
      'Every campaign starts with a clear question about wind resource, turbine performance, boundary layer behaviour, or air quality.',
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
    title: 'Dependable data for confident decisions',
    description:
      'Consistent measurement, delivered through reliable instrumentation, supports resource assessment, research, and operational decisions.',
  },
];

export const categories = [
  {
    slug: 'remote-power-supply-systems',
    number: '01',
    label: 'Power Solutions',
    shortLabel: 'Power Solutions',
    seoTitle: 'Remote Power Supply Systems',
    seoDescription:
      'Explore autonomous remote power supply systems for meteorological, monitoring, telecommunications, and industrial sites.',
    description: '',
    applications: [],
    icon: 'remotePower',
    heroImage: '/images/power-solutions-hero-4k.webp',
  },
  {
    slug: 'lidars',
    number: '02',
    label: 'Lidars',
    shortLabel: 'Lidars',
    seoTitle: 'Wind & Atmospheric LiDAR Systems',
    seoDescription:
      'Explore wind and atmospheric LiDAR systems for resource assessment, turbine monitoring, boundary-layer research, and remote sensing.',
    description: '',
    applications: [],
    icon: 'windLidar',
    heroImage: '/images/lidars-wind-farm-hero-wide.webp',
  },
];

export const seoDefaults = {
  titleSuffix: ' | ThinkMetric',
  defaultTitle: 'Wind LiDAR & Remote Power Solutions',
  ogImage: '/images/og-image.jpg',
  // Same string already used as the Home page's own description (and in
  // index.html's static meta tag) — reused here as the fallback for any
  // route that doesn't set its own, rather than authoring new copy.
  description:
    'ThinkMetric supplies wind LiDAR, atmospheric LiDAR, and autonomous remote power systems for wind resource assessment, atmospheric research, and industrial monitoring.',
};

// Static page metadata lives here so titles and descriptions stay consistent
// across browser tabs, search results, and social previews.
export const pageSeo = {
  home: {
    title: seoDefaults.defaultTitle,
    description: seoDefaults.description,
    path: '/',
  },
  products: {
    title: 'Products & Services',
    description:
      "Explore ThinkMetric's wind LiDAR, atmospheric LiDAR, and autonomous remote power systems for demanding field applications.",
    path: '/products',
  },
  about: {
    title: 'About Us',
    description:
      'Learn how ThinkMetric supports renewable energy, atmospheric research, and industrial projects with dependable measurement and remote power technologies.',
    path: '/about',
  },
  contact: {
    title: 'Contact Us',
    description:
      "Contact ThinkMetric's technical and sales team for help with wind LiDAR, atmospheric measurement, and remote power projects.",
    path: '/contact',
  },
  notFound: {
    title: 'Page Not Found',
    description: "The page you're looking for could not be found.",
    path: '/404',
  },
};
