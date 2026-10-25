import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-12 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-2xl shadow-slate-900/5">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
          404
        </p>
        <h1 className="mt-3 font-serif text-3xl font-semibold text-slate-900 sm:text-4xl">
          Page not found
        </h1>
        <p className="mt-4 text-slate-700">
          The page you requested does not exist.
        </p>
        <div className="mt-8 flex justify-center">
          <Link
            to="/"
            className="rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
          >
            Go home
          </Link>
        </div>
      </div>
    </main>
  )
}
