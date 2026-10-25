import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { Button } from '../../../shared/components/Button'
import { Card } from '../../../shared/components/Card'
import { postsApi, type Post } from '../api/postsApi'

export function PostList() {
  const { data, isLoading, isError, error, refetch } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: postsApi.getPosts,
    staleTime: 60_000,
  })

  const errorMessage = error instanceof Error ? error.message : 'Something went wrong'

  return (
    <Card
      title="Query data"
      headerAction={
        <Button type="button" onClick={() => refetch()} variant="primary">
          Refresh data
        </Button>
      }
    >
      {isLoading && <p className="text-slate-300">Loading posts...</p>}
      {isError && <p className="text-red-300">{errorMessage}</p>}

      {!isLoading && !isError && data && (
        <ul className="space-y-4">
          {data.map((post) => (
            <li
              key={post.id}
              className="rounded-xl border border-slate-700 bg-slate-800/70 p-4"
            >
              <Link to={`/posts/${post.id}`} className="block transition hover:text-sky-300">
                <strong className="mb-2 block text-base font-semibold text-white">
                  {post.title}
                </strong>
                <span className="block text-sm leading-6 text-slate-300">{post.body}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}
