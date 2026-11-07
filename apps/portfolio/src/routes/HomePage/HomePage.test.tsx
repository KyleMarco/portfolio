import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import HomePage from './HomePage';
import { experiences, profile } from '../portfolioData';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../app/i18n';

function renderHomePage() {
  return render(
    <I18nextProvider i18n={i18n}>
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    </I18nextProvider>,
  );
}

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('HomePage', () => {
  it('shows the portfolio sections while selected work is hidden', () => {
    renderHomePage();

    expect(
      screen.getByRole('heading', { name: `${profile.firstName} ${profile.lastName}` }),
    ).toBeTruthy();
    expect(screen.queryByRole('heading', { name: 'Projects' })).toBeNull();
    expect(screen.getByRole('heading', { name: 'About me' })).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Experience' })).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Contact' })).toBeTruthy();

    expect(screen.queryByRole('link', { name: 'View selected work' })).toBeNull();
    const resumeLink = screen.getByRole('link', { name: 'View résumé PDF' });
    expect(resumeLink.getAttribute('href')).toBe(
      `${import.meta.env.BASE_URL}Marco_Senior_Frontend_Developer_Resume.pdf`,
    );
    expect(resumeLink.getAttribute('target')).toBe('_blank');
    expect(screen.getByRole('heading', { name: experiences[0].company })).toBeTruthy();
    // JSDOM has no IntersectionObserver: content must stay visible by default.
    expect(document.querySelector('[data-reveal-state="hidden"]')).toBeNull();
  });

  it('reveals offscreen sections once and clears their state on unmount', () => {
    let onIntersection: IntersectionObserverCallback | undefined;
    const observe = vi.fn();
    const unobserve = vi.fn();
    const disconnect = vi.fn();
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        constructor(callback: IntersectionObserverCallback) {
          onIntersection = callback;
        }
        observe = observe;
        unobserve = unobserve;
        disconnect = disconnect;
      },
    );
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: false }));
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue(
      new DOMRect(0, window.innerHeight + 100, 100, 100),
    );
    const { unmount } = renderHomePage();
    const section = screen.getByRole('region', { name: 'Experience' });
    expect(section.getAttribute('data-reveal-state')).toBe('hidden');
    expect(observe).toHaveBeenCalledWith(section);

    onIntersection?.(
      [
        {
          isIntersecting: true,
          target: section,
          boundingClientRect: section.getBoundingClientRect(),
          intersectionRect: section.getBoundingClientRect(),
          intersectionRatio: 1,
          rootBounds: null,
          time: 0,
        },
      ],
      {} as IntersectionObserver,
    );
    expect(section.getAttribute('data-reveal-state')).toBe('visible');
    expect(unobserve).toHaveBeenCalledWith(section);

    unmount();
    expect(disconnect).toHaveBeenCalledOnce();
    expect(section.hasAttribute('data-reveal-state')).toBe(false);
  });

  it('keeps every section visible without observation when reduced motion is requested', () => {
    const observer = vi.fn();
    vi.stubGlobal('IntersectionObserver', observer);
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: true }));
    renderHomePage();

    expect(observer).not.toHaveBeenCalled();
    expect(screen.getByRole('region', { name: 'Experience' })).toBeTruthy();
    expect(document.querySelector('[data-reveal-state]')).toBeNull();
  });
});
