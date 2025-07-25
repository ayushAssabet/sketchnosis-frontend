import { defaultFetcher } from "@/helpers/fetch.helper"
import { BACKEND_HOST } from "@/utils/constants"
import useSWR from "swr"

export const useGetIllustrationDetail = (id : string | null) => {
    
    const { data , isLoading , mutate } = useSWR(
        id ?`${BACKEND_HOST}/v1/illustration/${id}` : null,
        defaultFetcher
    )
     
    return  {
        data , isLoading , mutate
    }
}