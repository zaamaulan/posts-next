"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useDebouncedCallback } from "use-debounce"
import { useQueryState } from "nuqs"
import { ChangeEvent } from "react"

export const SearchPost = () => {
  const [search, setSearch] = useQueryState("search", { defaultValue: "" })

  const handleSearch = useDebouncedCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }, 750)

  return (
    <div>
      <Input defaultValue={search || ""} onChange={handleSearch} placeholder="Search" />
      <Label className="sr-only">search</Label>
    </div>
  )
}
