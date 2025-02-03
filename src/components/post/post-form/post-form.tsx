"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { postSchema } from "@/lib/schema"
import { axiosInstance } from "@/services/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import useSWR, { mutate } from "swr"
import { z } from "zod"
import TiptapEditor from "@/components/ui/tiptap-editor"
import { Post } from "@/types"

export const PostForm = ({ onClose, id }: { onClose: () => void; id?: string }) => {
  const { toast } = useToast()

  const [isLoading, setIsLoading] = useState(false)

  const { data } = useSWR<Post>(id ? `/posts/${id}` : null)

  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
      category: "",
    },
  })

  useEffect(() => {
    if (data) {
      form.reset(data)
    }
  }, [data, form])

  const onSubmit = async (values: z.infer<typeof postSchema>) => {
    setIsLoading(true)

    try {
      if (id) {
        await axiosInstance.patch(`/posts/${id}`, values)
        mutate(`/posts/${id}`)
      } else {
        await axiosInstance.post("/posts", values)
      }
      mutate("/posts")
      toast({
        title: "Success",
        description: `Post ${id ? "updated" : "created"} successfully`,
      })
      onClose()
    } catch (error) {
      console.log(error)
      toast({
        title: "Error",
        description: `Failed to ${id ? "update" : "create"} post`,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Duis excepteur commodo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input placeholder="Labore est" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <TiptapEditor
                  placeholder="Est aute ad ullamco ad culpa laboris sit dolore dolore ea laborum ullamco sunt."
                  onChange={field.onChange}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Submitting..." : id ? "Update Post" : "Create Post"}
        </Button>
      </form>
    </Form>
  )
}
