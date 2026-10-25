import { Link } from 'react-router-dom'
import { CounterPanel } from '../../features/counter/CounterPanel'
import { PostList } from '../../features/posts/components/PostList'

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:px-8">
      <header className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-700 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/30 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-sky-400">
            React boilerplate
          </p>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Redux Toolkit + TanStack Query
          </h1>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/shop"
            className="inline-flex items-center justify-center rounded-lg bg-sky-500 px-4 py-2 font-medium text-slate-950 transition hover:bg-sky-400"
          >
            Shop products
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-4 py-2 font-medium text-white transition hover:bg-violet-400"
          >
            View about page
          </Link>
        </div>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        <CounterPanel />
        <PostList />
      </section>
    </main>
  )
}
