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
  WIND_LIDAR: {
    slug: 'wind-measurement-lidar',
    label: 'Wind Measurement — LiDAR',
  },
  ENV_LIDAR: {
    slug: 'environmental-meteorological-lidar',
    label: 'Environmental & Meteorological LiDAR',
  },
};

function buildSummary(modelName, productType) {
  return `${modelName} is included in ThinkMetric's portfolio as a ${productType.toLowerCase()} solution. Contact our technical team to discuss application fit, configuration, and verified technical specifications.`;
}

const raw = [
  // ---- Wind Measurement — LiDAR ----
  { slug: 'windhorizon-h400', modelName: 'WindHorizon H400', productType: 'Nacelle Wind LiDAR', category: CATEGORY.WIND_LIDAR },
  { slug: 'windmast-wp350', modelName: 'WindMast WP350', productType: 'Vertical Wind LiDAR', category: CATEGORY.WIND_LIDAR },
  { slug: 'windmast-350-mb', modelName: 'WindMast 350-MB', productType: 'Floating Buoy Wind LiDAR', category: CATEGORY.WIND_LIDAR },
  { slug: 'lc-lhm-905', modelName: 'LC-LHM-905', productType: 'Blade Clearance Monitoring LiDAR', category: CATEGORY.WIND_LIDAR },
  { slug: 'windmast-pbl', modelName: 'WindMast PBL', productType: 'Boundary Layer Wind LiDAR', category: CATEGORY.WIND_LIDAR },
  { slug: 'windmast-pbl-m-windflux-3000', modelName: 'WindMast PBL(M) / WindFlux 3000', productType: 'Boundary Layer Wind LiDAR', category: CATEGORY.WIND_LIDAR },
  { slug: 'windmast-pbl-s', modelName: 'WindMast PBL(S)', productType: 'Boundary Layer Wind LiDAR', category: CATEGORY.WIND_LIDAR },
  { slug: 'windmast-pbl-sv-mv', modelName: 'WindMast PBL(SV) / PBL(MV)', productType: 'Boundary Layer Wind LiDAR', category: CATEGORY.WIND_LIDAR },
  { slug: 'wind3d-10k', modelName: 'Wind3D 10K', productType: '3D Scanning Wind LiDAR', category: CATEGORY.WIND_LIDAR },
  { slug: 'wind3d-6000', modelName: 'Wind3D 6000', productType: '3D Scanning Wind LiDAR', category: CATEGORY.WIND_LIDAR },
  { slug: 'windmast-pbl-ma', modelName: 'WindMast PBL(MA)', productType: 'Airborne Wind LiDAR', category: CATEGORY.WIND_LIDAR },

  // ---- Environmental & Meteorological LiDAR ----
  { slug: 'watcl-15k', modelName: 'WATCL 15K', productType: 'Raman Temperature and Humidity LiDAR', category: CATEGORY.ENV_LIDAR },
  { slug: 'mwra-12k', modelName: 'MWRA 12K', productType: 'Raman and Mie Scattering Aerosol LiDAR', category: CATEGORY.ENV_LIDAR },
  { slug: 'windflux-3000plus', modelName: 'WindFlux 3000Plus', productType: 'Particulate Matter Flux LiDAR', category: CATEGORY.ENV_LIDAR },
  { slug: 'o3-ddlidar', modelName: 'O₃-DDLidar', productType: 'Ozone LiDAR', category: CATEGORY.ENV_LIDAR },
  { slug: 'co2-flux', modelName: 'CO₂ FLUX', productType: 'CO₂ Gas Flux LiDAR', category: CATEGORY.ENV_LIDAR },
];

export const products = raw.map((item) => ({
  slug: item.slug,
  modelName: item.modelName,
  productType: item.productType,
  categorySlug: item.category.slug,
  categoryLabel: item.category.label,
  summary: buildSummary(item.modelName, item.productType),
  applications: [],
  image: null,
  pdfUrl: null,
  contentStatus: 'pending',
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
