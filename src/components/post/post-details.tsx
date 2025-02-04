"use client"

import { CalendarIcon, ViewIcon } from "@/components/icons/icons"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { capitalize, cn } from "@/lib/utils"
import { axiosInstance } from "@/services/api"
import { Post } from "@/types"
import { Pencil } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"
import useSWR from "swr"
import { DeletePost } from "./delete-post"

export const PostDetails = ({ id }: { id: string }) => {
  const { data, isLoading, mutate } = useSWR<Post>(`/posts/${id}`)

  useEffect(() => {
    if (isLoading || !data) return

    const updateViews = async () => {
      try {
        await axiosInstance.patch(`/posts/${id}/views`, { views: data?.views + 1 })
        mutate()
      } catch (error) {
        console.log("Error updating post views:", error)
      }
    }
    updateViews()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isLoading])

  if (isLoading) {
    return (
      <div className="space-y-16 w-full">
        <div className="space-y-3">
          <Skeleton className="h-[30px] w-full" />
          <Skeleton className="h-[30px] w-2/4" />
        </div>
        <div className="flex flex-col gap-10">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-[20px] w-full" />
              <Skeleton className="h-[20px] w-full" />
              <Skeleton className="h-[20px] w-2/3" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (!data)
    return (
      <div className="flex flex-col w-full space-y-1.5">
        <h1 className="font-semibold text-2xl">No post found</h1>
        <Link href="/" className={cn('w-fit',buttonVariants({ variant: "secondary" }))}>
          Back to Post List
        </Link>
      </div>
    )

  return (
    <>
      <div className="space-y-10">
        <div className="space-y-2">
          <Badge>{capitalize(data?.category.name)}</Badge>
          <h2 className="capitalize text-3xl font-semibold">{data?.title}</h2>
          <div className="inline-flex gap-4 items-center">
            <div className="text-muted-foreground text-sm inline-flex gap-2 items-center ">
              <CalendarIcon className="h-4 w-4" />
              <span>
                {Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric" }).format(
                  new Date(data?.createdAt || "")
                )}
              </span>
            </div>
            <div className="text-muted-foreground text-sm inline-flex gap-2 items-center ">
              <ViewIcon className="h-4 w-4" />
              <span>{data?.views} views</span>
            </div>
          </div>
        </div>
        <div className="text-muted-foreground prose" dangerouslySetInnerHTML={{ __html: data?.content || "" }} />
      </div>
      <div className="fixed bottom-4 right-4 inline-flex gap-2">
        <Link href={`/${id}/edit`} className={cn(buttonVariants())}>
          <Pencil />
          <span>Update this Post</span>
        </Link>
        <DeletePost id={id} />
      </div>
    </>
  )
}
