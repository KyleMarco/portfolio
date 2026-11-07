import { Button, Container, Header, Link } from '@portfolio/ui';
import { Moon, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { profile } from '../../routes/portfolioData';
import { useTheme } from '../providers/themeContext';

export default function AppHeader() {
  const { t, i18n } = useTranslation();
  const { isDark, toggleTheme } = useTheme();

  return (
    <Header className="sticky top-0 z-10 mb-0! py-0! [--ui-border-default:var(--color-stone-200)] [--ui-surface-default:var(--ui-surface-canvas)] [--ui-text-default:var(--color-stone-950)] dark:[--ui-border-default:var(--color-stone-800)] dark:[--ui-text-default:var(--color-stone-100)]">
      <Container size="full" className="my-0! max-w-6xl! px-5! py-0! sm:px-8! lg:px-10!">
        <div className="flex items-center justify-between gap-3 py-4 sm:gap-5">
          <Link
            href="#top"
            aria-label={t('navigation.homeLabel', {
              name: `${profile.firstName} ${profile.lastName}`,
            })}
            className="min-w-0 text-sm font-semibold tracking-tight text-stone-950 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-stone-950 sm:text-base dark:text-stone-100 dark:focus-visible:outline-stone-100"
          >
            {profile.firstName} {profile.lastName}
          </Link>
          <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
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
        </div>
      </Container>
    </Header>
  );
}
