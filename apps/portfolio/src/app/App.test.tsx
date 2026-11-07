import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import App from './App';
import i18n from './i18n';
import { AppProviders } from './providers/AppProviders';

afterEach(async () => {
  cleanup();
  window.localStorage.clear();
  window.history.replaceState({}, '', '/');
  document.documentElement.classList.remove('dark');
  delete document.documentElement.dataset.uiTheme;
  await i18n.changeLanguage('en');
});

describe('App shared UI integration', () => {
  it('keeps the theme control accessible, translated, and persistent', async () => {
    window.history.replaceState({}, '', import.meta.env.BASE_URL);
    window.localStorage.setItem('portfolio-theme', 'light');
    await i18n.changeLanguage('en');
    render(
      <AppProviders>
        <App />
      </AppProviders>,
    );

    const header = screen.getByRole('banner');
    const main = screen.getByRole('main');
    const footer = screen.getByRole('contentinfo');
    expect(main.contains(header)).toBe(false);
    expect(main.contains(footer)).toBe(false);
    expect(
      within(header).getByRole('link', { name: 'Kyle Marco Cabiling, home' }).getAttribute('href'),
    ).toBe(import.meta.env.BASE_URL);
    expect(within(header).queryByRole('navigation')).toBeNull();
    expect(within(header).getAllByRole('link')).toHaveLength(1);
    expect(within(footer).getByRole('link', { name: 'Back to top' }).getAttribute('href')).toBe(
      '#top',
    );

    const toggle = within(header).getByRole('button', { name: 'Switch to dark mode' });
    toggle.focus();
    expect(document.activeElement).toBe(toggle);
    expect(toggle.getAttribute('aria-pressed')).toBe('false');
    fireEvent.click(toggle);

    expect(document.documentElement.dataset.uiTheme).toBe('dark');
    expect(window.localStorage.getItem('portfolio-theme')).toBe('dark');
    expect(
      screen.getByRole('button', { name: 'Switch to light mode' }).getAttribute('aria-pressed'),
    ).toBe('true');

    fireEvent.change(screen.getByRole('combobox', { name: 'Language' }), {
      target: { value: 'fil' },
    });
    expect(
      await screen.findByRole('button', { name: 'Lumipat sa maliwanag na mode' }),
    ).toBeTruthy();
    expect(screen.queryByRole('link', { name: 'View selected work' })).toBeNull();
  });

  it('keeps the name and global controls on the 404 page and when returning home', async () => {
    window.history.replaceState({}, '', `${import.meta.env.BASE_URL}missing-page`);
    window.localStorage.setItem('portfolio-theme', 'light');
    render(
      <AppProviders>
        <App />
      </AppProviders>,
    );

    const header = screen.getByRole('banner');
    expect(screen.getByRole('heading', { name: 'Page not found' })).toBeTruthy();
    expect(screen.getByRole('main').contains(header)).toBe(false);
    const homeLink = within(header).getByRole('link', { name: 'Kyle Marco Cabiling, home' });
    expect(homeLink.getAttribute('href')).toBe(import.meta.env.BASE_URL);
    homeLink.focus();
    expect(document.activeElement).toBe(homeLink);
    expect(within(header).queryByRole('navigation')).toBeNull();
    expect(within(header).getAllByRole('link')).toHaveLength(1);

    fireEvent.click(within(header).getByRole('button', { name: 'Switch to dark mode' }));
    expect(document.documentElement.dataset.uiTheme).toBe('dark');
    fireEvent.change(within(header).getByRole('combobox', { name: 'Language' }), {
      target: { value: 'fil' },
    });
    expect(
      await within(header).findByRole('button', { name: 'Lumipat sa maliwanag na mode' }),
    ).toBeTruthy();

    fireEvent.click(
      within(header).getByRole('link', {
        name: i18n.t('navigation.homeLabel', { name: 'Kyle Marco Cabiling' }),
      }),
    );
    expect(window.location.pathname).toBe(import.meta.env.BASE_URL);
    expect(within(header).getByText('Kyle Marco Cabiling')).toBeTruthy();
    expect(within(header).queryByRole('navigation')).toBeNull();
    expect(within(header).getAllByRole('link')).toHaveLength(1);
    expect(screen.queryByRole('heading', { name: i18n.t('notFound.title') })).toBeNull();
    expect(document.documentElement.dataset.uiTheme).toBe('dark');
    expect(within(header).getByRole<HTMLSelectElement>('combobox').value).toBe('fil');
  });
});
