import { getAccessToken } from "./cookie.helper"

export const viewImage = async (url : string) => {
    const { accessToken } = getAccessToken()
    try{
        const res = await fetch(url , {
            headers : {
                // 'Authorization' : `Bearer ${accessToken}` , 
            }
        })

        if (!res.ok) throw new Error("Failed to fetch image");

        const blob = await res.blob();
        const blobUrl = URL.createObjectURL(blob);

        return blobUrl

    }catch(error){
        console.error(error)
    }
}