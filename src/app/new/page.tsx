import { PostForm } from "@/components/post/post-form"
import React from "react"

const CreatePostPage = () => {
  return (
    <div className="w-full space-y-6">
      <div className="space-y-1.5">
        <h1 className="text-2xl font-semibold">Create Post</h1>
        <p className="text-muted-foreground">Incididunt velit in ea sint duis eu eiusmod aliquip quis.</p>
      </div>
      <PostForm />
    </div>
  )
}

export default CreatePostPage
