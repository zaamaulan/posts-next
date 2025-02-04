"use client"

import React from "react"
import { PostForm } from "./post-form"
import useSWR from "swr"
import { Post } from "@/types"

interface EditPostProps {
  id: string
}

export const EditPost = ({ id }: EditPostProps) => {
  const { data: post, isLoading } = useSWR<Post>(`/posts/${id}`)

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="w-full space-y-6">
      <div className="space-y-1.5">
        <h1 className="text-2xl font-semibold">Edit Post</h1>
        <p className="text-muted-foreground">
          Editing <span className="font-semibold">{post?.title}</span>
        </p>
      </div>
      <PostForm id={id} post={post} />
    </div>
  )
}
