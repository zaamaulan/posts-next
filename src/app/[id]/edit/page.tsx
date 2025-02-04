import { EditPost } from "@/components/post/edit-post"

const EditPostPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id
  return <EditPost id={id} />
}

export default EditPostPage
