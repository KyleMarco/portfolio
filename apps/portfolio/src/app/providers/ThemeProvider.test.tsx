import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ThemeProvider } from './ThemeProvider';
import { useTheme } from './themeContext';

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  return <button onClick={toggleTheme}>{isDark ? 'Use light theme' : 'Use dark theme'}</button>;
}

function renderThemeToggle() {
  return render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>,
  );
}

function mockSystemTheme(isDark: boolean) {
  const mediaQuery = Object.assign(new EventTarget(), {
    matches: isDark,
    media: '(prefers-color-scheme: dark)',
  });
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => mediaQuery),
  );

  return {
    mediaQuery,
    setDark(nextIsDark: boolean) {
      mediaQuery.matches = nextIsDark;
      act(() => {
        mediaQuery.dispatchEvent(new Event('change'));
      });
    },
  };
}

let themeColor: HTMLMetaElement;

function expectTheme(theme: 'light' | 'dark') {
  expect(
    screen.getByRole('button', { name: `Use ${theme === 'dark' ? 'light' : 'dark'} theme` }),
  ).toBeTruthy();
  expect(document.documentElement.dataset.uiTheme).toBe(theme);
  expect(document.documentElement.classList.contains('dark')).toBe(theme === 'dark');
  expect(themeColor.getAttribute('content')).toBe(theme === 'dark' ? '#11100e' : '#fbfaf7');
}

beforeEach(() => {
  themeColor = document.createElement('meta');
  themeColor.name = 'theme-color';
  document.head.append(themeColor);
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  window.localStorage.clear();
  document.documentElement.classList.remove('dark');
  delete document.documentElement.dataset.uiTheme;
  themeColor.remove();
});

describe('ThemeProvider', () => {
  it.each(['light', 'dark'] as const)(
    'keeps the saved %s theme over system changes and persists a toggle',
    (theme) => {
      const system = mockSystemTheme(theme !== 'dark');
      window.localStorage.setItem('portfolio-theme', theme);
      renderThemeToggle();

      expectTheme(theme);

      system.setDark(theme === 'dark');
      system.setDark(theme !== 'dark');
      expectTheme(theme);
      expect(window.localStorage.getItem('portfolio-theme')).toBe(theme);

      fireEvent.click(screen.getByRole('button'));

      const nextTheme = theme === 'dark' ? 'light' : 'dark';
      expectTheme(nextTheme);
      expect(window.localStorage.getItem('portfolio-theme')).toBe(nextTheme);
    },
  );

  it.each([false, true])(
    'follows the system initially and as it changes (initial dark: %s) without saving a choice',
    (isDark) => {
      const system = mockSystemTheme(isDark);
      renderThemeToggle();

      expectTheme(isDark ? 'dark' : 'light');
      expect(window.localStorage.getItem('portfolio-theme')).toBeNull();

      system.setDark(!isDark);
      expectTheme(isDark ? 'light' : 'dark');
      system.setDark(isDark);
      expectTheme(isDark ? 'dark' : 'light');
      expect(window.localStorage.getItem('portfolio-theme')).toBeNull();
    },
  );

  it('ignores an invalid saved preference and continues following the system', () => {
    const system = mockSystemTheme(true);
    window.localStorage.setItem('portfolio-theme', 'sepia');
    renderThemeToggle();

    expectTheme('dark');
    system.setDark(false);
    expectTheme('light');
  });

  it('stops following the system after a manual choice', () => {
    const system = mockSystemTheme(true);
    renderThemeToggle();
    fireEvent.click(screen.getByRole('button', { name: 'Use light theme' }));

    expectTheme('light');
    system.setDark(false);
    system.setDark(true);

    expectTheme('light');
    expect(window.localStorage.getItem('portfolio-theme')).toBe('light');
  });

  it('restores a manual choice when the provider mounts again', () => {
    const system = mockSystemTheme(false);
    const { unmount } = renderThemeToggle();
    fireEvent.click(screen.getByRole('button', { name: 'Use dark theme' }));
    unmount();

    renderThemeToggle();

    expectTheme('dark');
    system.setDark(true);
    system.setDark(false);
    expectTheme('dark');
  });

  it('follows system changes when reading local storage throws', () => {
    const system = mockSystemTheme(true);
    const getItem = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new DOMException('Storage is unavailable', 'SecurityError');
    });
    renderThemeToggle();

    expect(getItem).toHaveBeenCalledWith('portfolio-theme');
    expectTheme('dark');
    system.setDark(false);
    expectTheme('light');
  });

  it('keeps manual toggling usable when writing local storage throws', () => {
    const system = mockSystemTheme(false);
    const setItem = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('Storage is full', 'QuotaExceededError');
    });
    renderThemeToggle();

    fireEvent.click(screen.getByRole('button', { name: 'Use dark theme' }));

    expect(setItem).toHaveBeenCalledWith('portfolio-theme', 'dark');
    expectTheme('dark');
    system.setDark(true);
    system.setDark(false);
    expectTheme('dark');

    fireEvent.click(screen.getByRole('button', { name: 'Use light theme' }));

    expectTheme('light');
    expect(setItem).toHaveBeenLastCalledWith('portfolio-theme', 'light');
  });

  it('defaults to light and allows toggling when matchMedia is unavailable', () => {
    vi.stubGlobal('matchMedia', undefined);
    renderThemeToggle();

    expectTheme('light');
    fireEvent.click(screen.getByRole('button', { name: 'Use dark theme' }));
    expectTheme('dark');
    expect(window.localStorage.getItem('portfolio-theme')).toBe('dark');
  });

  it('removes its system change listener on unmount', () => {
    const { mediaQuery } = mockSystemTheme(false);
    const addListener = vi.spyOn(mediaQuery, 'addEventListener');
    const removeListener = vi.spyOn(mediaQuery, 'removeEventListener');
    const { unmount } = renderThemeToggle();

    expect(addListener).toHaveBeenCalledExactlyOnceWith('change', expect.any(Function));
    const listener = addListener.mock.calls[0][1];

    unmount();

    expect(removeListener).toHaveBeenCalledExactlyOnceWith('change', listener);
  });
});
