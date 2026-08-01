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
      'The WindHorizon H400 is a compact, high-precision nacelle-mounted forward-looking pulsed wind LiDAR. It accurately measures wind speed and direction at any of 10 configurable range gates from 50m to 400m directly in front of the wind turbine hub. This system is ideal for yaw error correction, wind turbine power curve testing, feedforward control, and load reduction  improving power generation efficiency, reducing loads and failure rates, and extending turbine service life.',
    features: [
      'High accuracy',
      'High resolution',
      'Unattended',
      'Strong robustness',
    ],
    applications: [
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
      'WindMast 350-MB is a fully self-developed floating buoy wind LiDAR system, combining a domestically produced wind LiDAR, a 6-meter large buoy platform, a self supply power system, BeiDou positioning and communication, and a motion platform attitude correction algorithm. Designed to withstand continuous rain and typhoon conditions at sea, it delivers stable, high precision wind measurements under harsh meteorological and sea conditions.',
    features: [
      'High spatial & temporal resolution',
      'Real-time attitude correction algorithm for wind field inversion',
      'IEC and OWA standards compliant',
      '1s data refresh rate, 1m range resolution',
      'Adaptable to complex extreme sea conditions',
      'Remote control via satellite data transmission',
    ],
    applications: [
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
      "The LC-LHM-905 blade clearance monitoring LiDAR uses laser ranging technology to build a blade clearance monitoring system, tracking the real time clearance distance between wind turbine blades and the tower during operation. When clearance falls below the standard value, the system triggers an alarm, allowing the turbine's main controller to take protective measures ensuring safe operation and ultimately increasing power generation.",
    features: [
      'Suitable for different terrain scenarios',
      'Small size, low power consumption',
      'Multiple beams',
      'Strong environmental adaptability',
      'Auto interference recognition',
      'Real time monitoring of blade-to-tower clearance distance',
      'Automatic alarm and shutdown trigger when clearance falls below the safe distance',
    ],
    applications: [],
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
      'WindMast PBL is a boundary layer wind LiDAR based on the optical pulse coherent Doppler frequency shift detection principle, designed to meet the fine detection needs of three dimensional wind fields within the atmospheric boundary layer. It is available in two models: Model I for detailed low-altitude wind field detection within 350m (spatial resolution down to 1m), and Model II, which extends the detection range up to 1500m for broader detection needs.',
    features: [
      'Pulsed coherent Doppler LiDAR for detection of wind field and aerosol',
      'Supports ground-based, vehicle-mounted, and shipborne platform monitoring modes, capable of real-time high-precision observations of wind fields, aerosols, and other parameters',
    ],
    applications: [
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
      'WindFlux 3000 is a boundary layer wind LiDAR based on the optical pulse coherent Doppler frequency shift detection principle, enabling refined detection of the three dimensional wind field in the lower and middle troposphere, including the atmospheric boundary layer.',
    features: [
      'Pulsed coherent Doppler LiDAR for detection of wind field and aerosol',
      'Supports ground-based, vehicle-mounted, and shipborne platform monitoring modes, capable of real-time high-precision observations of wind fields, aerosols, and other parameters',
    ],
    applications: [
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
  {
    slug: 'windmast-pbl-s',
    modelName: 'WindMast PBL(S)',
    productType: 'Boundary Layer Wind LiDAR',
    category: CATEGORY.LIDARS,
    summary:
      'Based on the optical pulse coherent Doppler shift detection principle, the WindMast PBL(S) vertical profile wind LiDAR is characterized by miniaturization, low power consumption, and high accuracy. It can be mounted on fixed or mobile platforms across different fields  ground-based, air based, sea based, and space based  to meet monitoring needs across diverse scenarios. The modular design supports personalized customization, allowing users to choose and combine attachments to suit different monitoring requirements.',
    features: [
      'Miniaturized, low power consumption, high precision',
      'Mountable on multiple platforms: ground, air, sea, and space',
      'Modular design supports personalized customization with interchangeable attachments',
      'Real-time output of wind profile, vertical airflow, wind shear, low-level rapids, gusts, and turbulence intensity',
    ],
    applications: [],
    specifications: [
      { label: 'Detection range', value: '30m–800m' },
      { label: 'Operating wavelength', value: '1550nm' },
      { label: 'Laser eye safety level', value: 'Class 1M of IEC 60825-1 standard' },
      { label: 'Time resolution', value: '1s–10min (configurable)' },
      { label: 'Measuring distance gate', value: '10 range gates (1m range resolution)' },
      { label: 'Wind speed measuring range', value: '0–75m/s' },
      { label: 'Horizontal wind speed accuracy', value: '≤0.1m/s' },
      { label: 'Horizontal wind direction accuracy', value: '<3°' },
      { label: 'Ingress protection', value: 'IP67' },
      { label: 'Working environment', value: '-40°C to 55°C; 0–100% humidity' },
      { label: 'Dimension', value: '240mm × 205mm × 290mm' },
      { label: 'Equipment weight', value: '<10kg' },
    ],
    contentStatus: 'documented',
    image: '/images/products/windmast-pbl-s.webp',
  },
  {
    slug: 'windmast-pbl-sv-mv',
    modelName: 'WindMast PBL(SV)',
    productType: 'Boundary Layer Wind LiDAR',
    category: CATEGORY.LIDARS,
    summary:
      'WindMast PBL(SV) is a boundary layer wind LiDAR based on optical coherent Doppler frequency shift detection principles, designed to meet the requirements for high precision, refined detection of three dimensional atmospheric wind fields within the atmospheric boundary layer up to 1500m. Built with an IP67 protection rating and anti corrosion, salt resistant technologies, it can be mounted on wave gliders for ultra low power autonomous navigation, heading stabilization, and real time communication observations in marine environments.',
    features: [
      'Mini size, low power consumption, and high precision',
      'Meets high precision, refined detection requirements for atmospheric 3D wind fields within 1500m',
      'Equipped with a Wave Glider for ultra low power autonomous navigation, heading maintenance, and real time communication observation in marine environments',
    ],
    applications: [
    ],
    specifications: [
      { label: 'Wavelength', value: '1.5μm, invisible and eye safe' },
      { label: 'Detection range', value: '45m–1500m' },
      { label: 'Range resolution', value: '15m / 30m / 60m / 150m (configurable)' },
      { label: 'Data refresh rate', value: '1s–10min (configurable)' },
      { label: 'Wind speed range', value: '0–75m/s' },
      { label: 'Wind speed accuracy', value: '≤0.1m/s' },
      { label: 'Wind direction accuracy', value: '≤3°' },
      { label: 'Average power', value: '<60W' },
      { label: 'Working environment', value: '-30°C to 50°C; 0–100% RH' },
      {
        label: 'Data output',
        value:
          'Second-level wind speed and direction, average wind speed and direction, max./min. horizontal wind speed and direction, turbulence intensity, vertical wind speed, SNR data, etc.',
      },
      { label: 'Weight', value: '<15kg' },
      { label: 'Ingress protection', value: 'IP67' },
    ],
    contentStatus: 'documented',
    image: '/images/products/windmast-pbl-sv.webp',
  },
  {
    slug: 'wind3d-10k',
    modelName: 'Wind3D 10K',
    productType: '3D Scanning Wind LiDAR',
    category: CATEGORY.LIDARS,
    summary:
      'Wind3D 10K is a three dimensional scanning wind LiDAR based on the principle of optical pulsed coherent Doppler frequency shift detection, enabling refined detection of three dimensional wind fields in the troposphere. Equipped with a high precision optical scanning mirror, it supports multiple 3D scanning functions  including fixed point modes such as DBS, VAD, PPI, RHI, and CAPPI  with the basic version reaching a detection radius of up to 15km. Purpose-built detection modes, including 3D volumetric scanning, aircraft glide path scanning, wind profile scanning, and multi lidar networked scanning, enable precise low level wind shear detection and rapid early warning for aviation safety, as well as efficient aircraft wake vortex detection to optimize flight intervals.',
    features: [
      'Pulsed coherent Doppler LiDAR for wind field and aerosol detection',
      'Measuring range up to 15km, IEC 61400-12-1 compliant (<0.1m/s)',
      'Sustained performance in harsh inland, coastal, and plateau environments',
    ],
    applications: [
    ],
    specifications: [
      { label: 'Wavelength', value: '1.5μm, invisible and eye-safe' },
      { label: 'Detection range', value: '60m–15000m' },
      { label: 'Range resolution', value: '15m / 30m / 60m / 150m (configurable)' },
      { label: 'Wind speed range', value: '0–75m/s' },
      { label: 'Wind direction range', value: '0–360°' },
      { label: 'Wind speed accuracy', value: '≤0.1m/s' },
      { label: 'Wind direction accuracy', value: '<3°' },
      { label: 'Servo pointing accuracy', value: '≤0.1°' },
      { label: 'Scanning modes', value: 'LOS / DBS / VAD / PPI / RHI / CAPPI script' },
      { label: 'Ingress protection', value: 'IP66' },
    ],
    contentStatus: 'documented',
    image: '/images/products/wind3d-10k.webp',
  },
  {
    slug: 'wind3d-6000',
    modelName: 'Wind3D 6000',
    productType: '3D Scanning Wind LiDAR',
    category: CATEGORY.LIDARS,
    summary:
      'Wind3D 6000 is a three dimensional scanning wind LiDAR based on the optical pulse coherent Doppler frequency shift detection principle, enabling fine detection of the three dimensional wind field in the lower and middle troposphere, including the atmospheric boundary layer. Equipped with a high-pointing-accuracy optical scanning mirror, it performs 3D scanning detection (DBS/VAD/PPI/RHI/CAPPI fixed-point scanning modes) with a maximum detection radius of up to 6km.',
    features: [
      'Pulsed coherent Doppler LiDAR for wind field and aerosol detection',
      'Operational range up to 6km, real-time three-dimensional monitoring',
      'IEC 61400-12-1 compliant, 15m/30m/60m range resolution',
    ],
    applications: [

    ],
    specifications: [
      { label: 'Wavelength', value: '1.5μm, invisible and eye-safe' },
      { label: 'Detection range', value: '45m–6000m' },
      { label: 'Range resolution', value: '15m / 30m / 60m / 150m (configurable)' },
      { label: 'Wind speed range', value: '0–75m/s' },
      { label: 'Wind direction range', value: '0–360°' },
      { label: 'Wind speed accuracy', value: '≤0.1m/s' },
      { label: 'Wind direction accuracy', value: '<3°' },
      { label: 'Servo pointing accuracy', value: '≤0.1°' },
      { label: 'Scanning modes', value: 'LOS / DBS / VAD / PPI / RHI / CAPPI script' },
      { label: 'Ingress protection', value: 'IP66' },
    ],
    contentStatus: 'documented',
    image: '/images/products/wind3d-6000.webp',
  },
  {
    slug: 'windmast-pbl-ma',
    modelName: 'WindMast PBL(MA)',
    productType: 'Airborne Wind LiDAR',
    category: CATEGORY.LIDARS,
    summary:
      'WindMast PBL(MA) is a pulsed coherent airborne wind LiDAR designed for use on airborne platforms, fully developed in compliance with IEC 61400-12-1:2017 standards. Its compact, lightweight structure offers smaller size, reduced weight, and enhanced adaptability to various working environments. Easy to mount and flexible enough for multiple platforms, it overcomes terrain limitations to detect wind field conditions across plains, mountainous areas, and oceans in a short time.',
    features: [
      'Compact, lightweight structure adaptable to the working environment',
      'Easy to mount on various platforms, adaptable to different terrains',
      'Rapid wind field detection across plains, mountains, and oceans',
      'Suitable for environmental monitoring, wildfire detection, and other fields',
      'Miniaturized, low power consumption, high precision pulsed coherent wind LiDAR'
    ],
    applications: [],
    specifications: [
      { label: 'Wavelength', value: '1.5μm, eye safe' },
      { label: 'Detection range', value: '45m–2000m (overhead detection)' },
      { label: 'Range resolution', value: '15m / 30m / 60m (configurable)' },
      { label: 'Data refresh rate', value: '1s–10min (configurable)' },
      { label: 'Wind speed range', value: '0–75m/s' },
      { label: 'Wind direction range', value: '0–360°' },
      { label: 'Wind speed accuracy', value: '≤0.1m/s' },
      { label: 'Wind direction accuracy', value: '≤3°' },
      { label: 'Observation mode', value: 'DBS / VAD' },
      {
        label: 'Data output',
        value: 'Wind profile, vertical airflow, SNR, aerosol backscattering coefficient profile, cloud, etc.',
      },
      { label: 'Average power', value: '<80W' },
      { label: 'Communication mode', value: 'RS-485/422/232, TCP protocol, 4G (configurable)' },
      { label: 'Data format', value: 'ASCII' },
      { label: 'Scanning mode', value: 'Multi-beam scanning / VAD' },
      { label: 'Weight', value: '<25kg' },
    ],
    contentStatus: 'documented',
    image: '/images/products/windmast-pbl-ma.webp',
  },

  // ---- Environmental & Meteorological LiDAR ----
  {
    slug: 'watcl-15k',
    modelName: 'WATCL 15K',
    productType: 'Raman Temperature and Humidity LiDAR',
    category: CATEGORY.LIDARS,
    summary:
      'The WATCL 15K Raman temperature and humidity LiDAR is based on rotational Raman and vibrational Raman frequency shift detection principles, enabling detailed detection of temperature, humidity, and aerosols in the boundary layer, troposphere, and even the lower stratosphere. Equipped with a high energy pulsed laser, large aperture receiving telescope, high performance optical filters, and signal detection and acquisition devices, the system reaches a maximum detection altitude of 15km. Its modular design includes an internal temperature and humidity control system and an air purification system, meeting atmospheric detection requirements across a range of climatic conditions.',
    features: [
      'Aerosol and cloud optical characteristics detected at second resolution; water vapor and temperature at minute resolution, with a maximum range resolution of 7.5m',
      'Compliant with the EARLINET standard; maximum detection height reaches up to 15km',
      'Regular correction of depolarization ratio, with remote control and monitoring',
    ],
    specifications: [
      { label: 'Detection range', value: '0.2–15km (clear sky, cloudless conditions)' },
      { label: 'Range resolution', value: '7.5m / 15m / 30m (configurable)' },
      { label: 'Data refresh rate', value: '1min / 5min / 15min / 30min' },
      { label: 'Laser source', value: 'Nd:YAG (355nm / 532nm)' },
      { label: 'Wavelength', value: '355nm' },
      { label: 'Detection module', value: 'Photomultiplier tube (PMT)' },
      { label: 'Telescope', value: 'Cassegrain system' },
      {
        label: 'Data output',
        value:
          'Water vapor mixing ratio, temperature, humidity, aerosol extinction coefficient, backscattering coefficient, lidar ratio, depolarization ratio, color ratio, wavelength index, cloud height',
      },
      { label: 'Detection sensitivity', value: 'Temperature ≥1K, water vapor ≥0.01g/kg' },
      { label: 'Ingress protection', value: 'IP66' },
    ],
    contentStatus: 'documented',
    image: '/images/products/watcl-15k.webp',
  },
  {
    slug: 'mwra-12k',
    modelName: 'MWRA 12K',
    productType: 'Raman and Mie Scattering Aerosol LiDAR',
    category: CATEGORY.LIDARS,
    summary:
      'MWRA 12K Raman and Mie scattering aerosol LiDAR is based on the principles of Mie scattering, Raman scattering, and aerosol particle deflection to accurately detect atmospheric aerosol optical information. The system includes three emission wavelengths  355nm, 532nm, and 1064nm  with a receiving system that processes backscatter signals from Mie and Raman scattering to derive detailed physical information about atmospheric aerosols. Multi wavelength measurements enable more detailed study of aerosol microphysical characteristics, and the LiDAR can also measure aerosol depolarization signals and water vapor mixing ratios, closely linking aerosol optical properties to their shape, thermodynamic phase, and hygroscopicity.',
    features: [
      'Based on Mie scattering, Raman scattering, and aerosol particle depolarization principles, precisely detects atmospheric aerosol optical information (extinction coefficient, backscattering coefficient, extinction-to-backscattering ratio, depolarization ratio, boundary layer height, optical thickness, visibility, particulate matter concentration, cloud information, etc.)',
      'Compared to traditional detection methods, offers higher measurement accuracy, greater spatiotemporal resolution, and longer detection range',
    ],
    applications: [
    ],
    specifications: [
      { label: 'Wavelength', value: '355nm, 532nm, 1064nm three-wavelength emission' },
      { label: 'Detection range', value: '≥12km' },
      { label: 'Range resolution', value: '7.5m / 15m / 30m (configurable)' },
      { label: 'Data refresh rate', value: '1min / 5min / 10min / 15min / 30min (configurable)' },
      {
        label: 'Aerosol backscattering coefficient accuracy',
        value: 'Mie scattering — 0.5–2km: better than 20%, 2–5km: better than 40%; Raman scattering — 0.5–2km: better than 25%, 2–5km: better than 30%',
      },
      {
        label: 'Aerosol extinction coefficient accuracy',
        value: 'Mie scattering — 0.5–2km / 2–5km: better than 40%; Raman scattering — 0.5–2km: better than 30%, 2–5km: better than 40%',
      },
      { label: 'Total power consumption', value: '≤3kW' },
      { label: 'Power supply', value: 'AC220V ±15%, 50Hz ±5%' },
      {
        label: 'Data output',
        value:
          'Aerosol extinction and backscattering coefficient, aerosol particle depolarization ratio, cloud information, optical depth, mixing layer height, visibility, particle concentration profile, water vapor mixing ratio, etc.',
      },
      { label: 'Weight', value: '<250kg' },
      { label: 'Ingress protection', value: 'IP66' },
    ],
    contentStatus: 'documented',
    image: '/images/products/mwra-12k.webp',
  },
  {
    slug: 'windflux-3000plus',
    modelName: 'WindFlux 3000Plus',
    productType: 'Particulate Matter Flux LiDAR',
    category: CATEGORY.LIDARS,
    summary:
      'The WindFlux 3000Plus particle flux LiDAR is an integrated measurement system for atmospheric particulate flux measurement, combining coherent wind measurement capabilities with micro-pulse direct detection functionality. It delivers real-time, accurate data on atmospheric wind profiles, extinction coefficients, depolarization ratios, particle classification, boundary layer height, and cloud base height.',
    features: [
      'Integrated measuring system with coherent wind measurement and micropulse direct detection function',
      'Monitors the transport direction of particulate matter in real time, calculates concentration and transport flux, and analyzes pollution sources and distribution across regions and heights',
      'Whole-machine protection with automatic wiper and internal temperature control system, enabling unattended long-term field observation',
    ],
    applications: [],
    specifications: [
      { label: 'Wavelength', value: '532nm / 1550nm' },
      { label: 'Detection range', value: '60m–6000m (wind profile), 200m–10000m (aerosols)' },
      { label: 'Range resolution', value: '15m / 30m / 60m (configurable)' },
      { label: 'Data refresh rate', value: '1min / 5min / 10min / 15min / 30min (configurable)' },
      { label: 'Wind speed range', value: '0–75m/s' },
      { label: 'Wind direction range', value: '0–360°' },
      { label: 'Wind speed accuracy', value: '≤0.1m/s' },
      { label: 'Wind direction accuracy', value: '≤3°' },
      {
        label: 'Data output',
        value:
          'Second-level wind speed and direction, specified time average wind speed and direction, max./min. horizontal wind speed, mean square deviation of wind speed (turbulence intensity), wind shear index, vertical wind speed, atmospheric extinction coefficient, atmospheric backscatter coefficient, atmospheric depolarization ratio, pollutant flux, cloud base height, etc.',
      },
      { label: 'Detection sensitivity', value: 'Temperature: -30°C to 55°C; Relative humidity: 0–100%' },
      { label: 'Ingress protection', value: 'IP66' },
    ],
    contentStatus: 'documented',
    image: '/images/products/windflux-3000plus.webp',
  },
  {
    slug: 'o3-ddlidar',
    modelName: 'O₃-DDLidar',
    productType: 'Ozone LiDAR',
    category: CATEGORY.LIDARS,
    summary:
      'O₃-DDLidar ozone LiDAR integrates gas differential absorption detection principles with Mie scattering detection technology, enabling high precision detection of atmospheric ozone concentration profiles and aerosol optical information. It uses a high energy pulsed laser, large aperture receiving telescope, high stability receiving system, and high speed signal acquisition card, achieving ozone monitoring down to ppb level detection limits. The LiDAR is equipped with a cabin featuring a temperature and humidity control system, suited for atmospheric detection across varied climatic conditions.',
    features: [
      'Integrates the gas differential absorption detection principle with Mie scattering detection technology for high precision ozone concentration profile and aerosol optical information detection',
      'High energy pulse laser, large aperture receiving telescope, high stability receiving system, and high speed signal acquisition card enable ozone monitoring down to ppb level',
      'Cabin equipped with temperature and humidity control system, suited for atmospheric detection under varied climatic conditions',
    ],
    specifications: [
      { label: 'Wavelength', value: '280nm / 295nm / 532nm' },
      { label: 'Detection range', value: '≥3km (ozone), ≥10km (aerosols)' },
      { label: 'Data refresh rate', value: '1min–30min (configurable)' },
      { label: 'Range resolution', value: '7.5m–60m (configurable)' },
      { label: 'Ozone accuracy', value: '≤3ppb' },
      { label: 'Aerosol extinction coefficient accuracy', value: '0.2–2km: better than 20%, 2–10km: better than 40%' },
      { label: 'Aerosol backscattering coefficient accuracy', value: '0.2–2km: better than 20%, 2–10km: better than 40%' },
      {
        label: 'Data output',
        value: 'Ozone concentration profile, aerosol extinction coefficient, aerosol depolarization ratio, aerosol backscattering coefficient, signal-to-noise ratio',
      },
    ],
    contentStatus: 'documented',
    image: '/images/products/o3-ddlidar.webp',
  },
  {
    slug: 'co2-flux',
    modelName: 'CO₂ FLUX',
    productType: 'CO₂ Gas Flux LiDAR',
    category: CATEGORY.LIDARS,
    summary:
      'The CO₂FLUX LiDAR combines the differential absorption principle with coherent heterodyne detection technology, enabling high precision synchronous detection of CO₂ concentration profiles and wind fields within the boundary layer. Featuring a compact, low power, high accuracy design, it performs all weather, continuous monitoring of wind profiles, CO₂ column concentrations, CO₂ concentration profiles, and signal-to-noise ratio data products.',
    features: [
      'High precision, simultaneous detection of wind fields and CO₂ concentration within the boundary layer, calculating CO₂ flux by combining the two',
      'Three dimensional monitoring of regional greenhouse gas emissions (CO₂ and methane), emission trend analysis, and peak target assessment to support pollution reduction and carbon emission decisions',
      'Low power consumption, high precision, and user-friendly interface',
    ],
    applications: [],
    specifications: [
      { label: 'Detection range', value: '≥3km' },
      { label: 'Data refresh time', value: '≤5min' },
      { label: 'CO₂ column concentration', value: '≤±1.5ppm' },
      { label: 'Wavelength', value: '1572nm (CO₂)' },
      { label: 'Wind inversion accuracy', value: 'Wind speed ≤0.3m/s or V×3%; wind direction ≤5°' },
      {
        label: 'Data output',
        value: 'CO₂ column concentration, CO₂ profile concentration, CO₂ flux, regional distribution CO₂ concentration, wind profile, aerosol extinction coefficient, backscattering coefficient, etc.',
      },
      { label: 'Weight', value: '≤140kg' },
      { label: 'Working temperature', value: '-40°C to 55°C' },
      { label: 'Ingress protection', value: 'IP66' },
    ],
    contentStatus: 'documented',
    image: '/images/products/co2-flux.webp',
  },
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
