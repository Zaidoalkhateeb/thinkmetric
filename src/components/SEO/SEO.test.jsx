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
});
