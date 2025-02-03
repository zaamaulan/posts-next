"use client"

import { fetcher } from "@/services/fetcher"
import { SWRConfig } from "swr"

export const SWRProvider = ({ children }: { children: React.ReactNode }) => {
  return <SWRConfig value={{ fetcher, refreshInterval: 1000 * 60 * 15 }}>{children}</SWRConfig>
}
