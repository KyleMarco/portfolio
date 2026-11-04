import { LinkButton } from '@portfolio/ui/router';
import { useTranslation } from 'react-i18next';

export default function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <main className="mx-auto max-w-3xl px-5 py-12 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-2xl shadow-slate-900/5 dark:border-stone-800 dark:bg-stone-900">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700 dark:text-blue-300">
          404
        </p>
        <h1 className="mt-3 font-serif text-3xl font-semibold text-slate-900 sm:text-4xl dark:text-stone-50">
          {t('notFound.title')}
        </h1>
        <p className="mt-4 text-slate-700 dark:text-stone-300">{t('notFound.description')}</p>
        <div className="mt-8 flex justify-center">
          <LinkButton to="/">{t('notFound.home')}</LinkButton>
        </div>
      </div>
    </main>
  );
}
