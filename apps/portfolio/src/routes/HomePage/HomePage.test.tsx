import { act, cleanup, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import HomePage from './HomePage';
import { contactCards, experiences, profile } from '../portfolioData';
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

afterEach(async () => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  await i18n.changeLanguage('en');
});

describe('HomePage', () => {
  it('translates the complete biography and portrait description when the language changes', async () => {
    renderHomePage();

    for (const { language, heading, current, previous, portrait } of [
      {
        language: 'en',
        heading: 'About me',
        current: 'Currently at KPMG (RG Manabat & Co.) as a Senior Frontend Developer.',
        previous:
          'Previously, I was a Frontend Developer at FELIX (ZZ Connect, Inc.), and an Application Systems Engineer at FUJITSU (WeServ Systems International, Inc.)',
        portrait: 'Portrait of Kyle Marco Cabiling',
      },
      {
        language: 'fil',
        heading: 'Tungkol sa akin',
        current: 'Kasalukuyang nasa KPMG (RG Manabat & Co.) bilang Senior na Frontend Developer.',
        previous:
          'Dati akong Frontend Developer sa FELIX (ZZ Connect, Inc.), at Application Systems Engineer sa FUJITSU (WeServ Systems International, Inc.)',
        portrait: 'Larawan ni Kyle Marco Cabiling',
      },
    ]) {
      await act(async () => {
        await i18n.changeLanguage(language);
      });

      const about = within(screen.getByRole('region', { name: heading }));
      expect(
        about.getByText(
          (_, element) => element?.tagName === 'P' && element.textContent === current,
        ),
      ).toBeTruthy();
      expect(
        about.getByText(
          (_, element) => element?.tagName === 'P' && element.textContent === previous,
        ),
      ).toBeTruthy();
      expect(screen.getByAltText(portrait)).toBeTruthy();

      for (const [company, href] of [
        [experiences[1].company, 'https://www.felix.net/'],
        [experiences[2].company, 'https://weserv.com/home'],
      ]) {
        const link = about.getByRole('link', { name: company });
        expect(link.getAttribute('href')).toBe(href);
        expect(link.getAttribute('target')).toBe('_blank');
        expect(link.getAttribute('rel')).toBe('noreferrer');
      }
    }
  });

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
    const experienceSection = within(screen.getByRole('region', { name: 'Experience' }));
    expect(experienceSection.getAllByRole('article')).toHaveLength(experiences.length);
    for (const experience of experiences) {
      const entry = within(experienceSection.getByRole('article', { name: experience.company }));
      expect(entry.getByRole('heading', { name: experience.company, level: 3 })).toBeTruthy();
      expect(entry.getByText(i18n.t(`portfolio.experience.${experience.id}.role`))).toBeTruthy();
      expect(entry.getByRole('list', { name: 'Technologies' })).toBeTruthy();
    }
    // JSDOM has no IntersectionObserver: content must stay visible by default.
    expect(document.querySelector('[data-reveal-state="hidden"]')).toBeNull();
  });

  it('preserves contact destinations, external targets, and keyboard focus', () => {
    renderHomePage();

    const emailAction = screen.getByRole('link', { name: 'Email me' });
    expect(emailAction.getAttribute('href')).toBe(`mailto:${profile.email}`);
    expect(emailAction.hasAttribute('target')).toBe(false);

    const contact = within(screen.getByRole('region', { name: 'Contact' }));
    for (const card of contactCards) {
      const link = contact.getByRole('link', {
        name: (name) => name.includes(card.value),
      });
      expect(link.getAttribute('href')).toBe(card.href);
      expect(link.getAttribute('target')).toBe(card.href.startsWith('http') ? '_blank' : null);
      expect(link.getAttribute('rel')).toBe(card.href.startsWith('http') ? 'noreferrer' : null);
      link.focus();
      expect(document.activeElement).toBe(link);
    }

    expect(screen.queryByRole('link', { name: 'Back to top' })).toBeNull();
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
