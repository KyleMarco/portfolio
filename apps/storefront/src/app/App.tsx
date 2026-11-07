import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ShopPage from '../routes/ShopPage/ShopPage';

export default function App() {
  const { t, i18n } = useTranslation();

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <div className="min-h-screen bg-ui-canvas text-stone-950 [color-scheme:light]">
        <nav
          aria-label={t('navigation.label')}
          className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4"
        >
          <a
            href={import.meta.env.DEV ? 'http://localhost:5173/portfolio/' : '/portfolio/'}
            className="underline"
          >
            {t('navigation.homeLabel', { name: 'Kyle Marco Cabiling' })}
          </a>
          <label>
            <span className="sr-only">{t('navigation.language')}</span>
            <select
              value={i18n.resolvedLanguage?.startsWith('fil') ? 'fil' : 'en'}
              onChange={(event) => void i18n.changeLanguage(event.target.value)}
            >
              <option value="en">English</option>
              <option value="fil">Filipino</option>
            </select>
          </label>
        </nav>
        <Routes>
          <Route path="/" element={<ShopPage />} />
          <Route
            path="*"
            element={
              <main className="p-6">
                <h1>{t('notFound.title')}</h1>
                <a href={import.meta.env.BASE_URL}>{t('notFound.home')}</a>
              </main>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
