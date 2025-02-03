import { axiosInstance } from "./api"

export const fetcher = (url: string) => axiosInstance.get(url).then((res) => res.data.data)
