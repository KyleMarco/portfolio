import { LinkButton } from '../shared/ui/LinkButton';
import { useTranslation } from 'react-i18next';

const highlightKeys = ['experience', 'toolkit', 'education', 'storefront'] as const;

const stack = [
  'React 19',
  'React DOM',
  'React Hooks',
  'React Portals',
  'TypeScript',
  'Vite',
  'Tailwind CSS',
  'React Router DOM',
  'Redux Toolkit',
  'React Redux',
  'TanStack Query',
  'Axios',
  'Vitest',
  'Testing Library',
  'Oxlint',
];

export default function AboutPage() {
  const { t } = useTranslation();
  return (
    <main className="mx-auto max-w-5xl px-5 py-12 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-900/5 sm:p-10">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
          {t('about.label')}
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {highlightKeys.map((key) => (
            <article
              key={key}
              data-interactive-card
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
            >
              <h2 className="text-lg font-semibold text-slate-900">
                {t(`about.highlights.${key}.title`)}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                {t(`about.highlights.${key}.description`)}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-5">
          <h2 className="text-base font-semibold text-slate-900">{t('about.builtWith')}</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {stack.map((item) => (
              <span
                key={item}
                className="rounded-full border border-blue-200 bg-white px-3 py-1 text-xs font-medium text-blue-800"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <LinkButton to="/">{t('about.backHome')}</LinkButton>
          <LinkButton to="/demo" variant="secondary">
            {t('about.shopDemo')}
          </LinkButton>
        </div>
      </div>
    </main>
  );
}
