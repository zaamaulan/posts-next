"use client"

import { CalendarIcon, ViewIcon } from "@/components/icons"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { axiosInstance } from "@/services/api"
import { Post } from "@/types"
import { useEffect } from "react"
import useSWR from "swr"
import { DeletePost } from "../delete-post/delete-post"
import { UpdatePost } from "../update-post/update-post"

export const PostDetails = ({ id }: { id: string }) => {
  const { data, isLoading, mutate } = useSWR<Post>(`/posts/${id}`)

  useEffect(() => {
    if (isLoading) return

    const updateViews = async () => {
      try {
        await axiosInstance.patch(`/posts/${id}/views`, { views: (data?.views || 0) + 1 })
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

  console.log(data)

  return (
    <>
      <div className="space-y-10">
        <div className="space-y-2">
          <Badge>{data?.category}</Badge>
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
        <UpdatePost id={id} />
        <DeletePost />
      </div>
    </>
  )
}
