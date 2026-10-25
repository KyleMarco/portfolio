import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-12 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-8 text-center shadow-2xl shadow-slate-950/30">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
          404
        </p>
        <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
          Page not found
        </h1>
        <p className="mt-4 text-slate-300">
          The page you requested does not exist.
        </p>
        <div className="mt-8 flex justify-center">
          <Link
            to="/"
            className="rounded-lg bg-sky-500 px-4 py-2 font-medium text-slate-950 transition hover:bg-sky-400"
          >
            Go home
          </Link>
        </div>
      </div>
    </main>
  )
}
