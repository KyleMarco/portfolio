import { cleanup, fireEvent, render, screen } from '@testing-library/react';
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

    const toggle = screen.getByRole('button', { name: 'Switch to dark mode' });
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
});
