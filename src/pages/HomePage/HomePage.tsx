import { useState } from 'react'

const experiences = [
  {
    company: 'KPMG (RG Manabat & Co.)',
    role: 'Senior Frontend Developer',
    dates: 'April 2026 – Present',
    accent: 'bg-blue-600',
    technologies:
      'ReactJS, TypeScript, TanStack Query, Redux, Redux Toolkit, Tailwind CSS, Material UI, Jest, React Testing Library, Git, GitHub Copilot',
    highlights: [
      'Develop scalable, reusable, and maintainable frontend components with ReactJS, TypeScript, and modern frontend practices.',
      'Build interactive, responsive interfaces with functional components and React Hooks, translating business requirements into maintainable solutions.',
      "Migrate a Lovable-generated prototype into the team's standardized repository, aligning it with project architecture, coding conventions, and development standards.",
      'Create reusable AI prompts and custom skills for converting AI-generated prototypes into production-aligned code.',
      'Manage data fetching, caching, and asynchronous API interactions with TanStack Query.',
      'Manage client-side application state with Redux and Redux Toolkit.',
      'Develop responsive interfaces with Tailwind CSS and Material UI.',
      'Write and maintain component and UI tests with Jest and React Testing Library.',
      'Use GitHub Copilot and AI-assisted workflows for code generation, refactoring, debugging, and test creation.',
      'Collaborate across teams to deliver maintainable frontend solutions aligned with project requirements.',
    ],
  },
  {
    company: 'FELIX (ZZ Connect, Inc.)',
    role: 'Frontend Developer',
    dates: 'July 2021 – March 2026',
    accent: 'bg-blue-600',
    technologies:
      'ReactJS, TypeScript, Redux, Redux Toolkit, Tailwind CSS, Sass, Jest, React Testing Library, Git, GitHub Copilot',
    highlights: [
      'Developed reusable ReactJS components with React Hooks, Redux Toolkit, TypeScript, Tailwind CSS, and Sass.',
      'Translated Figma designs into responsive, reusable UI components.',
      'Collaborated with backend engineers, UI/UX designers, and product managers to deliver features.',
      'Diagnosed and optimized performance using React Developer Tools, Redux DevTools, and browser debugging tools.',
      'Developed and maintained automated component and UI tests with Jest and React Testing Library.',
      'Conducted code reviews and deployed features to production.',
      'Identified and resolved NPM package security vulnerabilities.',
      'Migrated data using Laravel and maintained legacy applications by troubleshooting CodeIgniter issues.',
      'Built user and panel management features by integrating REST APIs for CRUD operations.',
      'Developed the Post Tender Request feature by integrating REST APIs for retrieving and submitting tender requests.',
      'Migrated the code repository to Semantic Versioning.',
    ],
  },
  {
    company: 'FUJITSU (WeServ Systems International, Inc.)',
    role: 'Application Systems Engineer',
    dates: 'September 2017 – April 2021',
    location: 'Cebu City, Philippines',
    accent: 'bg-blue-600',
    technologies:
      'ReactJS, Redux, Redux-Thunk, Redux-Saga, Material UI, React Hooks, Jest, VB.NET',
    highlights: [
      'Developed reusable ReactJS pages and UI components with class components, functional components, and React Hooks.',
      'Converted Adobe XD designs into functional ReactJS UI components.',
      'Optimized application performance and troubleshot UI issues with React Developer Tools, Redux DevTools, and browser debugging tools.',
      'Led a ReactJS project team, contributing to development, code reviews, testing, and knowledge transfer.',
      'Participated in creating and executing program test cases.',
      'Reverse engineered legacy VB.NET applications and translated implementation details into technical specifications.',
      'Helped build two ReactJS projects: one using class components, Redux, and Redux-Thunk, and a proof of concept using hooks, Redux, and Redux-Saga.',
    ],
  },
]

const skillGroups = [
  {
    label: 'Frontend development',
    skills: [
      'ReactJS',
      'NextJS',
      'React Hooks',
      'Redux',
      'Redux Toolkit',
      'JavaScript',
      'TypeScript',
      'Axios',
      'Tailwind CSS',
      'Storybook',
      'HTML',
      'CSS',
      'React Testing Library',
      'Jest',
      'Formik',
      'ESLint',
      'TSLint',
      'Prettier',
      'Webpack',
    ],
  },
  {
    label: 'Tools & collaboration',
    skills: [
      'Jira',
      'Redmine',
      'Bitbucket',
      'Git',
      'GitHub',
      'React Developer Tools',
      'Redux DevTools',
      'Browser debugging',
      'Docker',
      'WSL2',
      'Adobe XD',
      'Figma',
      'VS Code',
    ],
  },
  { label: 'AI', skills: ['GitHub Copilot'] },
]

const educationTracks = [
  {
    label: 'Core coursework',
    content:
      'Data Structures & Algorithms · Statistics · Algebra · Calculus · Machine Learning thesis',
  },
  {
    label: 'Focus areas',
    content: 'Frontend engineering · UI systems · Data thinking · Problem solving',
  },
  {
    label: 'Mindset',
    content: 'Curiosity · Team learning · Systems thinking · Building with purpose',
  },
]

const interests = [
  {
    id: 'Travel',
    emoji: '✈️',
    note: 'Exploring new places and collecting ideas from different cultures.',
  },
  {
    id: 'Fitness',
    emoji: '🏋️',
    note: 'Training consistently to keep both mind and body in motion.',
  },
  {
    id: 'Nutrition',
    emoji: '🥗',
    note: 'A practical relationship with food: fuel, balance, and habit.',
  },
]

const contactCards = [
  {
    label: 'Email',
    value: 'kylemarcocabiling@gmail.com',
    href: 'mailto:kylemarcocabiling@gmail.com',
  },
  {
    label: 'Phone',
    value: '+63 920 601 3973',
    href: 'tel:+639206013973',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/kylemarcocabiling',
    href: 'https://www.linkedin.com/in/kylemarcocabiling',
  },
]

function SectionHeading({
  number,
  eyebrow,
  title,
}: {
  number: string
  eyebrow: string
  title: string
}) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4 border-b border-slate-900/15 pb-4">
      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
          {eyebrow}
        </p>
        <h2 className="font-serif text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          {title}
        </h2>
      </div>
      <span className="font-mono text-sm text-slate-500">{number}</span>
    </div>
  )
}

export default function HomePage() {
  const [activeExperience, setActiveExperience] = useState<string | null>(
    experiences[0].company,
  )
  const [activeSkillGroup, setActiveSkillGroup] = useState(skillGroups[0].label)
  const [activeEducationTrack, setActiveEducationTrack] = useState(
    educationTracks[0].label,
  )
  const [activeInterest, setActiveInterest] = useState(interests[0].id)

  const selectedSkillGroup =
    skillGroups.find((group) => group.label === activeSkillGroup) ?? skillGroups[0]
  const selectedEducationTrack =
    educationTracks.find((track) => track.label === activeEducationTrack) ??
    educationTracks[0]
  const selectedInterest =
    interests.find((interest) => interest.id === activeInterest) ?? interests[0]

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="overflow-hidden rounded-[2rem] border border-white bg-white text-slate-900 shadow-2xl shadow-slate-900/10">
        <section className="relative isolate overflow-hidden bg-[#0f172a] px-6 py-12 text-white sm:px-10 sm:py-16 lg:px-16 lg:py-20">
          <div
            aria-hidden="true"
            className="absolute -right-20 -top-32 -z-10 h-[28rem] w-[28rem] rounded-full border border-blue-300/15 sm:right-0 sm:top-[-16rem] sm:h-[42rem] sm:w-[42rem]"
          />
          <div
            aria-hidden="true"
            className="absolute right-10 top-10 -z-10 h-64 w-64 rounded-full border border-blue-300/10 sm:right-28 sm:top-20 sm:h-80 sm:w-80"
          />
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_300px]">
            <div>
              <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-300/25 bg-blue-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-200">
                <span className="h-2 w-2 rounded-full bg-blue-400 bg-[radial-gradient(circle,_#7dd3fc_0%,_#3b82f6_50%,_#1d4ed8_100%)]" />
                Senior Frontend Developer
              </p>
              <h1 className="max-w-3xl font-serif text-5xl font-medium leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
                Kyle Marco
                <br />
                <span className="text-blue-300">Cabiling</span>
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                I build thoughtful, maintainable web experiences with React and
                TypeScript, bringing together reusable UI, reliable data flows,
                and a close eye for detail.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="mailto:kylemarcocabiling@gmail.com"
                  className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-200"
                >
                  Get in touch <span aria-hidden="true">↗</span>
                </a>
                <a
                  href="#experience"
                  className="inline-flex items-center rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-200"
                >
                  Explore experience
                </a>
              </div>
            </div>

            <aside className="relative mx-auto flex aspect-square w-full max-w-[260px] items-center justify-center sm:max-w-[300px]">
              <div
                aria-hidden="true"
                className="absolute inset-0 rotate-[-12deg] rounded-[2.5rem] border border-blue-300/30 transition-transform duration-500 hover:rotate-[0deg]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-5 rotate-[9deg] rounded-full border border-dashed border-white/25"
              />
              <div className="flex h-44 w-44 items-center justify-center rounded-full bg-blue-500 text-5xl font-semibold tracking-[-0.08em] text-white shadow-[0_0_90px_rgba(37,99,235,0.18)] transition-transform duration-500 hover:scale-105 sm:h-52 sm:w-52 sm:text-6xl">
                KM<span className="text-blue-200">C</span>
              </div>
              <span className="absolute right-1 top-7 rounded-full bg-white px-3 py-2 font-mono text-xs font-bold text-slate-900 shadow-sm">
                PH / 01
              </span>
              <span className="absolute bottom-3 left-0 rounded-full border border-white/20 bg-slate-900 px-3 py-2 text-xs font-medium text-slate-200">
                UI with intention
              </span>
            </aside>
          </div>
        </section>

        <section
          aria-label="Contact details"
          className="grid gap-5 border-b border-slate-200 bg-slate-50 px-6 py-6 sm:grid-cols-3 sm:px-10 lg:px-16"
        >
          {contactCards.map((card) => (
            <a
              key={card.label}
              href={card.href}
              target={card.href.startsWith('http') ? '_blank' : undefined}
              rel={card.href.startsWith('http') ? 'noreferrer' : undefined}
              className="group rounded-2xl border border-slate-200 bg-white/80 p-4 transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-900"
            >
              <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                {card.label}
              </span>
              <span className="break-all text-sm font-semibold text-slate-900 group-hover:underline sm:text-base">
                {card.value}
              </span>
            </a>
          ))}
        </section>

        <div className="grid gap-14 px-6 py-12 sm:px-10 sm:py-16 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-16 lg:px-16">
          <section id="experience" className="scroll-mt-8">
            <SectionHeading
              number="01"
              eyebrow="The work"
              title="Experience"
            />
            <div className="space-y-10">
              {experiences.map((experience) => {
                const isActive = activeExperience === experience.company
                const isPreview = !isActive
                return (
                  <article
                    key={experience.company}
                    className="relative border-l border-slate-900/15 pl-6 sm:pl-8"
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute -left-[7px] top-1 h-3.5 w-3.5 rounded-full ring-4 ring-white ${experience.accent}`}
                    />
                    <button
                      type="button"
                      aria-expanded={isActive}
                      aria-controls={`experience-panel-${experience.company}`}
                      onClick={() =>
                        setActiveExperience((current) =>
                          current === experience.company ? null : experience.company,
                        )
                      }
                      className="w-full rounded-2xl text-left transition hover:bg-slate-50/80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-900"
                    >
                      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                            {experience.dates}
                            {experience.location && ` · ${experience.location}`}
                          </p>
                          <h3 className="mt-2 text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
                            {experience.company}
                          </h3>
                          <p className="mt-1 font-medium text-slate-600">
                            {experience.role}
                          </p>
                        </div>
                        <span className="hidden font-mono text-xs text-slate-400 sm:block">
                          {String(experiences.indexOf(experience) + 1).padStart(2, '0')}
                        </span>
                      </div>
                    </button>

                    <div
                      id={`experience-panel-${experience.company}`}
                      className={`mt-5 overflow-hidden rounded-2xl border bg-white/55 p-5 transition-all duration-300 sm:p-6 ${
                        isActive
                          ? 'max-h-[1200px] border-slate-900/10 opacity-100'
                          : 'max-h-24 border-slate-200/80 opacity-90'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                          Technologies
                        </p>
                        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                          {isPreview ? 'Preview' : 'Expanded'}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-slate-700">
                        {experience.technologies}
                      </p>
                      {isActive && (
                        <ul className="mt-5 space-y-3">
                          {experience.highlights.map((highlight) => (
                            <li
                              key={highlight}
                              className="flex gap-3 text-sm leading-6 text-slate-700"
                            >
                              <span
                                aria-hidden="true"
                                className="mt-[0.65rem] h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400"
                              />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </article>
                )
              })}
            </div>
          </section>

          <aside className="space-y-12">
            <section>
              <SectionHeading
                number="02"
                eyebrow="What I work with"
                title="Skills"
              />
              <div className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  {skillGroups.map((group) => (
                    <button
                      key={group.label}
                      type="button"
                      onClick={() => setActiveSkillGroup(group.label)}
                      className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                        activeSkillGroup === group.label
                          ? 'border-blue-200 bg-blue-100 text-blue-800 shadow-sm'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {group.label}
                    </button>
                  ))}
                </div>

                <div className="rounded-2xl border border-slate-900/10 bg-slate-50 p-4">
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                    {selectedSkillGroup.label}
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {selectedSkillGroup.skills.map((skill) => (
                      <li
                        key={skill}
                        className="rounded-full border border-slate-900/10 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                    Strengths
                  </h3>
                  <p className="text-sm leading-7 text-slate-700">
                    Team player · Deliver results · Adaptability
                  </p>
                </div>
              </div>
            </section>

            <section>
              <SectionHeading
                number="03"
                eyebrow="The foundation"
                title="Education"
              />
              <div className="space-y-6">
                <article>
                  <h3 className="font-bold text-slate-950">
                    Visayas State University
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    B.S., Computer Science
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    July 2017 · Baybay City, Leyte, Philippines
                  </p>
                </article>
                <article className="border-t border-slate-900/10 pt-5">
                  <h3 className="font-bold text-slate-950">
                    Kananga National High School
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    Completed April 2013 · Kananga, Leyte, Philippines
                  </p>
                </article>
                <div className="border-t border-slate-900/10 pt-5">
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                    Coursework
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {educationTracks.map((track) => (
                      <button
                        key={track.label}
                        type="button"
                        onClick={() => setActiveEducationTrack(track.label)}
                        className={`rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] transition ${
                          activeEducationTrack === track.label
                            ? 'border-blue-200 bg-blue-100 text-blue-800'
                            : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        {track.label}
                      </button>
                    ))}
                  </div>
                  <p className="mt-4 text-sm leading-7 text-slate-700">
                    {selectedEducationTrack.content}
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-2xl bg-[#0f172a] p-6 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
                Off the screen
              </p>
              <h2 className="mt-3 font-serif text-2xl font-medium">
                Curious by nature.
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <button
                    key={interest.id}
                    type="button"
                    onClick={() => setActiveInterest(interest.id)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                      activeInterest === interest.id
                        ? 'border-blue-400 bg-blue-500/20 text-blue-100'
                        : 'border-white/15 bg-white/5 text-slate-300 hover:border-white/30'
                    }`}
                  >
                    {interest.emoji} {interest.id}
                  </button>
                ))}
              </div>
              <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="mb-2 text-2xl">{selectedInterest.emoji}</div>
                <p className="text-sm leading-7 text-slate-200">
                  {selectedInterest.note}
                </p>
              </div>
            </section>
          </aside>
        </div>

        <footer className="flex flex-col gap-2 border-t border-slate-900/10 px-6 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-16">
          <span>Kyle Marco Cabiling · Frontend Developer</span>
          <a
            href="mailto:kylemarcocabiling@gmail.com"
            className="font-semibold text-slate-700 hover:text-slate-950 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-900"
          >
            Let’s build something thoughtful <span aria-hidden="true">↗</span>
          </a>
        </footer>
      </div>
    </main>
  )
}
