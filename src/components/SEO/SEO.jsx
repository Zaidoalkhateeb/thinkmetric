import { useEffect } from 'react';
import { siteUrl, seoDefaults } from '../../data/siteContent';

function setMeta(name, content, attr = 'name') {
  let element = document.head.querySelector(`meta[${attr}="${name}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attr, name);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function setLink(rel, href) {
  let element = document.head.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}

function absoluteUrl(value) {
  if (!value) return siteUrl;
  if (/^https?:\/\//i.test(value)) return value;
  return `${siteUrl}${value.startsWith('/') ? value : `/${value}`}`;
}

/** Keeps route-specific search and social metadata in sync after navigation. */
function SEO({ title, description, path = '/', image, imageAlt, jsonLd, noIndex = false }) {
  useEffect(() => {
    const pageTitle = title || seoDefaults.defaultTitle;
    const fullTitle = pageTitle.endsWith(seoDefaults.titleSuffix)
      ? pageTitle
      : `${pageTitle}${seoDefaults.titleSuffix}`;
    const fullDescription = description || seoDefaults.description;
    const canonicalUrl = absoluteUrl(path);
    const socialImage = absoluteUrl(image || seoDefaults.ogImage);
    const socialImageAlt = imageAlt || fullTitle;

    document.title = fullTitle;
    setMeta('description', fullDescription);
    setMeta('robots', noIndex ? 'noindex, nofollow' : 'index, follow');

    setMeta('og:title', fullTitle, 'property');
    setMeta('og:description', fullDescription, 'property');
    setMeta('og:type', 'website', 'property');
    setMeta('og:site_name', 'ThinkMetric', 'property');
    setMeta('og:locale', 'en_US', 'property');
    setMeta('og:url', canonicalUrl, 'property');
    setMeta('og:image', socialImage, 'property');
    setMeta('og:image:alt', socialImageAlt, 'property');

    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', fullDescription);
    setMeta('twitter:image', socialImage);
    setMeta('twitter:image:alt', socialImageAlt);
    setLink('canonical', canonicalUrl);

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

    return () => document.getElementById('page-jsonld')?.remove();
  }, [title, description, path, image, imageAlt, jsonLd, noIndex]);

  return null;
}

export default SEO;
