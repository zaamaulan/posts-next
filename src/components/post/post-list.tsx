"use client"

import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { capitalize, cn } from "@/lib/utils"
import { Post } from "@/types"
import { Pencil } from "lucide-react"
import Link from "next/link"
import { useQueryState } from "nuqs"
import useSWR from "swr"

export const PostList = () => {
  const [search] = useQueryState("search", { defaultValue: "" })
  const [category] = useQueryState("category", { defaultValue: "" })

  const { data, isLoading } = useSWR<Post[]>(() => {
    const params = new URLSearchParams()
    if (search) params.append("search", search)
    if (category) params.append("category", category)

    return `/posts?${params.toString()}`
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

  if (!data?.length) return <div className="text-muted-foreground">No posts found</div>

  return (
    <>
      <div className="flex flex-col gap-8">
        {data?.map((item) => (
          <Link key={item.id} href={`/${item.id}`}>
            <div className="!space-y-1.5">
              <Badge>{capitalize(item.category.name)}</Badge>
              <h3 className="capitalize line-clamp-2 text-xl font-medium">{item.title}</h3>
              <div
                className="line-clamp-2 text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: item.content || "" }}
              />
            </div>
          </Link>
        ))}
      </div>

      <Link href="/new" className={cn("fixed bottom-4 right-4", buttonVariants())}>
        <Pencil />
        <span>Create Post</span>
      </Link>
    </>
  )
}
