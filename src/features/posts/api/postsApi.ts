export type Post = {
  id: number
  title: string
  body: string
}

export const postsApi = {
  getPosts: async (): Promise<Post[]> => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=4')

    if (!response.ok) {
      throw new Error('Failed to fetch posts')
    }

    return (await response.json()) as Post[]
  },
  getPostById: async (id: number): Promise<Post> => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)

    if (!response.ok) {
      throw new Error('Failed to fetch post')
    }

    return (await response.json()) as Post
  },
}
