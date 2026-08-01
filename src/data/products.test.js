import { describe, expect, it } from 'vitest';
import { categories } from './siteContent';
import { getProductBySlug, getProductsByCategory, products } from './products';

describe('product catalogue integrity', () => {
  it('has unique, resolvable slugs', () => {
    const slugs = products.map((product) => product.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    products.forEach((product) => expect(getProductBySlug(product.slug)).toBe(product));
  });

  it('uses only configured categories', () => {
    const categorySlugs = new Set(categories.map((category) => category.slug));
    products.forEach((product) => expect(categorySlugs.has(product.categorySlug)).toBe(true));
  });

  it('keeps category selectors consistent with the catalogue', () => {
    categories.forEach((category) => {
      expect(getProductsByCategory(category.slug)).toEqual(
        products.filter((product) => product.categorySlug === category.slug)
      );
    });
  });
});
