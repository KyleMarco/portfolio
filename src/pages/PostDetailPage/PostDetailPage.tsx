import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { postsApi, type Post } from '../../features/posts/api/postsApi'

export default function PostDetailPage() {
  const { id } = useParams()
  const postId = Number(id)
  const hasValidPostId = Number.isInteger(postId) && postId > 0

  const { data, isLoading, isError, error } = useQuery<Post>({
    queryKey: ['post', postId],
    queryFn: () => postsApi.getPostById(postId),
    enabled: hasValidPostId,
    staleTime: 60_000,
  })

  const errorMessage = error instanceof Error ? error.message : 'Something went wrong'

  return (
    <main className="mx-auto max-w-3xl px-5 py-12 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/30">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <Link
            to="/"
            className="rounded-lg bg-slate-700 px-3 py-2 text-sm font-medium text-slate-100 transition hover:bg-slate-600"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="rounded-lg bg-slate-700 px-3 py-2 text-sm font-medium text-slate-100 transition hover:bg-slate-600"
          >
            About
          </Link>
        </div>

        {!hasValidPostId && (
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
              Invalid route
            </p>
            <h1 className="text-3xl font-bold text-white sm:text-4xl">Post not found</h1>
            <p className="mt-4 text-slate-300">
              The selected post ID is not valid. Please choose a post from the home page.
            </p>
          </div>
        )}

        {hasValidPostId && isLoading && <p className="text-slate-300">Loading post...</p>}
        {hasValidPostId && isError && <p className="text-red-300">{errorMessage}</p>}

        {hasValidPostId && !isLoading && !isError && data && (
          <>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-violet-400">
              Post #{data.id}
            </p>
            <h1 className="text-3xl font-bold text-white sm:text-4xl">{data.title}</h1>
            <p className="mt-5 text-base leading-7 text-slate-300">{data.body}</p>
          </>
        )}
      </div>
    </main>
  )
}
