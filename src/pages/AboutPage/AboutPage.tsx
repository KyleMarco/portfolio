import { Link } from 'react-router-dom'

const highlights = [
  {
    title: 'Storefront demo',
    description:
      'Browse a product catalog, adjust quantities, and add items to a cart with a clean shopping flow.',
  },
  {
    title: 'Global state patterns',
    description:
      'Redux Toolkit manages cart and counter state, showing how app-level client logic stays predictable and testable.',
  },
  {
    title: 'Async data flow',
    description:
      'TanStack Query fetches and caches posts so the app can render live demo data without ad hoc effects.',
  },
  {
    title: 'Route-based UI',
    description:
      'The project is organized as a small multi-page experience with home, shop, about, and detail views.',
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
          React Storefront Demo
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700">
          This project is a lightweight frontend showcase built to demonstrate a practical mix of
          modern app patterns: route-based pages, Redux-managed cart state, cached API requests, and
          reusable component-driven UI.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {highlights.map((item) => (
            <article
              key={item.title}
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
          <Link
            to="/"
            className="rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
          >
            Back home
          </Link>
          <Link
            to="/shop"
            className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-500"
          >
            Visit shop
          </Link>
        </div>
      </div>
    </main>
  )
}
