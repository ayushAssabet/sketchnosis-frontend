import { useEffect, useState } from "react";
import { useLocalStorage } from "./use-localStorage"
import { getDeviceId } from "@/helpers/device.helper";

export const useUserDeviceId = () => {
    
    const [values , setValue] = useLocalStorage(process.env.NEXT_PUBLIC_DEVICE_ID_KEY , null);


    useEffect(() => {
        if(!values){
            setValue(getDeviceId)
        }
    },[values])
    
    return {
        deviceId : values
    };
}