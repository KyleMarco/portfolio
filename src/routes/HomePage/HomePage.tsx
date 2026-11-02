import { useTranslation } from 'react-i18next';
import { contactCards, education, experiences, profile, skillGroups } from '../portfolioData';

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
  const locale = i18n.resolvedLanguage?.startsWith('fil') ? 'fil-PH' : 'en-PH';
  const dateFormatter = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' });
  const formatMonthYear = (date: { year: number; month: number }) =>
    dateFormatter.format(new Date(date.year, date.month - 1, 1));

  return (
    <main>
      <section
        aria-labelledby="hero-title"
        className="mx-auto grid max-w-6xl gap-12 px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24 lg:grid-cols-[1.35fr_0.65fr] lg:items-end lg:gap-20 lg:px-10 lg:pt-32"
      >
        <div>
          <p className="mb-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.12em] text-amber-900 dark:text-amber-300">
            <span aria-hidden="true" className="h-2 w-2 rotate-45 bg-amber-800 dark:bg-amber-500" />
            {t('home.heroEyebrow')} <span aria-hidden="true">/</span> {t('home.since2017')}
          </p>
          <h1
            id="hero-title"
            aria-label={`${profile.firstName} ${profile.lastName}`}
            className="max-w-4xl font-serif text-6xl font-medium leading-[0.98] tracking-[-0.045em] text-stone-950 sm:text-8xl lg:text-[7rem] dark:text-stone-50"
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
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex min-h-12 items-center justify-center gap-3 bg-stone-950 px-5 text-sm font-medium text-white transition-colors hover:bg-stone-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-stone-950 motion-reduce:transition-none dark:bg-stone-100 dark:text-stone-950 dark:hover:bg-stone-300 dark:focus-visible:outline-stone-100"
            >
              {t('home.contact')}
              <svg
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 20 20"
                fill="none"
                className="h-4 w-4"
              >
                <path d="M6 14 14 6M6 6h8v8" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </a>
          </div>
        </div>
        <img
          src={`${import.meta.env.BASE_URL}images/profile.jpg`}
          alt={`Portrait of ${profile.firstName} ${profile.lastName}`}
          className="hidden 2xl:block my-auto h-48 w-48 rounded-full border border-stone-200 object-cover object-center sm:h-56 sm:w-56 lg:mx-0 lg:h-64 lg:w-64 lg:justify-self-end dark:border-stone-700"
        />
      </section>

      <section
        id="about"
        aria-labelledby="about-title"
        className="scroll-mt-24 mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24 lg:px-10"
      >
        <div>
          <SectionHeading
            eyebrow={t('home.aboutEyebrow')}
            title={t('home.aboutTitle')}
            id="about-title"
          />
          <p className="text-base leading-8 text-stone-600 dark:text-stone-300">
            {t('home.aboutDescription')}
          </p>
          <br />
          <p className="text-base leading-8 text-stone-600 dark:text-stone-300">
            {t('home.currentlyAt')} <b>{experiences[0].company}</b> as a <b>{t(`portfolio.experience.${experiences[0].id}.role`)}</b>.
          </p>
          <br />
          <p className="text-base leading-8 text-stone-600 dark:text-stone-300">
            Previously, I was a {t(`portfolio.experience.${experiences[1].id}.role`)} at <a href="https://www.felix.net/" target="_blank" rel="noreferrer" className="w-fit font-medium text-blue-300 underline decoration-blue-300 underline-offset-4 hover:decoration-stone-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-stone-950 dark:text-stone-300 dark:decoration-stone-700 dark:hover:decoration-stone-300 dark:focus-visible:outline-stone-100">{experiences[1].company}</a>, and an {t(`portfolio.experience.${experiences[2].id}.role`)} at <a href="https://weserv.com/home" target="_blank" rel="noreferrer" className="w-fit font-medium text-blue-300 underline decoration-blue-300 underline-offset-4 hover:decoration-stone-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-stone-950 dark:text-stone-300 dark:decoration-stone-700 dark:hover:decoration-stone-300 dark:focus-visible:outline-stone-100">{experiences[2].company}</a>
          </p>
          <div className="mt-10 border-t border-stone-200 pt-5 dark:border-stone-800">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-stone-500 dark:text-stone-400">
              {t('home.education')}
            </p>
            {education.slice(0, 1).map((item) => (
              <div key={item.institution} className="mt-3">
                <p className="font-medium text-stone-900 dark:text-stone-100">{item.institution}</p>
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
                      <span aria-hidden="true" className="mr-2 text-amber-800 dark:text-amber-500">
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
        id="experience"
        aria-labelledby="experience-title"
        className="scroll-mt-24 border-y border-stone-200 bg-[#f2f0eb] dark:border-stone-800 dark:bg-stone-900"
      >
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24 lg:px-10">
          <SectionHeading
            eyebrow={t('home.experienceEyebrow')}
            title={t('home.experienceTitle')}
            id="experience-title"
          />
          <div className="divide-y divide-stone-300 dark:divide-stone-700">
            {experiences.map((experience, index) => (
              <article
                key={experience.id}
                className="grid gap-3 py-7 first:pt-0 last:pb-0 sm:grid-cols-[minmax(12rem,0.7fr)_1.3fr] sm:gap-10"
              >
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.12em] text-stone-500 dark:text-stone-400">
                    {formatMonthYear(experience.startDate)} <span aria-hidden="true">–</span>{' '}
                    {experience.endDate
                      ? formatMonthYear(experience.endDate)
                      : t('portfolio.present')}
                  </p>
                  <h3 className="mt-2 text-lg font-medium tracking-tight text-stone-950 dark:text-stone-50">
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
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        aria-labelledby="contact-title"
        className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24 lg:px-10"
      >
        <h2
          id="contact-title"
          className="mb-4 font-serif text-4xl font-medium tracking-tight text-stone-950 sm:text-5xl dark:text-stone-50"
        >
          {t('home.contactTitle')}
        </h2>
        <div className="grid gap-x-8 border-t border-stone-300 py-3 sm:grid-cols-3 dark:border-stone-700">
          {contactCards.map((card) => (
            <a
              key={card.id}
              href={card.href}
              target={card.href.startsWith('http') ? '_blank' : undefined}
              rel={card.href.startsWith('http') ? 'noreferrer' : undefined}
              className="group border-b border-stone-300 py-4 transition-colors hover:border-amber-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-stone-950 motion-reduce:transition-none dark:border-stone-700 dark:hover:border-amber-500 dark:focus-visible:outline-stone-100"
            >
              <span className="block text-xs font-medium uppercase tracking-[0.14em] text-stone-500 dark:text-stone-400">
                {t(`portfolio.contact.${card.id}`)}
              </span>
              <span className="mt-2 block break-all text-base font-medium text-stone-800 group-hover:text-amber-900 dark:text-stone-200 dark:group-hover:text-amber-300">
                {card.value}
              </span>
            </a>
          ))}
        </div>
        <p className="text-sm text-stone-500 dark:text-stone-400">
          <a
            href={`${import.meta.env.BASE_URL}/Marco_Senior_Frontend_Developer_Resume.pdf`}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-stone-800 underline decoration-stone-300 underline-offset-4 hover:decoration-stone-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-stone-950 dark:text-stone-200 dark:decoration-stone-700 dark:hover:decoration-stone-300 dark:focus-visible:outline-stone-100"
          >
            {t('home.resumeLink')}
          </a>
        </p>
      </section>

      <footer className="border-t border-stone-200 dark:border-stone-800">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10 dark:text-stone-400">
          <span>
            {profile.firstName} {profile.lastName} <span aria-hidden="true">·</span>{' '}
            {t('portfolio.profile.footerRole')}
          </span>
          <a
            href="#top"
            className="w-fit font-medium text-stone-700 underline decoration-stone-300 underline-offset-4 hover:decoration-stone-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-stone-950 dark:text-stone-300 dark:decoration-stone-700 dark:hover:decoration-stone-300 dark:focus-visible:outline-stone-100"
          >
            {t('home.backToTop')}
            <svg
              aria-hidden="true"
              focusable="false"
              viewBox="0 0 20 20"
              fill="none"
              className="ml-1 inline-block h-4 w-4"
            >
              <path d="M10 15V5m0 0L6 9m4-4 4 4" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </a>
        </div>
      </footer>
    </main>
  );
}
