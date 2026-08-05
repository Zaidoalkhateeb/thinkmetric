import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('application routing', () => {
  it('loads a lazy route and renders the not-found experience', async () => {
    window.history.pushState({}, '', '/route-that-does-not-exist');
    render(<App />);

    expect(screen.getByRole('banner')).not.toHaveClass('site-header--hidden');
    expect(await screen.findByRole('heading', { name: 'Signal not found' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /back to home/i })).toHaveAttribute('href', '/');
  });

  it('opens and dismisses the mobile navigation with the keyboard', () => {
    window.history.pushState({}, '', '/');
    render(<App />);

    const trigger = document.querySelector('.site-header__burger');
    fireEvent.click(trigger);
    expect(screen.getByRole('dialog', { name: 'Mobile navigation' })).toBeInTheDocument();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog', { name: 'Mobile navigation' })).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it('reveals mobile product categories from the products arrow', () => {
    window.history.pushState({}, '', '/');
    render(<App />);

    fireEvent.click(document.querySelector('.site-header__burger'));
    const mobileNav = within(screen.getByRole('dialog', { name: 'Mobile navigation' }));
    expect(mobileNav.queryByRole('link', { name: 'Power Solutions' })).not.toBeInTheDocument();

    const toggle = mobileNav.getByRole('button', { name: 'Show product categories' });
    fireEvent.click(toggle);

    expect(mobileNav.getByRole('link', { name: 'Power Solutions' })).toBeInTheDocument();
    expect(mobileNav.getByRole('link', { name: 'Lidars' })).toBeInTheDocument();
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
  });
});
