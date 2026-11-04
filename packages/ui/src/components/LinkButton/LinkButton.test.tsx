import { createRef } from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it } from 'vitest';
import { LinkButton } from '@portfolio/ui/router';

afterEach(cleanup);

describe('LinkButton', () => {
  it('renders an internal link with its destination and variant', () => {
    render(
      <MemoryRouter>
        <LinkButton to="/projects/sample" variant="secondary">
          View project
        </LinkButton>
      </MemoryRouter>,
    );

    const link = screen.getByRole('link', { name: 'View project' });
    expect(link.getAttribute('href')).toBe('/projects/sample');
    expect(link.className).toContain('border-ui-border');
  });

  it('uses the primary style by default', () => {
    render(
      <MemoryRouter>
        <LinkButton to="/">Go home</LinkButton>
      </MemoryRouter>,
    );

    expect(screen.getByRole('link', { name: 'Go home' }).className).toContain('bg-ui-action');
  });

  it('forwards anchor attributes, router options, and a ref', () => {
    const ref = createRef<HTMLAnchorElement>();
    render(
      <MemoryRouter>
        <LinkButton
          to="/settings"
          ref={ref}
          target="_blank"
          rel="noopener"
          aria-label="Open settings"
          className="w-full"
          replace
        >
          Settings
        </LinkButton>
      </MemoryRouter>,
    );

    const link = screen.getByRole('link', { name: 'Open settings' });
    expect(ref.current).toBe(link);
    expect(link.getAttribute('href')).toBe('/settings');
    expect(link.getAttribute('target')).toBe('_blank');
    expect(link.getAttribute('rel')).toBe('noopener');
    expect(link.classList.contains('w-full')).toBe(true);
    ref.current?.focus();
    expect(document.activeElement).toBe(link);
  });
});
