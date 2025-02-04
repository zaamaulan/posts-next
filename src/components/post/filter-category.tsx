"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CATEGORIES } from "@/lib/constants"
import { capitalize } from "@/lib/utils"
import { Post } from "@/types"
import { useQueryState } from "nuqs"
import useSWR from "swr"

const FilterCategory = () => {
  const { data } = useSWR<Post[]>("/posts")

  const [category, setCategory] = useQueryState("category", { defaultValue: "" })

  if (!data?.length) return null

  const isAll = (category: string) => {
    return category === "all"
  }

  const handleFilter = (category: string) => {
    setCategory(isAll(category) ? "" : category)
  }

  return (
    <Select defaultValue={!isAll(category) ? "" : category} onValueChange={handleFilter}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={"all"}>All</SelectItem>
        {CATEGORIES.map((category, index) => (
          <SelectItem key={index} value={category.toLowerCase()}>
            {capitalize(category)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default FilterCategory
