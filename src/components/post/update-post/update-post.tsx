"use client"

import { Pencil } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Modal } from "@/components/ui/modal"
import { PostForm } from "../post-form/post-form"

export const UpdatePost = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Pencil />
        <span>Update this Post</span>
      </Button>

      <Modal
        open={open}
        onOpenChange={setOpen}
        title="Edit Post"
        description="Do aute officia reprehenderit velit irure ex irure fugiat."
      >
        <PostForm id={id} onClose={() => setOpen(false)} />
      </Modal>
    </>
  )
}
