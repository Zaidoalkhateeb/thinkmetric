import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import ProductCatalog from './ProductCatalog';

describe('ProductCatalog', () => {
  it('filters the catalogue by category', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <ProductCatalog />
      </MemoryRouter>
    );

    expect(screen.getByRole('status')).toHaveTextContent('19 products found');
    await user.click(screen.getByRole('button', { name: 'Power Solutions' }));
    expect(screen.getByRole('status')).toHaveTextContent('3 products found');
    expect(screen.getAllByRole('article')).toHaveLength(3);
  });
});
