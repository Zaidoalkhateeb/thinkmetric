import { render, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import SEO from './SEO';

describe('SEO', () => {
  it('updates route metadata and canonical URL', async () => {
    render(<SEO title="Test page" description="Test description" path="/test" />);

    await waitFor(() => expect(document.title).toBe('Test page | ThinkMetric'));
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute('content', 'Test description');
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://www.think-metric.co/test'
    );
  });

  it('sets complete social metadata and noindex when requested', async () => {
    render(
      <SEO
        title="Private page"
        description="Not for search results"
        path="/private"
        image="/images/private.jpg"
        noIndex
      />
    );

    await waitFor(() => expect(document.title).toBe('Private page | ThinkMetric'));
    expect(document.querySelector('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
    expect(document.querySelector('meta[property="og:url"]')).toHaveAttribute(
      'content',
      'https://www.think-metric.co/private'
    );
    expect(document.querySelector('meta[property="og:image"]')).toHaveAttribute(
      'content',
      'https://www.think-metric.co/images/private.jpg'
    );
    expect(document.querySelector('meta[property="og:site_name"]')).toHaveAttribute('content', 'ThinkMetric');
  });

  it('supports an exact title for the home page', async () => {
    render(<SEO title="ThinkMetric Home Page" path="/" exactTitle />);

    await waitFor(() => expect(document.title).toBe('ThinkMetric Home Page'));
  });
});
