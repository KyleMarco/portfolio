import { Link } from 'react-router-dom'

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-5 py-12 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/30">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-violet-400">
          About
        </p>
        <h1 className="text-3xl font-bold text-white sm:text-4xl">
          A simple multipage React app
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
          This application demonstrates how a small frontend can be organized into
          distinct routes with reusable page-level components and a shared layout.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            to="/"
            className="rounded-lg bg-sky-500 px-4 py-2 font-medium text-slate-950 transition hover:bg-sky-400"
          >
            Back home
          </Link>
        </div>
      </div>
    </main>
  )
}
