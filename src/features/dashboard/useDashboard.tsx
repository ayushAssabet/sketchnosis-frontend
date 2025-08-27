import { defaultFetcher } from "@/helpers/fetch.helper"
import { BACKEND_HOST } from "@/utils/constants"
import useSWR from "swr"

export const useDashboard = () => {
    const { data , isLoading , mutate } = useSWR(`${BACKEND_HOST}/v1/dashboard/admin-stats` , 
        defaultFetcher
    )
     
    return  {
        data : data?.data , 
        isLoading ,
        mutate
    }
}

export const useClinicDashboard = () => {
    const { data , isLoading , mutate } = useSWR(`${BACKEND_HOST}/v1/dashboard/clinic-stats` , 
        defaultFetcher
    )
     
    return  {
        data : data?.data , 
        isLoading ,
        mutate
    }
}