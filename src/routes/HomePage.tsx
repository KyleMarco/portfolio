import { Link } from 'react-router-dom';
import { homePageContent } from './homePageData';
import {
  contactCards,
  education,
  experiences,
  profile,
  projects,
  skillGroups,
} from './portfolioData';

function SectionHeading({ eyebrow, title, id }: { eyebrow: string; title: string; id?: string }) {
  return (
    <div className="mb-10 flex items-end gap-5 border-b border-stone-300 pb-5 sm:mb-12">
      <span aria-hidden="true" className="mb-2 h-8 w-1 shrink-0 bg-amber-800" />
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-amber-900">
          {eyebrow}
        </p>
        <h2
          id={id}
          className="font-serif text-4xl font-medium tracking-tight text-stone-950 sm:text-5xl"
        >
          {title}
        </h2>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <main>
      <section
        aria-labelledby="hero-title"
        className="mx-auto grid max-w-6xl gap-12 px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24 lg:grid-cols-[1.35fr_0.65fr] lg:items-end lg:gap-20 lg:px-10 lg:pt-32"
      >
        <div>
          <p className="mb-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.12em] text-amber-900">
            <span aria-hidden="true" className="h-2 w-2 rotate-45 bg-amber-800" />
            Frontend development <span aria-hidden="true">/</span> Since 2017
          </p>
          <h1
            id="hero-title"
            aria-label={`${profile.firstName} ${profile.lastName}`}
            className="max-w-4xl font-serif text-6xl font-medium leading-[0.98] tracking-[-0.045em] text-stone-950 sm:text-8xl lg:text-[7rem]"
          >
            {profile.firstName}
            <br />
            {profile.lastName}
          </h1>
          <div className="mt-8 max-w-2xl border-l-2 border-amber-800 pl-5 sm:pl-6">
            <p className="text-sm font-semibold text-stone-900">{profile.role}</p>
            <p className="mt-2 max-w-xl text-lg leading-8 text-stone-600 sm:text-xl">
              {homePageContent.heroDescription}
            </p>
          </div>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex min-h-12 items-center justify-center gap-3 bg-stone-950 px-5 text-sm font-medium text-white transition-colors hover:bg-stone-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-stone-950 motion-reduce:transition-none"
            >
              {homePageContent.heroContactLabel}
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
            <a
              href="#projects"
              className="inline-flex min-h-12 items-center justify-center border border-stone-300 px-5 text-sm font-medium text-stone-800 transition-colors hover:border-stone-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-stone-950 motion-reduce:transition-none"
            >
              {homePageContent.projectsLinkLabel}
            </a>
          </div>
        </div>
        <aside className="border-t border-stone-300 pt-5 lg:justify-self-end lg:border-l lg:border-t-0 lg:border-amber-800 lg:pl-8 lg:pt-0">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-amber-900">
            Currently at
          </p>
          <p className="mt-3 text-lg font-medium tracking-tight text-stone-950">
            {experiences[0].company}
          </p>
          <p className="mt-1 text-sm text-stone-500">
            {experiences[0].role} <span aria-hidden="true">·</span> {experiences[0].dates}
          </p>
          <p className="mt-4 max-w-sm text-sm leading-7 text-stone-600">{profile.summary}</p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-stone-900 underline decoration-stone-300 underline-offset-4 transition-colors hover:decoration-stone-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-stone-950"
          >
            {profile.email}
          </a>
        </aside>
      </section>

      <section
        id="projects"
        aria-labelledby="projects-title"
        className="scroll-mt-24 border-y border-stone-200 bg-[#f2f0eb]"
      >
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24 lg:px-10">
          <SectionHeading {...homePageContent.sectionHeadings.projects} id="projects-title" />
          <div className="grid gap-6 lg:grid-cols-2">
            {projects.map((project, index) => (
              <article
                key={project.title}
                className="group overflow-hidden border-t-2 border-stone-300 bg-transparent transition-colors hover:border-amber-800 motion-reduce:transition-none"
              >
                <img
                  src={`${import.meta.env.BASE_URL}${project.screenshot}`}
                  alt={project.screenshotAlt}
                  width={1280}
                  height={800}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[1.65] w-full bg-stone-200 object-cover object-top transition-transform duration-500 group-hover:scale-[1.015] motion-reduce:transition-none"
                />
                <div className="p-5 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-amber-900">
                        <span className="mr-2 font-serif text-lg italic">0{index + 1}</span>
                        {project.category}
                      </p>
                      <h3 className="mt-3 font-serif text-2xl font-medium tracking-tight text-stone-950 sm:text-3xl">
                        {project.title}
                      </h3>
                    </div>
                    <span
                      aria-hidden="true"
                      className="mt-1 text-lg text-amber-800 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 motion-reduce:transition-none"
                    >
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        viewBox="0 0 20 20"
                        fill="none"
                        className="h-5 w-5"
                      >
                        <path d="M6 14 14 6M6 6h8v8" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-stone-600">{project.description}</p>
                  <ul
                    aria-label={`${project.title} technologies`}
                    className="mt-5 flex flex-wrap gap-x-3 gap-y-1"
                  >
                    {project.technologies.map((technology, technologyIndex) => (
                      <li key={technology} className="text-xs text-stone-500">
                        {technologyIndex > 0 && (
                          <span aria-hidden="true" className="mr-3 text-amber-800">
                            /
                          </span>
                        )}
                        {technology}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 border-t border-stone-200 pt-4">
                    <Link
                      to={project.demoHref}
                      className="text-sm font-semibold text-amber-900 underline decoration-amber-800/40 underline-offset-4 transition-colors hover:decoration-amber-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-stone-950"
                    >
                      {project.demoLabel}
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        viewBox="0 0 20 20"
                        fill="none"
                        className="ml-1 inline-block h-4 w-4"
                      >
                        <path d="M6 14 14 6M6 6h8v8" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    </Link>
                    <a
                      href={project.sourceHref}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-medium text-stone-600 underline decoration-stone-300 underline-offset-4 transition-colors hover:text-stone-950 hover:decoration-stone-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-stone-950"
                    >
                      {homePageContent.projectLinkLabels.source}
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        viewBox="0 0 20 20"
                        fill="none"
                        className="ml-1 inline-block h-4 w-4"
                      >
                        <path d="M6 14 14 6M6 6h8v8" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="about"
        aria-labelledby="about-title"
        className="scroll-mt-24 mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24 lg:px-10"
      >
        <div>
          <SectionHeading {...homePageContent.sectionHeadings.about} id="about-title" />
          <p className="text-base leading-8 text-stone-600">{homePageContent.aboutDescription}</p>
          <div className="mt-10 border-t border-stone-200 pt-5">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-stone-500">
              {homePageContent.educationLabel}
            </p>
            {education.slice(0, 1).map((item) => (
              <div key={item.institution} className="mt-3">
                <p className="font-medium text-stone-900">{item.institution}</p>
                <p className="mt-1 text-sm text-stone-600">
                  {item.program} {homePageContent.educationSeparator} {item.details}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.16em] text-stone-500">
            {homePageContent.expertiseLabel}
          </p>
          <div className="divide-y divide-stone-200 border-y border-stone-200">
            {skillGroups.map((group) => (
              <div
                key={group.label}
                className="grid gap-3 py-5 sm:grid-cols-[minmax(10rem,0.7fr)_1.3fr] sm:gap-6"
              >
                <h3 className="text-sm font-medium text-stone-800">{group.label}</h3>
                <ul className="flex flex-wrap gap-x-4 gap-y-2">
                  {group.skills.map((skill) => (
                    <li key={skill} className="text-sm leading-6 text-stone-600">
                      <span aria-hidden="true" className="mr-2 text-amber-800">
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
        className="scroll-mt-24 border-y border-stone-200 bg-[#f2f0eb]"
      >
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24 lg:px-10">
          <SectionHeading {...homePageContent.sectionHeadings.experience} id="experience-title" />
          <div className="divide-y divide-stone-300">
            {experiences.map((experience) => (
              <article
                key={experience.company}
                className="grid gap-3 py-7 first:pt-0 last:pb-0 sm:grid-cols-[minmax(12rem,0.7fr)_1.3fr] sm:gap-10"
              >
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.12em] text-stone-500">
                    {experience.dates}
                  </p>
                  <h3 className="mt-2 text-lg font-medium tracking-tight text-stone-950">
                    {experience.company}
                  </h3>
                  <p className="mt-1 text-base font-medium leading-6 text-stone-700">
                    {experience.role}
                  </p>
                  {experience.location && (
                    <p className="mt-1 text-sm text-stone-500">{experience.location}</p>
                  )}
                </div>
                <div>
                  <ul className="space-y-3 border-l border-stone-300 pl-5">
                    {experience.highlights.slice(0, 3).map((highlight) => (
                      <li key={highlight} className="relative text-sm leading-7 text-stone-600">
                        <span
                          aria-hidden="true"
                          className="absolute -left-[1.34rem] top-[0.8rem] h-1.5 w-1.5 rounded-full bg-amber-800"
                        ></span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-xs leading-6 text-stone-500">{experience.technologies}</p>
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
        <div className="grid gap-8 border-b border-stone-300 pb-10 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-stone-500">
              {homePageContent.contactLabel}
            </p>
            <h2
              id="contact-title"
              className="max-w-2xl font-serif text-5xl font-medium tracking-[-0.035em] text-stone-950 sm:text-7xl"
            >
              {homePageContent.contactHeading}
            </h2>
          </div>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex min-h-12 items-center justify-center gap-3 bg-stone-950 px-5 text-sm font-medium text-white transition-colors hover:bg-stone-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-stone-950 motion-reduce:transition-none"
          >
            {homePageContent.emailMeLabel}
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
        <div className="grid gap-x-8 py-6 sm:grid-cols-3">
          {contactCards.map((card) => (
            <a
              key={card.label}
              href={card.href}
              target={card.href.startsWith('http') ? '_blank' : undefined}
              rel={card.href.startsWith('http') ? 'noreferrer' : undefined}
              className="group border-b border-stone-300 py-4 transition-colors hover:border-amber-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-stone-950 motion-reduce:transition-none"
            >
              <span className="block text-xs font-medium uppercase tracking-[0.14em] text-stone-500">
                {card.label}
              </span>
              <span className="mt-2 block break-all text-base font-medium text-stone-800 group-hover:text-amber-900">
                {card.value}
              </span>
            </a>
          ))}
        </div>
        <p className="text-sm text-stone-500">
          {homePageContent.resumeNotice}{' '}
          <a
            href={`mailto:${profile.email}?subject=${encodeURIComponent(homePageContent.resumeSubject)}`}
            className="font-medium text-stone-800 underline decoration-stone-300 underline-offset-4 hover:decoration-stone-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-stone-950"
          >
            {homePageContent.resumeLinkLabel}
          </a>
        </p>
      </section>

      <footer className="border-t border-stone-200">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <span>
            {profile.firstName} {profile.lastName} {homePageContent.footerSeparator}{' '}
            {profile.footerRole}
          </span>
          <a
            href="#top"
            className="w-fit font-medium text-stone-700 underline decoration-stone-300 underline-offset-4 hover:decoration-stone-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-stone-950"
          >
            {homePageContent.backToTopLabel}
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
