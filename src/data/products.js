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
    label: 'Power Solutions',
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
  'Expanded battery capacity 3–6 lithium batteries',
  'Automatic fire extinguisher and flame detection system',
];

const raw = [
  // ---- Power Solutions ----
  {
    slug: 'tm-hd-10000c',
    modelName: 'TM-HD-10000C',
    productType: 'Heavy Duty Hybrid Diesel Power System',
    category: CATEGORY.REMOTE_POWER,
    summary:
      "The TM-HD-10000C is a  hybrid diesel power supply system engineered to deliver continuous, autonomous power for remote monitoring stations operating in demanding environments. Combining dual diesel generators, a lithium battery bank, intelligent power management, and remote monitoring within a fully insulated container, its redundant architecture ensures uninterrupted operation even if one generator becomes unavailable  while intelligent battery management minimizes generator runtime, fuel consumption, and maintenance requirements.",
    features: [
      'High capacity 48 V lithium battery storage',
      '1,000 L double wall integrated fuel tank',
      'Dual 10 kW diesel generators for high system redundancy',
      'Remote web based monitoring and system diagnostics',
      'Intelligent automatic generator control and battery charging',

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
      'The TM-HD-6000C is a compact hybrid diesel power supply system designed to provide reliable, autonomous power for remote monitoring equipment and off-grid installations. Integrating dual diesel generators, a lithium battery bank, intelligent energy management, and remote monitoring, the system delivers continuous operation while minimizing fuel consumption and maintenance requirements.',
    features: [
      'Dual 6 kW diesel generators for high system redundancy',
      'High capacity 48 V lithium battery storage',
      'Intelligent automatic generator control and battery charging',
      '1,000 L double wall integrated fuel tank',
      'Remote web based monitoring and system diagnostics',
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
      'The TM-MFC-375A is an advanced hybrid methanol fuel cell power supply system engineered to deliver clean, reliable, and autonomous power for remote off-grid installations. Combining high efficiency methanol fuel cells, solar energy, lithium battery storage, and intelligent energy management, the system provides continuous operation with exceptionally low maintenance requirements and ideal for long term unattended deployments.',
    features: [
      'Three high efficiency methanol fuel cells',
      'Automatic intelligent energy management',
      'Remote web based monitoring and diagnostics',
      'Designed for long duration autonomous operation',
      'Extended maintenance intervals with minimal on site intervention',
    ],
    applications: REMOTE_POWER_APPLICATIONS,
    optionalExtras: REMOTE_POWER_OPTIONAL_EXTRAS,
    contentStatus: 'documented',
    image: '/images/products/tm-mfc-375a.webp',
  },

  // ---- Wind Measurement — LiDAR ----
  {
    slug: 'windhorizon-h400',
    modelName: 'WindHorizon H400',
    productType: 'Nacelle Wind LiDAR',
    category: CATEGORY.LIDARS,
    summary:
      'The WindHorizon H400 is a compact, high-precision nacelle-mounted forward-looking pulsed wind LiDAR. It accurately measures wind speed and direction at any of 10 configurable range gates from 50m to 400m directly in front of the wind turbine hub. This system is ideal for yaw error correction, wind turbine power curve testing, feedforward control, and load reduction — improving power generation efficiency, reducing loads and failure rates, and extending turbine service life.',
    features: [
      'wind turbine yaw correction, feedforward control',
      'High accuracy:wind speed <0.1m/s, wind direction <0.5°, passed white box and black box accuracy testing',
      'High resolution: 1Hz–10Hz data refresh rate, meter-level distance resolution',
      'Unattended: remote network data acquisition and device monitoring',
      'Strong robustness: continuous, stable operation in harsh onshore and offshore environments',
    ],
    applications: [
      'Yaw error correction for wind turbines',
      'Wind turbine power curve testing',
      'Feedforward control',
      'Load reduction',
    ],
    specifications: [
      { label: 'Detection range', value: '50m–400m' },
      { label: 'Data refresh rate', value: '1Hz–10Hz' },
      { label: 'Range gates', value: '10 range gates (1m range resolution)' },
      { label: 'Wind speed range', value: '0m/s–80m/s' },
      { label: 'Wind speed accuracy', value: '≤0.1m/s' },
      { label: 'Wind direction accuracy', value: '≤0.5°' },
      { label: 'Beam number', value: '4 beams' },
      {
        label: 'Data output',
        value:
          'Radial wind speed, pitch/roll angle, 1s/10min hub-height horizontal wind speed/direction, horizontal/vertical wind shear, turbulence intensity, SNR, data acquisition rate',
      },
      { label: 'Electrical safety', value: 'Compliant with EN 61010, CE standards' },
      { label: 'Data storage', value: 'CSV, 1 year data storage' },
      { label: 'Data protocol', value: 'ModbusTCP, Modbus 485, CAN-OPEN' },
      { label: 'Data ports', value: 'RJ45, 4G, USB, HDMI, RS232, etc. (customizable)' },
      { label: 'Operating temperature', value: '-40°C to 60°C, 0–100% RH' },
      { label: 'Ingress protection', value: 'IP66, salt-tolerant per IEC 60068-2-11' },
      { label: 'Salt spray protection', value: 'Meets ISO C5 anticorrosive rating' },
    ],
    contentStatus: 'documented',
    image: '/images/products/windhorizon-h400.webp',
  },
  {
    slug: 'windmast-wp350',
    modelName: 'WindMast WP350',
    productType: 'Vertical Wind LiDAR',
    category: CATEGORY.LIDARS,
    summary:
      'WindMast WP350 is a compact, low power, high precision vertical profiling wind LiDAR, fully designed and manufactured in accordance with IEC 61400-12-1:2017. Functioning as a "wind tower replacement," it continuously measures wind speed and direction profiles at any of 24 configurable height gates between 40m and 350m above the LiDAR.',
    features: [
      'High accuracy',
      'Compliant With IEC 61400-12-1:2017',
      'Continuous wind profile measurement across 24 configurable height gates',
      'Invisible and eye safe  (1550nm wavelength)',
      'Configurable data refresh rate from 1s to 10min',
      'DBS / VAD observation modes',
    ],
    applications: [
      'Wind Power Prediction',
      'Wind Measurement Network in Complex Terrain',
      'Integrated Meteorological Observation and Service Platform',
      'Preliminary Survey of Onshore and Offshore Wind Resources',
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
    summary:
      'WindMast 350-MB is a fully self-developed floating buoy wind LiDAR system, combining a domestically produced wind LiDAR, a 6-meter large buoy platform, a self-supply power system, BeiDou positioning and communication, and a motion-platform attitude correction algorithm. Designed to withstand continuous rain and typhoon conditions at sea, it delivers stable, high-precision wind measurements under harsh meteorological and sea conditions.',
    features: [
      'High spatial & temporal resolution',
      'Real-time attitude correction algorithm for wind field inversion',
      'IEC and OWA standards compliant',
      '1s data refresh rate, 1m range resolution',
      'Adaptable to complex extreme sea conditions',
      'Remote control via satellite data transmission',
    ],
    applications: [
      'Offshore wind resource assessment and evaluation',
      'Offshore wind turbine power curve testing',
      'Offshore wind power forecasting',
      'Atmospheric boundary layer dynamics research in marine environments',
    ],
    specifications: [
      { label: 'Detection height', value: '10m–350m' },
      { label: 'Wavelength', value: '1550nm, invisible and eye safe' },
      { label: 'Wind speed range', value: '0–75m/s' },
      { label: 'Wind direction range', value: '0–360°' },
      { label: 'Wind speed accuracy', value: '≤0.1m/s' },
      { label: 'Wind direction accuracy', value: '≤3°' },
      { label: 'Buoy diameter', value: '6m' },
      { label: 'Max. wind resistance', value: '≤70m/s' },
      { label: 'Max. wave resistance', value: '≤20m' },
      { label: 'Max. current resistance', value: '≤6kn' },
      { label: 'Power supply', value: 'Solar + wind' },
      {
        label: 'Data output',
        value:
          'Second and minute time-averaged wind speed/direction, max./min. horizontal wind speed, mean square deviation of wind speed (turbulence intensity), wind shear index, vertical speed, SNR data, GPS position time, lidar status data, ground atmospheric temperature, humidity, pressure data',
      },
    ],
    contentStatus: 'documented',
    image: '/images/products/windmast-350-mb.webp',
  },
  {
    slug: 'lc-lhm-905',
    modelName: 'LC-LHM-905',
    productType: 'Blade Clearance Monitoring LiDAR',
    category: CATEGORY.LIDARS,
    summary:
      "The LC-LHM-905 blade clearance monitoring LiDAR uses laser ranging technology to build a blade clearance monitoring system, tracking the real-time clearance distance between wind turbine blades and the tower during operation. When clearance falls below the standard value, the system triggers an alarm, allowing the turbine's main controller to take protective measures — ensuring safe operation and ultimately increasing power generation.",
    features: [
      'Suitable for different terrain scenarios',
      'Small size, low power consumption',
      'Multiple beams',
      'Strong environmental adaptability',
      'Auto interference recognition',
      'Real-time monitoring of blade-to-tower clearance distance',
      'Automatic alarm and shutdown trigger when clearance falls below the safe distance',
    ],
    applications: ['Wind turbine blade clearance monitoring', 'Turbine safety and protective shutdown'],
    specifications: [
      { label: 'Wavelength', value: '905nm, Class I laser eye safety requirements' },
      { label: 'Standard range', value: '200m @ 80% reflectivity' },
      { label: 'Range resolution', value: '≤0.1m' },
      { label: 'Measurement accuracy', value: '±0.2m' },
      { label: 'Output interface', value: 'CANopen / network cable ports' },
      { label: 'Storage temperature', value: '-40°C to 65°C' },
      { label: 'Working humidity', value: '0%–100% RH' },
      { label: 'Operating temperature', value: '-40°C to 60°C' },
      { label: 'Beam direction', value: '0° / 2° / 4° (±0.2°), 20kHz repetition frequency per channel' },
      {
        label: 'Data output',
        value: 'Device ID, direct measurement distance, light return intensity, data valid mark, system status',
      },
      { label: 'Ingress protection', value: 'IP67' },
    ],
    contentStatus: 'documented',
    image: '/images/products/lc-lhm-905.webp',
  },
  {
    slug: 'windmast-pbl',
    modelName: 'WindMast PBL',
    productType: 'Boundary Layer Wind LiDAR',
    category: CATEGORY.LIDARS,
    summary:
      'WindMast PBL is a boundary layer wind LiDAR based on the optical pulse coherent Doppler frequency-shift detection principle, designed to meet the fine detection needs of three-dimensional wind fields within the atmospheric boundary layer. It is available in two models: Model I for detailed low-altitude wind field detection within 350m (spatial resolution down to 1m), and Model II, which extends the detection range up to 1500m for broader detection needs.',
    features: [
      'Pulsed coherent Doppler LiDAR for detection of wind field and aerosol',
      'Supports ground-based, vehicle-mounted, and shipborne platform monitoring modes, capable of real-time high-precision observations of wind fields, aerosols, and other parameters',
    ],
    applications: [
      'Meteorological and climate research',
      'Meteorological model assimilation',
      'Atmospheric flux and pollutant regional transport and diffusion studies',
      'Low-altitude wind shear detection',
    ],
    specifications: [
      { label: 'Wavelength', value: '1550nm, invisible and eye safe' },
      { label: 'Detection range', value: '45m–1500m' },
      { label: 'Range resolution', value: '15m / 30m / 60m / 150m (configurable)' },
      { label: 'Data refresh rate', value: 'Wind profile: ≤1min; radial data: ≤1s (configurable)' },
      { label: 'Wind speed range', value: '0–75m/s' },
      { label: 'Wind direction range', value: '0–360°' },
      { label: 'Wind speed accuracy', value: '≤0.1m/s' },
      { label: 'Wind direction accuracy', value: '≤3°' },
      { label: 'Observation mode', value: 'DBS / VAD' },
      {
        label: 'Data output',
        value:
          'Radial velocity, spectral width, spectral strength, SNR, horizontal wind speed and direction, vertical airflow, turbulence intensity, aerosol extinction and backscattering coefficient, atmospheric boundary layer height, cloud base height, wind shear, atmospheric temperature and humidity, particulate matter concentration and flux',
      },
      { label: 'Weight', value: '<30kg' },
    ],
    contentStatus: 'documented',
    image: '/images/products/windmast-pbl.webp',
  },
  {
    slug: 'windmast-pbl-m-windflux-3000',
    modelName: 'WindFlux 3000',
    productType: 'Boundary Layer Wind LiDAR',
    category: CATEGORY.LIDARS,
    summary:
      'WindFlux 3000 is a boundary layer wind LiDAR based on the optical pulse coherent Doppler frequency-shift detection principle, enabling refined detection of the three-dimensional wind field in the lower and middle troposphere, including the atmospheric boundary layer.',
    features: [
      'Pulsed coherent Doppler LiDAR for detection of wind field and aerosol',
      'Supports ground-based, vehicle-mounted, and shipborne platform monitoring modes, capable of real-time high-precision observations of wind fields, aerosols, and other parameters',
    ],
    applications: [
      'Meteorological and climate research',
      'Assimilation of meteorological forecasting models',
      'Studies on atmospheric material fluxes, regional transport, and diffusion of pollutants',
      'Low-altitude wind shear detection',
    ],
    specifications: [
      { label: 'Wavelength', value: '1550nm' },
      { label: 'Detection range', value: '60m–6000m' },
      { label: 'Range resolution', value: '15m / 30m / 60m (configurable)' },
      { label: 'Data refresh rate', value: 'Wind profile: ≤1min; radial data: ≤1s (configurable)' },
      { label: 'Wind speed range', value: '0–75m/s' },
      { label: 'Wind direction range', value: '0–360°' },
      { label: 'Wind speed accuracy', value: '≤0.1m/s' },
      { label: 'Wind direction accuracy', value: '≤3°' },
      { label: 'Observation mode', value: 'DBS / VAD' },
      {
        label: 'Data output',
        value:
          'Radial velocity, spectral width, spectral intensity, SNR, horizontal wind speed and direction, vertical airflow, turbulence intensity, aerosol extinction and backscatter coefficients, atmospheric boundary layer height, cloud base height, wind shear, atmospheric temperature, humidity, and pressure data at radar height, particulate matter concentration and flux',
      },
      { label: 'Weight', value: '<150kg' },
    ],
    contentStatus: 'documented',
    image: '/images/products/windmast-pbl-m-windflux-3000.webp',
  },
  { slug: 'windmast-pbl-s', modelName: 'WindMast PBL(S)', productType: 'Boundary Layer Wind LiDAR', category: CATEGORY.LIDARS },
  { slug: 'windmast-pbl-sv-mv', modelName: 'WindMast PBL(SV)', productType: 'Boundary Layer Wind LiDAR', category: CATEGORY.LIDARS },
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
