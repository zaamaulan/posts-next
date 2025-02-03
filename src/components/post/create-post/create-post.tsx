"use client"

import { Button } from "@/components/ui/button"
import { Modal } from "@/components/ui/modal"
import { Pencil } from "lucide-react"
import { useState } from "react"
import { PostForm } from "../post-form/post-form"

export const CreatePost = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-4 right-4">
      <Button onClick={() => setOpen(true)}>
        <Pencil />
        <span>Create Post</span>
      </Button>

      <Modal
        open={open}
        onOpenChange={setOpen}
        title="Create Post"
        description="Do aute officia reprehenderit velit irure ex irure fugiat."
      >
        <PostForm onClose={() => setOpen(false)} />
      </Modal>
    </div>
  )
}
