import { useLayoutEffect, type ReactNode } from 'react';

export function ThemePreview({ theme, children }: { theme: string; children: ReactNode }) {
  useLayoutEffect(() => {
    const root = document.documentElement;
    const previousTheme = root.dataset.uiTheme;
    root.dataset.uiTheme = theme;
    return () => {
      if (previousTheme === undefined) delete root.dataset.uiTheme;
      else root.dataset.uiTheme = previousTheme;
    };
  }, [theme]);

  return <div className="min-h-40 bg-ui-canvas p-6 text-ui-text">{children}</div>;
}
