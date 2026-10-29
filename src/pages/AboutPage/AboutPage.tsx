import { LinkButton } from '../../shared/components/LinkButton'

const highlights = [
  {
    title: 'Professional experience',
    description:
      'Explore my frontend development experience across product teams and different stages of my career.',
  },
  {
    title: 'Frontend toolkit',
    description:
      'See the languages, frameworks, and tools I use to build responsive and maintainable web interfaces.',
  },
  {
    title: 'Education and interests',
    description:
      'Learn more about my education, areas of study, and interests beyond frontend development.',
  },
  {
    title: 'Interactive storefront',
    description:
      'The shop page demonstrates product browsing and cart interactions alongside the portfolio.',
  },
]

const stack = ['React 19', 'TypeScript', 'Vite', 'Redux Toolkit', 'TanStack Query', 'React Router']

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-5 py-12 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-900/5 sm:p-10">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
          About
        </p>
        <h1 className="font-serif text-3xl font-semibold text-slate-900 sm:text-4xl">
          Kyle Marco Cabiling
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700">
          I am a frontend developer focused on building thoughtful, maintainable web experiences
          with React and TypeScript. This portfolio highlights my experience, skills, education,
          and interests.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {highlights.map((item) => (
            <article
              key={item.title}
              data-interactive-card
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
            >
              <h2 className="text-lg font-semibold text-slate-900">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-700">{item.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-5">
          <h2 className="text-base font-semibold text-slate-900">Built with</h2>
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
          <LinkButton to="/">
            Back home
          </LinkButton>
          <LinkButton to="/demo" variant="secondary">
            View shop demo
          </LinkButton>
        </div>
      </div>
    </main>
  )
}
