"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { axiosInstance } from "@/services/api"
import { Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { mutate } from "swr"

interface DeletePostProps {
  id: string
}

export const DeletePost = ({ id }: DeletePostProps) => {
  const { toast } = useToast()

  const [open, setOpen] = useState(false)

  const router = useRouter()

  if (!id) return null

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/posts/${id}`)
      router.push("/")
      mutate("/posts")
      toast({
        title: "Post deleted",
        description: "The post has been successfully deleted.",
      })
    } catch (error) {
      console.log(error)
      toast({
        title: "Error deleting post",
        description: "An error occurred while deleting the post.",
        variant: "destructive",
      })
    }
  }

  return (
    <>
      <Button onClick={() => setOpen(true)} variant={"destructive"} size={"icon"}>
        <Trash />
        <span className="sr-only">Delete</span>
      </Button>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the post and remove the post from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
