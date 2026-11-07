import { Container, Footer } from '@portfolio/ui';
import { profile } from '../../routes/portfolioData';
import { useTranslation } from 'react-i18next';

const technologies = ['React', 'TypeScript', 'Vite', 'Tailwind CSS'];

export default function AppFooter() {
  const { t } = useTranslation();
  return (
    <Footer className="mt-0! bg-transparent! [--ui-border-default:var(--color-stone-200)] dark:[--ui-border-default:var(--color-stone-800)]">
      <Container size="full" className="my-0! max-w-6xl! px-5! py-0! sm:px-8! lg:px-10!">
        <div className="flex flex-col gap-2 text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between dark:text-stone-400">
          <span>
            {profile.firstName} {profile.lastName} <span aria-hidden="true">·</span>{' '}
            {t('portfolio.profile.footerRole')}
          </span>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-stone-500 dark:text-stone-400">
          <span>{t('footer.poweredBy')}</span>
          <ul aria-label={t('home.technologies')} className="flex flex-wrap gap-2">
            {technologies.map((technology) => (
              <li
                key={technology}
                className="rounded-full border border-stone-200 px-2.5 py-1 text-stone-600 dark:border-stone-800 dark:text-stone-300"
              >
                {technology}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Footer>
  );
}
