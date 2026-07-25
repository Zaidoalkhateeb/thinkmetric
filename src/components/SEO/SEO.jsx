import { useEffect } from 'react';
import { siteUrl, seoDefaults } from '../../data/siteContent';

function setMeta(name, content, attr = 'name') {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Lightweight per-page SEO manager. Sets document title, meta description,
 * canonical URL, and Open Graph / Twitter tags without adding a routing
 * dependency like react-helmet.
 */
function SEO({ title, description, path = '', image, jsonLd }) {
  useEffect(() => {
    const fullTitle = title ? `${title}${seoDefaults.titleSuffix}` : 'ThinkMetric';
    document.title = fullTitle;

    setMeta('description', description);
    setMeta('og:title', fullTitle, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:type', 'website', 'property');
    setMeta('og:url', `${siteUrl}${path}`, 'property');
    setMeta('og:image', `${siteUrl}${image || seoDefaults.ogImage}`, 'property');
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', `${siteUrl}${image || seoDefaults.ogImage}`);
    setLink('canonical', `${siteUrl}${path}`);

    let script = document.getElementById('page-jsonld');
    if (jsonLd) {
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = 'page-jsonld';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(jsonLd);
    } else if (script) {
      script.remove();
    }

    return () => {
      const s = document.getElementById('page-jsonld');
      if (s) s.remove();
    };
  }, [title, description, path, image, jsonLd]);

  return null;
}

export default SEO;
