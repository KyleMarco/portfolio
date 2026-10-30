import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HomePage, NotFoundPage, ShopPage } from '../../routes';
import { profile } from '../../routes/portfolioData';

export function AppRouter() {
  const { t, i18n } = useTranslation();

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <div id="top" className="min-h-screen bg-[#fbfaf7] text-stone-950">
        <header className="sticky top-0 z-10 border-b border-stone-200 bg-[#fbfaf7]">
          <nav
            aria-label={t('navigation.label')}
            className="mx-auto flex max-w-6xl items-center justify-between gap-5 px-5 py-4 sm:px-8 lg:px-10"
          >
            <Link
              to="/"
              aria-label="Kyle Marco Cabiling, home"
              className="text-sm font-semibold tracking-[-0.04em] text-stone-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-stone-950"
            >
              KM<span className="text-stone-400">.</span>
            </Link>
            <div className="flex items-center gap-4 sm:gap-7">
              <a
                href={`${import.meta.env.BASE_URL}#projects`}
                className="text-sm text-stone-500 transition-colors hover:text-stone-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-stone-950"
              >
                {t('navigation.work')}
              </a>
              <a
                href={`${import.meta.env.BASE_URL}#about`}
                className="text-sm text-stone-500 transition-colors hover:text-stone-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-stone-950"
              >
                {t('navigation.about')}
              </a>
              <a
                href={`${import.meta.env.BASE_URL}#experience`}
                className="text-sm text-stone-500 transition-colors hover:text-stone-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-stone-950"
              >
                {t('navigation.experience')}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <label className="sr-only" htmlFor="language-select">
                {t('navigation.language')}
              </label>
              <select
                id="language-select"
                value={i18n.resolvedLanguage?.startsWith('fil') ? 'fil' : 'en'}
                onChange={(event) => void i18n.changeLanguage(event.target.value)}
                className="bg-transparent text-xs text-stone-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-stone-950"
              >
                <option value="en">English</option>
                <option value="fil">Filipino</option>
              </select>
              <a
                href={`mailto:${profile.email}`}
                className="hidden border border-stone-300 px-3 py-2 text-xs font-medium text-stone-800 transition-colors hover:border-stone-500 sm:inline-flex"
              >
                {t('navigation.contact')}{' '}
                <span aria-hidden="true" className="ml-2">
                  ↗
                </span>
              </a>
            </div>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/demo" element={<ShopPage />} />
          <Route path="/shop" element={<Navigate to="/demo" replace />} />
          <Route path="/about" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default AppRouter;
