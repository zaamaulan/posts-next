export type Post = {
  id: number
  title: string
  slug: string
  content: string
  views: number
  category: Category
  categoryId: number
  createdAt: Date
  updatedAt: Date
}

export type Category = {
  id: number
  name: string
  // Posts: Post[]
  createdAt: Date
  updatedAt: Date
}
