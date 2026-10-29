import { LinkButton } from '../shared/ui/LinkButton';

export default function NotFoundPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-12 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-2xl shadow-slate-900/5">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700">404</p>
        <h1 className="mt-3 font-serif text-3xl font-semibold text-slate-900 sm:text-4xl">
          Page not found
        </h1>
        <p className="mt-4 text-slate-700">The page you requested does not exist.</p>
        <div className="mt-8 flex justify-center">
          <LinkButton to="/">Go home</LinkButton>
        </div>
      </div>
    </main>
  );
}
