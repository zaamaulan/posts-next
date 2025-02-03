import FilterCategory from "@/components/post/filter-category/filter-category"
import { PostList } from "@/components/post/post-list/post-list"
import { SearchPost } from "@/components/post/search-post/search-post"
import { Suspense } from "react"

const HomePage = () => {
  return (
    <div className="flex flex-col gap-10 w-full">
      <div className="flex items-center gap-2 justify-between">
        <Suspense>
          <SearchPost />
          <FilterCategory />
        </Suspense>
      </div>
      <Suspense>
        <PostList />
      </Suspense>
    </div>
  )
}

export default HomePage
