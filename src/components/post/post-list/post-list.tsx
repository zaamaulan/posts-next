"use client"

import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Post } from "@/types"
import Link from "next/link"
import { useQueryState } from "nuqs"
import useSWR from "swr"
import { CreatePost } from "../create-post/create-post"

export const PostList = () => {
  const [search] = useQueryState("search", { defaultValue: "" })
  const [category] = useQueryState("category", { defaultValue: "" })

  const { data, isLoading } = useSWR<Post[]>(() => {
    const params = new URLSearchParams()
    if (search) params.append("search", search)
    if (category) params.append("category", category)

    return params.toString() ? `/posts${params.toString()}` : "/posts"
  })

  if (isLoading)
    return (
      <div className="space-y-10 w-full">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <div className="space-y-3">
              <Skeleton className="h-[26px] w-full" />
              <Skeleton className="h-[26px] w-2/4" />
            </div>

            <div className="space-y-3">
              <Skeleton className="h-[20px] w-full" />
              <Skeleton className="h-[20px] w-2/3" />
            </div>
          </div>
        ))}
      </div>
    )

  return (
    <>
      <div className="flex flex-col gap-8">
        {data?.map((item) => (
          <Link key={item.id} href={`/${item.id}`}>
            <div className="!space-y-1.5 p-4 hover:bg-accent rounded-lg transition-colors ease-in-out">
              <Badge className="rounded-">{item.category}</Badge>
              <h3 className="capitalize line-clamp-2 text-xl font-medium">{item.title}</h3>
              <div
                className="line-clamp-2 text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: item.content || "" }}
              />
            </div>
          </Link>
        ))}
      </div>
      {!search && !category && <CreatePost />}
    </>
  )
}
