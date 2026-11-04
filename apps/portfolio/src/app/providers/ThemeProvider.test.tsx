import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { ThemeProvider } from './ThemeProvider';
import { useTheme } from './themeContext';

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  return <button onClick={toggleTheme}>{isDark ? 'Use light theme' : 'Use dark theme'}</button>;
}

afterEach(() => {
  cleanup();
  window.localStorage.clear();
  document.documentElement.classList.remove('dark');
  delete document.documentElement.dataset.uiTheme;
});

describe('ThemeProvider', () => {
  it('applies the saved theme to both app utilities and shared UI, then persists a toggle', () => {
    window.localStorage.setItem('portfolio-theme', 'dark');
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>,
    );

    expect(document.documentElement.dataset.uiTheme).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    fireEvent.click(screen.getByRole('button', { name: 'Use light theme' }));

    expect(document.documentElement.dataset.uiTheme).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(window.localStorage.getItem('portfolio-theme')).toBe('light');
  });
});
