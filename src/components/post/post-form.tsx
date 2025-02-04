"use client"

import { RoundSpinner } from "@/components/icons/round-spinner"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import TiptapEditor from "@/components/ui/tiptap-editor"
import { useToast } from "@/hooks/use-toast"
import { postSchema } from "@/lib/schema"
import { axiosInstance } from "@/services/api"
import { Category, Post } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import useSWR from "swr"
import { z } from "zod"

interface PostFormProps {
  id?: string
  post?: Post
}

export const PostForm = ({ id, post }: PostFormProps) => {
  const { toast } = useToast()
  const router = useRouter()

  const { data: categories, isLoading: isCategoriesLoading } = useSWR<Category[]>("/categories")

  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  })

  console.log(post)

  useEffect(() => {
    if (post && !isCategoriesLoading) {
      form.reset({ ...post, categoryId: post.categoryId.toString() || "" })
    }
  }, [post, form, isCategoriesLoading])

  const onSubmit = async (values: z.infer<typeof postSchema>) => {
    console.log(values)

    try {
      const res = id ? await axiosInstance.patch(`/posts/${id}`, values) : await axiosInstance.post("/posts", values)

      if (res.status === 200) {
        router.push(id ? `/${id}` : "/")
        toast({
          title: "Success",
          description: `Post ${id ? "updated" : "created"} successfully`,
        })
      }
    } catch (error) {
      console.log(error)
      toast({
        title: "Error",
        description: `Failed to ${id ? "update" : "create"} post`,
        variant: "destructive",
      })
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
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select defaultValue={post?.categoryId.toString()} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.map((category) => (
                      <SelectItem key={category.id} value={category.id.toString()}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
        <div className="inline-grid grid-cols-2 gap-2">
          <Button type="button" variant="secondary" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && <RoundSpinner color="white" />} {id ? "Update Post" : "Create Post"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
