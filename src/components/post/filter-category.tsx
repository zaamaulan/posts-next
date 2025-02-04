"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CATEGORIES } from "@/lib/constants"
import { Post } from "@/types"
import { useQueryState } from "nuqs"
import useSWR from "swr"

const FilterCategory = () => {
  const { data } = useSWR<Post[]>("/posts")

  const [category, setCategory] = useQueryState("category", { defaultValue: "" })

  if (!data?.length) return null

  const handleFilter = (category: string) => {
    setCategory(category === "all" ? "" : category)
  }

  return (
    <Select defaultValue={category === "" ? "all" : category} onValueChange={handleFilter}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={"all"}>All</SelectItem>
        {CATEGORIES.map((category, index) => (
          <SelectItem key={index} value={category.toLowerCase()}>
            {category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default FilterCategory
