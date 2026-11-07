import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Button } from '@portfolio/ui';
import { useTranslation } from 'react-i18next';
import { Moon, Sun } from 'lucide-react';
import { HomePage, NotFoundPage } from '../../routes';
import { useTheme } from '../providers/themeContext';

function AppRouter() {
  const { t, i18n } = useTranslation();
  const { isDark, toggleTheme } = useTheme();

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <div id="top" className="min-h-screen bg-ui-canvas text-stone-950 dark:text-stone-100">
        <header className="sticky top-0 z-10 border-b border-stone-200 bg-ui-canvas dark:border-stone-800">
          <nav
            aria-label={t('navigation.label')}
            className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-4 sm:gap-5 sm:px-8 lg:px-10"
          >
            <div className="flex items-center gap-2 sm:gap-7">
              <a
                href="#about"
                className="text-xs text-stone-500 transition-colors hover:text-stone-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-stone-950 sm:text-sm dark:text-stone-400 dark:hover:text-stone-50 dark:focus-visible:outline-stone-100"
              >
                {t('navigation.about')}
              </a>
              <a
                href="#experience"
                className="text-xs text-stone-500 transition-colors hover:text-stone-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-stone-950 sm:text-sm dark:text-stone-400 dark:hover:text-stone-50 dark:focus-visible:outline-stone-100"
              >
                {t('navigation.experience')}
              </a>
              <a
                href="#contact"
                className="text-xs text-stone-500 transition-colors hover:text-stone-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-stone-950 sm:text-sm dark:text-stone-400 dark:hover:text-stone-50 dark:focus-visible:outline-stone-100"
              >
                {t('navigation.contact')}
              </a>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <Button
                variant="secondary"
                size="icon"
                aria-label={t(isDark ? 'navigation.switchToLight' : 'navigation.switchToDark')}
                aria-pressed={isDark}
                onClick={toggleTheme}
                className={[
                  '[--ui-surface-muted:#faf9f6] dark:[--ui-surface-muted:var(--color-stone-900)]',
                  '[--ui-surface-canvas:var(--color-stone-100)] dark:[--ui-surface-canvas:var(--color-stone-800)]',
                  '[--ui-text-default:var(--color-stone-700)] dark:[--ui-text-default:var(--color-stone-200)]',
                  '[--ui-border-default:var(--color-stone-300)] dark:[--ui-border-default:var(--color-stone-700)]',
                  '[--ui-focus-color:var(--color-stone-950)] dark:[--ui-focus-color:var(--color-stone-100)]',
                ].join(' ')}
              >
                {isDark ? (
                  <Sun aria-hidden="true" focusable="false" className="h-4 w-4" />
                ) : (
                  <Moon aria-hidden="true" focusable="false" className="h-4 w-4" />
                )}
              </Button>
              <label className="sr-only" htmlFor="language-select">
                {t('navigation.language')}
              </label>
              <select
                id="language-select"
                value={i18n.resolvedLanguage?.startsWith('fil') ? 'fil' : 'en'}
                onChange={(event) => void i18n.changeLanguage(event.target.value)}
                className="max-w-[4.5rem] bg-transparent text-xs text-stone-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-stone-950 sm:max-w-none dark:text-stone-300 dark:focus-visible:outline-stone-100"
              >
                <option value="en">English</option>
                <option value="fil">Filipino</option>
              </select>
            </div>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default AppRouter;
