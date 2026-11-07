import { createRef } from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Link } from '@portfolio/ui';

afterEach(cleanup);

describe('Link', () => {
  it('renders a native link without a router provider', () => {
    render(<Link href="#contact">Contact me</Link>);

    const link = screen.getByRole('link', { name: 'Contact me' });
    expect(link.tagName).toBe('A');
    expect(link.getAttribute('href')).toBe('#contact');
  });

  it('preserves native attributes, custom styles, and a ref', () => {
    const ref = createRef<HTMLAnchorElement>();
    render(
      <Link
        href="https://example.com"
        ref={ref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Read the documentation (opens in a new tab)"
        className="font-semibold"
        style={{ marginTop: 8 }}
      >
        Documentation
      </Link>,
    );

    const link = screen.getByRole('link', {
      name: 'Read the documentation (opens in a new tab)',
    });
    expect(ref.current).toBe(link);
    expect(link.getAttribute('href')).toBe('https://example.com');
    expect(link.getAttribute('target')).toBe('_blank');
    expect(link.getAttribute('rel')).toBe('noopener noreferrer');
    expect(link.classList.contains('font-semibold')).toBe(true);
    expect(link.style.marginTop).toBe('8px');
    ref.current?.focus();
    expect(document.activeElement).toBe(link);
  });

  it('supports download links', () => {
    render(
      <Link href="/files/guide.pdf" download="guide.pdf">
        Download guide
      </Link>,
    );

    const link = screen.getByRole('link', { name: 'Download guide' });
    expect(link.getAttribute('href')).toBe('/files/guide.pdf');
    expect(link.getAttribute('download')).toBe('guide.pdf');
  });

  it('lets callers handle clicks and prevent navigation', () => {
    const onClick = vi.fn((event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
    });
    render(
      <Link href="#contact" onClick={onClick}>
        Contact me
      </Link>,
    );

    const result = fireEvent.click(screen.getByRole('link', { name: 'Contact me' }));

    expect(onClick).toHaveBeenCalledOnce();
    expect(result).toBe(false);
  });
});
