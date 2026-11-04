import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HomePage, NotFoundPage } from '../../routes';
import { useTheme } from '../providers/themeContext';

function AppRouter() {
  const { t, i18n } = useTranslation();
  const { isDark, toggleTheme } = useTheme();

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <div
        id="top"
        className="min-h-screen bg-[#fbfaf7] text-stone-950 [color-scheme:light] dark:bg-stone-950 dark:text-stone-100 dark:[color-scheme:dark]"
      >
        <header className="sticky top-0 z-10 border-b border-stone-200 bg-[#fbfaf7] dark:border-stone-800 dark:bg-stone-950">
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
              <button
                type="button"
                aria-label={t(isDark ? 'navigation.switchToLight' : 'navigation.switchToDark')}
                aria-pressed={isDark}
                onClick={toggleTheme}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-stone-300 bg-[#faf9f6] text-stone-700 transition-colors hover:bg-stone-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-950 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200 dark:hover:bg-stone-800 dark:focus-visible:outline-stone-100"
              >
                {isDark ? (
                  <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4 w-4">
                    <circle cx="10" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.5" />
                    <path
                      d="M10 2.5v1.25m0 12.5v1.25m7.5-7.5h-1.25m-12.5 0H2.5m12.803-5.303-.884.884m-8.838 8.838-.884.884m10.606 0-.884-.884m-8.838-8.838-.884-.884"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="1.5"
                    />
                  </svg>
                ) : (
                  <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4 w-4">
                    <path
                      d="M16.2 12.5A6.8 6.8 0 0 1 7.5 3.8a6.8 6.8 0 1 0 8.7 8.7Z"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                  </svg>
                )}
              </button>
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
