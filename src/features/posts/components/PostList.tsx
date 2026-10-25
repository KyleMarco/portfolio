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
      {isLoading && <p className="text-slate-600">Loading posts...</p>}
      {isError && <p className="text-red-700">{errorMessage}</p>}

      {!isLoading && !isError && data && (
        <ul className="space-y-4">
          {data.map((post) => (
            <li
              key={post.id}
              className="rounded-xl border border-slate-200 bg-slate-50 p-4"
            >
              <Link to={`/posts/${post.id}`} className="block transition hover:text-blue-700">
                <strong className="mb-2 block text-base font-semibold text-slate-900">
                  {post.title}
                </strong>
                <span className="block text-sm leading-6 text-slate-700">{post.body}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}
