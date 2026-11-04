import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { ThemeContext } from './themeContext';

type Theme = 'light' | 'dark';

type ThemePreference = {
  theme: Theme;
  manualOverride: boolean;
};

const THEME_STORAGE_KEY = 'portfolio-theme';
const COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)';

function getSystemTheme(): Theme {
  return typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia(COLOR_SCHEME_QUERY).matches
    ? 'dark'
    : 'light';
}

function getInitialTheme(): ThemePreference {
  try {
    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return { theme: savedTheme, manualOverride: true };
    }
  } catch {
    // Fall back to the system preference when local storage is unavailable.
  }

  return { theme: getSystemTheme(), manualOverride: false };
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreference] = useState(getInitialTheme);
  const { theme, manualOverride } = preference;
  const isDark = theme === 'dark';

  useEffect(() => {
    if (manualOverride || typeof window.matchMedia !== 'function') {
      return;
    }

    const systemTheme = window.matchMedia(COLOR_SCHEME_QUERY);
    const syncSystemTheme = () => {
      setPreference({ theme: systemTheme.matches ? 'dark' : 'light', manualOverride: false });
    };

    systemTheme.addEventListener('change', syncSystemTheme);
    return () => systemTheme.removeEventListener('change', syncSystemTheme);
  }, [manualOverride]);

  useLayoutEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.dataset.uiTheme = theme;
    document
      .querySelector<HTMLMetaElement>('meta[name="theme-color"]')
      ?.setAttribute('content', isDark ? '#11100e' : '#fbfaf7');
  }, [isDark, theme]);

  const toggleTheme = useCallback(() => {
    const nextTheme = isDark ? 'light' : 'dark';
    setPreference({ theme: nextTheme, manualOverride: true });

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {
      // Keep the current session usable when local storage is unavailable.
    }
  }, [isDark]);

  const value = useMemo(() => ({ isDark, toggleTheme }), [isDark, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
