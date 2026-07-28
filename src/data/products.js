// Central, editable product catalog.
// Each product only contains approved information. Fields left as null are
// intentionally pending and rendered as honest "coming soon" states in the UI —
// never fill these in with invented specifications, images, or claims.
//
// image: path under /public/images/products/{slug}.jpg — null until a real,
//        manufacturer-approved photograph is supplied.
// pdfUrl: path under /public/documents/products/{slug}.pdf — null until a real
//        datasheet is supplied.

const CATEGORY = {
  LIDARS: {
    slug: 'lidars',
    label: 'Lidars',
  },
  REMOTE_POWER: {
    slug: 'remote-power-supply-systems',
    label: 'Remote Power Supply Systems',
  },
};

function buildSummary(modelName, productType) {
  return `${modelName} is included in ThinkMetric's portfolio as a ${productType.toLowerCase()} solution. Contact our technical team to discuss application fit, configuration, and verified technical specifications.`;
}

const REMOTE_POWER_APPLICATIONS = [
  'Remote Meteorological Systems',
  'Telecommunications Infrastructure',
  'Mining Operations',
];

const REMOTE_POWER_OPTIONAL_EXTRAS = [
  'Expanded battery capacity (3–6 lithium batteries)',
  'Automatic fire extinguisher and flame detection system',
];

const raw = [
  // ---- Remote Power Supply Systems ----
  {
    slug: 'tm-hd-10000c',
    modelName: 'TM-HD-10000C',
    productType: 'Heavy-Duty Hybrid Diesel Power System',
    category: CATEGORY.REMOTE_POWER,
    summary:
      "The TM-HD-10000C is a  hybrid diesel power supply system engineered to deliver continuous, autonomous power for remote monitoring stations operating in demanding environments. Combining dual diesel generators, a lithium battery bank, intelligent power management, and remote monitoring within a fully insulated container, its redundant architecture ensures uninterrupted operation even if one generator becomes unavailable  while intelligent battery management minimizes generator runtime, fuel consumption, and maintenance requirements.",
    features: [
      'Dual 10 kW water-cooled diesel generators for high system redundancy',
      'High-capacity 48 V lithium battery storage',
      'Intelligent automatic generator control and battery charging',
      'Fully insulated weather-resistant container enclosure',
      '1,000 L double-wall integrated fuel tank',
      'Remote web-based monitoring and system diagnostics',
    ],
    applications: REMOTE_POWER_APPLICATIONS,
    optionalExtras: REMOTE_POWER_OPTIONAL_EXTRAS,
    contentStatus: 'documented',
    image: '/images/products/tm-hd-10000c.webp',
  },
  {
    slug: 'tm-hd-6000c',
    modelName: 'TM-HD-6000C',
    productType: 'Compact Hybrid Diesel Power System',
    category: CATEGORY.REMOTE_POWER,
    summary:
      'The TM-HD-6000C is a compact hybrid diesel power supply system designed to provide reliable, autonomous power for remote monitoring equipment and off-grid installations. Integrating dual diesel generators, a lithium battery bank, intelligent energy management, and remote monitoring, the system delivers continuous operation while minimizing fuel consumption and maintenance requirements. Optimized for medium-power applications, it supports a power consumption range of 200–4000W.',
    features: [
      'Dual 6 kW water-cooled diesel generators',
      '48 VDC lithium battery storage system',
      '1,000 L double-wall integrated fuel tank',
      'Automatic generator sequencing and redundancy',
      'Remote web-based monitoring and diagnostics',
      'Real-time alarms and system notifications',
      'Low-maintenance, autonomous operation',
    ],
    applications: REMOTE_POWER_APPLICATIONS,
    optionalExtras: REMOTE_POWER_OPTIONAL_EXTRAS,
    contentStatus: 'documented',
    image: '/images/products/tm-hd-6000c.webp',
  },
  {
    slug: 'tm-mfc-375a',
    modelName: 'TM-MFC-375A',
    productType: 'Hybrid Methanol Fuel Cell Power System',
    category: CATEGORY.REMOTE_POWER,
    summary:
      'The TM-MFC-375A is an advanced hybrid methanol fuel cell power supply system engineered to deliver clean, reliable, and autonomous power for remote off-grid installations. Combining high-efficiency methanol fuel cells, solar energy, lithium battery storage, and intelligent energy management, the system provides continuous operation with exceptionally low maintenance requirements and minimal environmental impact — ideal for long-term unattended deployments.',
    features: [
      'Hybrid methanol fuel cell and solar power system',
      'Three high-efficiency methanol fuel cells',
      'Automatic intelligent energy management',
      'Remote web-based monitoring and diagnostics',
      'Designed for long-duration autonomous operation',
      'Extended maintenance intervals with minimal on-site intervention',
      'Suitable for harsh environmental conditions',
    ],
    applications: REMOTE_POWER_APPLICATIONS,
    optionalExtras: REMOTE_POWER_OPTIONAL_EXTRAS,
    contentStatus: 'documented',
    image: '/images/products/tm-mfc-375a.webp',
  },

  // ---- Wind Measurement — LiDAR ----
  { slug: 'windhorizon-h400', modelName: 'WindHorizon H400', productType: 'Nacelle Wind LiDAR', category: CATEGORY.LIDARS },
  {
    slug: 'windmast-wp350',
    modelName: 'WindMast WP350',
    productType: 'Vertical Wind LiDAR',
    category: CATEGORY.LIDARS,
    summary:
      'WindMast WP350 is a compact, low-power, high-precision vertical profiling wind LiDAR, fully designed and manufactured in accordance with IEC 61400-12-1:2017. Functioning as a "wind tower replacement," it continuously measures wind speed and direction profiles at any of 24 configurable height gates between 40m and 350m above the LiDAR.',
    features: [
      'Compact size, low power consumption, high accuracy',
      'IEC 61400-12-1:2017 compliant',
      'Continuous wind profile measurement across 24 configurable height gates (40m–350m)',
      '1550nm wavelength — invisible and eye safe',
      'Configurable data refresh rate from 1s to 10min',
      'DBS / VAD observation modes',
      'Reports sec- and time-averaged wind speed/direction, vertical speed, turbulence intensity, turbulence dissipation rate, and wind shear index',
      'Compact weight under 30 kg',
    ],
    applications: [
      'Wind resource survey and assessment',
      'Turbine power curve testing',
      'Wind power forecasting',
      'Wind shear analysis in complex terrain',
      'Atmospheric boundary layer dynamics research',
    ],
    specifications: [
      { label: 'Wavelength', value: '1550nm, invisible and eye safe' },
      { label: 'Detection range', value: '40m–350m' },
      { label: 'Range resolution', value: '24 heights configurable within 40m–350m, 1m resolution' },
      { label: 'Data refresh rate', value: '1s–10min (configurable)' },
      { label: 'Wind speed range', value: '0–75m/s' },
      { label: 'Wind direction range', value: '0–360°' },
      { label: 'Wind speed accuracy', value: '0.1m/s' },
      { label: 'Wind direction accuracy', value: '≤3°' },
      { label: 'Observation mode', value: 'DBS / VAD' },
      { label: 'Weight', value: '<30kg' },
    ],
    contentStatus: 'documented',
    image: '/images/products/windmast-wp350.webp',
  },
  {
    slug: 'windmast-350-mb',
    modelName: 'WindMast 350-MB',
    productType: 'Floating Buoy Wind LiDAR',
    category: CATEGORY.LIDARS,
    image: '/images/products/windmast-350-mb.webp',
  },
  { slug: 'lc-lhm-905', modelName: 'LC-LHM-905', productType: 'Blade Clearance Monitoring LiDAR', category: CATEGORY.LIDARS },
  { slug: 'windmast-pbl', modelName: 'WindMast PBL', productType: 'Boundary Layer Wind LiDAR', category: CATEGORY.LIDARS },
  { slug: 'windmast-pbl-m-windflux-3000', modelName: 'WindMast PBL(M) / WindFlux 3000', productType: 'Boundary Layer Wind LiDAR', category: CATEGORY.LIDARS },
  { slug: 'windmast-pbl-s', modelName: 'WindMast PBL(S)', productType: 'Boundary Layer Wind LiDAR', category: CATEGORY.LIDARS },
  { slug: 'windmast-pbl-sv-mv', modelName: 'WindMast PBL(SV) / PBL(MV)', productType: 'Boundary Layer Wind LiDAR', category: CATEGORY.LIDARS },
  { slug: 'wind3d-10k', modelName: 'Wind3D 10K', productType: '3D Scanning Wind LiDAR', category: CATEGORY.LIDARS },
  {
    slug: 'wind3d-6000',
    modelName: 'Wind3D 6000',
    productType: '3D Scanning Wind LiDAR',
    category: CATEGORY.LIDARS,
    image: '/images/products/wind3d-6000.webp',
  },
  { slug: 'windmast-pbl-ma', modelName: 'WindMast PBL(MA)', productType: 'Airborne Wind LiDAR', category: CATEGORY.LIDARS },

  // ---- Environmental & Meteorological LiDAR ----
  {
    slug: 'watcl-15k',
    modelName: 'WATCL 15K',
    productType: 'Raman Temperature and Humidity LiDAR',
    category: CATEGORY.LIDARS,
    image: '/images/products/watcl-15k.webp',
  },
  { slug: 'mwra-12k', modelName: 'MWRA 12K', productType: 'Raman and Mie Scattering Aerosol LiDAR', category: CATEGORY.LIDARS },
  { slug: 'windflux-3000plus', modelName: 'WindFlux 3000Plus', productType: 'Particulate Matter Flux LiDAR', category: CATEGORY.LIDARS },
  { slug: 'o3-ddlidar', modelName: 'O₃-DDLidar', productType: 'Ozone LiDAR', category: CATEGORY.LIDARS },
  { slug: 'co2-flux', modelName: 'CO₂ FLUX', productType: 'CO₂ Gas Flux LiDAR', category: CATEGORY.LIDARS },
];

export const products = raw.map((item) => ({
  slug: item.slug,
  modelName: item.modelName,
  productType: item.productType,
  categorySlug: item.category.slug,
  categoryLabel: item.category.label,
  summary: item.summary || buildSummary(item.modelName, item.productType),
  features: item.features || [],
  applications: item.applications || [],
  optionalExtras: item.optionalExtras || [],
  specifications: item.specifications || [],
  image: item.image || null,
  pdfUrl: null,
  contentStatus: item.contentStatus || 'pending',
}));

export function getProductsByCategory(categorySlug) {
  return products.filter((p) => p.categorySlug === categorySlug);
}

export function getProductBySlug(slug) {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(product, limit = 3) {
  return products
    .filter((p) => p.categorySlug === product.categorySlug && p.slug !== product.slug)
    .slice(0, limit);
}
