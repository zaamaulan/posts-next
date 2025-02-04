import { PostDetails } from "@/components/post/post-details"

const PostDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id

  return <PostDetails id={id} />
}

export default PostDetailsPage
