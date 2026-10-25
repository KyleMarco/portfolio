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
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-900/5">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <Link
            to="/"
            className="rounded-full border border-slate-300 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="rounded-full border border-slate-300 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            About
          </Link>
        </div>

        {!hasValidPostId && (
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
              Invalid route
            </p>
            <h1 className="font-serif text-3xl font-semibold text-slate-900 sm:text-4xl">Post not found</h1>
            <p className="mt-4 text-slate-700">
              The selected post ID is not valid. Please choose a post from the home page.
            </p>
          </div>
        )}

        {hasValidPostId && isLoading && <p className="text-slate-600">Loading post...</p>}
        {hasValidPostId && isError && <p className="text-red-700">{errorMessage}</p>}

        {hasValidPostId && !isLoading && !isError && data && (
          <>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
              Post #{data.id}
            </p>
            <h1 className="font-serif text-3xl font-semibold text-slate-900 sm:text-4xl">{data.title}</h1>
            <p className="mt-5 text-base leading-7 text-slate-700">{data.body}</p>
          </>
        )}
      </div>
    </main>
  )
}
