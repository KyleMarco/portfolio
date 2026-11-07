import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { Card, Container, Footer, Link, Text } from '@portfolio/ui';
import { contactCards, education, experiences, profile, skillGroups } from '../portfolioData';

function EmployerLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      className="w-fit font-medium decoration-blue-800 hover:decoration-stone-900 focus-visible:outline-offset-4! [--ui-action-background:var(--color-blue-800)] [--ui-action-hover:var(--ui-action-background)] dark:decoration-stone-700 dark:hover:decoration-stone-300 dark:[--ui-action-background:var(--color-stone-300)]"
    >
      {children}
    </Link>
  );
}

function SectionHeading({ eyebrow, title, id }: { eyebrow: string; title: string; id?: string }) {
  return (
    <div className="mb-10 flex items-end gap-5 border-b border-stone-300 pb-5 sm:mb-12 dark:border-stone-700">
      <span aria-hidden="true" className="mb-2 h-8 w-1 shrink-0 bg-amber-800 dark:bg-amber-500" />
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-amber-900 dark:text-amber-300">
          {eyebrow}
        </p>
        <h2
          id={id}
          className="font-serif text-4xl font-medium tracking-tight text-stone-950 sm:text-5xl dark:text-stone-50"
        >
          {title}
        </h2>
      </div>
    </div>
  );
}

export default function HomePage() {
  const { t, i18n } = useTranslation();
  const mainRef = useRef<HTMLDivElement>(null);
  const locale = i18n.resolvedLanguage?.startsWith('fil') ? 'fil-PH' : 'en-PH';
  const dateFormatter = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' });
  const formatMonthYear = (date: { year: number; month: number }) =>
    dateFormatter.format(new Date(date.year, date.month - 1, 1));

  useLayoutEffect(() => {
    const main = mainRef.current;
    if (
      !main ||
      !('IntersectionObserver' in window) ||
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const sections = Array.from(main.querySelectorAll<HTMLElement>('[data-scroll-reveal]'));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const section = entry.target as HTMLElement;
          section.dataset.revealState = 'visible';
          observer.unobserve(section);
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -8% 0px' },
    );

    sections.forEach((section) => {
      if (section.getBoundingClientRect().top <= window.innerHeight) return;

      section.dataset.revealState = 'hidden';
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
      sections.forEach((section) => delete section.dataset.revealState);
    };
  }, []);

  return (
    <Container
      ref={mainRef}
      size="full"
      className="relative isolate my-0! max-w-6xl! px-5! py-0! sm:px-8! lg:px-10! [--ui-focus-color:var(--color-stone-950)] dark:[--ui-focus-color:var(--color-stone-100)]"
    >
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="motion-drift absolute -left-48 -top-52 h-[32rem] w-[32rem] rounded-full bg-amber-300/25 blur-3xl dark:bg-amber-600/10" />
        <div className="motion-drift [animation-delay:-9s] absolute -right-52 top-[35%] h-[38rem] w-[38rem] rounded-full bg-rose-200/20 blur-3xl dark:bg-blue-600/10" />
      </div>
      <section
          data-scroll-reveal
          aria-labelledby="hero-title"
          className="motion-reveal grid gap-12 pb-20 pt-16 sm:pb-28 sm:pt-24 lg:grid-cols-[1.35fr_0.65fr] lg:items-end lg:gap-20 lg:pt-32"
        >
          <div>
            <p className="mb-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.12em] text-amber-900 dark:text-amber-300">
              <span
                aria-hidden="true"
                className="h-2 w-2 rotate-45 bg-amber-800 dark:bg-amber-500"
              />
              {t('home.heroEyebrow')} <span aria-hidden="true">/</span> {t('home.since2017')}
            </p>
            <h1
              id="hero-title"
              aria-label={`${profile.firstName} ${profile.lastName}`}
              className="max-w-4xl font-serif text-5xl font-medium leading-[0.98] tracking-[-0.045em] text-stone-950 sm:text-7xl lg:text-[6rem] xl:text-[7rem] dark:text-stone-50"
            >
              {profile.firstName}
              <br />
              {profile.lastName}
            </h1>
            <div className="mt-8 max-w-2xl border-l-2 border-amber-800 pl-5 sm:pl-6 dark:border-amber-500">
              <p className="text-2xl font-semibold text-stone-500 dark:text-stone-100">
                {t('portfolio.profile.role')}
              </p>
            </div>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href={`mailto:${profile.email}`}
                className="inline-flex min-h-12 items-center justify-center gap-3 bg-stone-950 px-5 text-sm font-medium no-underline! hover:bg-stone-700 focus-visible:outline-offset-4! [--ui-action-background:var(--color-white)] [--ui-action-hover:var(--ui-action-background)] dark:bg-stone-100 dark:hover:bg-stone-300 dark:[--ui-action-background:var(--color-stone-950)]"
              >
                {t('home.contact')}
                <ArrowUpRight aria-hidden="true" focusable="false" className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <img
            src={`${import.meta.env.BASE_URL}images/profile.jpg`}
            alt={t('home.portraitAlt', { name: `${profile.firstName} ${profile.lastName}` })}
            className="motion-flip hidden lg:!block my-auto h-48 w-48 rounded-full border border-stone-200 object-cover object-center sm:h-56 sm:w-56 lg:mx-0 lg:h-64 lg:w-64 lg:justify-self-end dark:border-stone-700"
          />
      </section>
      <section
          data-scroll-reveal
          id="about"
          aria-labelledby="about-title"
          className="motion-reveal scroll-mt-24 grid gap-12 py-16 sm:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24"
        >
          <div className="[--ui-text-default:var(--color-stone-600)] dark:[--ui-text-default:var(--color-stone-300)]">
            <SectionHeading
              eyebrow={t('home.aboutEyebrow')}
              title={t('home.aboutTitle')}
              id="about-title"
            />
            <Text as="p" className="leading-8!">
              {t('home.aboutDescription')}
            </Text>
            <br />
            <Text as="p" className="leading-8!">
              <Trans
                t={t}
                i18nKey="home.currentExperience"
                values={{
                  company: experiences[0].company,
                  role: t(`portfolio.experience.${experiences[0].id}.role`),
                }}
                components={{ company: <b />, role: <b /> }}
              />
            </Text>
            <br />
            <Text as="p" className="leading-8!">
              <Trans
                t={t}
                i18nKey="home.previousExperience"
                values={{
                  felixRole: t(`portfolio.experience.${experiences[1].id}.role`),
                  felixCompany: experiences[1].company,
                  fujitsuRole: t(`portfolio.experience.${experiences[2].id}.role`),
                  fujitsuCompany: experiences[2].company,
                }}
                components={{
                  felix: (
                    <EmployerLink href="https://www.felix.net/">
                      {experiences[1].company}
                    </EmployerLink>
                  ),
                  fujitsu: (
                    <EmployerLink href="https://weserv.com/home">
                      {experiences[2].company}
                    </EmployerLink>
                  ),
                }}
              />
            </Text>
            <div className="mt-10 border-t border-stone-200 pt-5 dark:border-stone-800">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-stone-500 dark:text-stone-400">
                {t('home.education')}
              </p>
              {education.slice(0, 1).map((item) => (
                <div key={item.institution} className="mt-3">
                  <p className="font-medium text-stone-900 dark:text-stone-100">
                    {item.institution}
                  </p>
                  <p className="mt-1 text-sm text-stone-600 dark:text-stone-300">
                    {t('portfolio.education.university.program')} <span aria-hidden="true">·</span>{' '}
                    {formatMonthYear(item.completedAt)} <span aria-hidden="true">·</span>{' '}
                    {item.location}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.16em] text-stone-500 dark:text-stone-400">
              {t('home.expertise')}
            </p>
            <div className="divide-y divide-stone-200 border-y border-stone-200 dark:divide-stone-800 dark:border-stone-800">
              {skillGroups.map((group) => (
                <div
                  key={group.id}
                  className="grid gap-3 py-5 sm:grid-cols-[minmax(10rem,0.7fr)_1.3fr] sm:gap-6"
                >
                  <h3 className="text-sm font-medium text-stone-800 dark:text-stone-200">
                    {t(`portfolio.skills.${group.id}`)}
                  </h3>
                  <ul className="flex flex-wrap gap-x-4 gap-y-2">
                    {group.skills.map((skill) => (
                      <li
                        key={skill}
                        className="text-sm leading-6 text-stone-600 dark:text-stone-300"
                      >
                        <span
                          aria-hidden="true"
                          className="mr-2 text-amber-800 dark:text-amber-500"
                        >
                          /
                        </span>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
      </section>
      <section
          data-scroll-reveal
          id="experience"
          aria-labelledby="experience-title"
          className="motion-reveal scroll-mt-24 py-16 sm:py-24"
        >
          <SectionHeading
            eyebrow={t('home.experienceEyebrow')}
            title={t('home.experienceTitle')}
            id="experience-title"
          />
          <div className="grid gap-6">
            {experiences.map((experience, index) => (
              <article key={experience.id} aria-labelledby={`experience-company-${experience.id}`}>
                <Card
                  className="grid gap-3 sm:grid-cols-[minmax(12rem,0.7fr)_1.3fr] sm:gap-10 [--ui-surface-default:var(--ui-surface-muted)] dark:[--ui-surface-default:var(--color-stone-900)]"
                  style={{ marginBlock: 0 }}
                >
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.12em] text-stone-500 dark:text-stone-400">
                      {formatMonthYear(experience.startDate)} <span aria-hidden="true">–</span>{' '}
                      {experience.endDate
                        ? formatMonthYear(experience.endDate)
                        : t('portfolio.present')}
                    </p>
                    <h3
                      id={`experience-company-${experience.id}`}
                      className="mt-2 text-lg font-medium tracking-tight text-stone-950 dark:text-stone-50"
                    >
                      {experience.company}
                    </h3>
                    <p className="mt-1 text-base font-medium leading-6 text-stone-700 dark:text-stone-200">
                      {t(`portfolio.experience.${experience.id}.role`)}
                    </p>
                    <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                      {t(`portfolio.experience.${experience.id}.location`)}
                    </p>
                  </div>
                  <div>
                    <ul className="space-y-3 border-l border-stone-300 pl-5 dark:border-stone-700">
                      {experience.highlights.map((highlightKey) => (
                        <li
                          key={highlightKey}
                          className="relative text-sm leading-7 text-stone-600 dark:text-stone-300"
                        >
                          <span
                            aria-hidden="true"
                            className="absolute -left-[1.34rem] top-[0.8rem] h-1.5 w-1.5 rounded-full bg-amber-800 dark:bg-amber-500"
                          ></span>
                          {t(`portfolio.experience.${experience.id}.highlights.${highlightKey}`)}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 border-t border-stone-200 pt-4 dark:border-stone-800">
                      <h4
                        id={`experience-technologies-${index}`}
                        className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-500 dark:text-stone-400"
                      >
                        {t('home.technologies')}
                      </h4>
                      <ul
                        aria-labelledby={`experience-technologies-${index}`}
                        className="mt-3 flex flex-wrap gap-2"
                      >
                        {experience.technologies
                          .split(',')
                          .map((technology) => technology.trim())
                          .map((technology) => (
                            <li
                              key={technology}
                              className="border border-stone-300 bg-[#faf9f6] px-2.5 py-1 text-xs font-medium leading-5 text-stone-700 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-300"
                            >
                              {technology}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              </article>
            ))}
          </div>
      </section>
      <section
          data-scroll-reveal
          id="contact"
          aria-labelledby="contact-title"
          className="motion-reveal py-16 sm:py-24"
        >
          <h2
            id="contact-title"
            className="mb-4 font-serif text-4xl font-medium tracking-tight text-stone-950 sm:text-5xl dark:text-stone-50"
          >
            {t('home.contactTitle')}
          </h2>
          <div className="mb-4 grid gap-4 grid-cols-2">
            {contactCards.map((card) => (
              <Card
                key={card.id}
                className="group transition-colors motion-reduce:transition-none [--ui-border-default:var(--color-stone-300)] hover:[--ui-border-default:var(--color-amber-800)] focus-within:[--ui-border-default:var(--color-amber-800)] dark:[--ui-border-default:var(--color-stone-700)] dark:hover:[--ui-border-default:var(--color-amber-500)] dark:focus-within:[--ui-border-default:var(--color-amber-500)]"
                style={{ marginBlock: 0, padding: 0 }}
              >
                <Link
                  href={card.href}
                  target={card.href.startsWith('http') ? '_blank' : undefined}
                  rel={card.href.startsWith('http') ? 'noreferrer' : undefined}
                  className="block h-full rounded-[inherit] p-ui-4 no-underline! focus-visible:outline-offset-4! sm:p-ui-6 [--ui-action-background:var(--color-stone-950)] [--ui-action-hover:var(--ui-action-background)] dark:[--ui-action-background:var(--color-stone-100)]"
                >
                  <span className="block text-xs font-medium uppercase tracking-[0.14em] text-stone-500 dark:text-stone-400">
                    {t(`portfolio.contact.${card.id}`)}
                  </span>
                  <span className="mt-2 block break-all text-base font-medium text-stone-800 group-hover:text-amber-900 dark:text-stone-200 dark:group-hover:text-amber-300">
                    {card.value}
                  </span>
                </Link>
              </Card>
            ))}
          </div>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            <Link
              href={`${import.meta.env.BASE_URL}Marco_Senior_Frontend_Developer_Resume.pdf`}
              target="_blank"
              rel="noreferrer"
              className="font-medium decoration-stone-300 hover:decoration-stone-900 focus-visible:outline-offset-4! [--ui-action-background:var(--color-stone-800)] [--ui-action-hover:var(--ui-action-background)] dark:decoration-stone-700 dark:hover:decoration-stone-300 dark:[--ui-action-background:var(--color-stone-200)]"
            >
              {t('home.resumeLink')}
            </Link>
          </p>
      </section>
    </Container>
  );
}
