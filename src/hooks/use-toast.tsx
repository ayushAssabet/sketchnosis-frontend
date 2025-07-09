import { toast } from "sonner"

export const useToast = () => {
    function showToast({
        variant,
        title,
        description
    } : {
        variant : 'success' | 'destructive' | 'warning',
        title : string , 
        description? : string
    }){
        toast(title , {
            description
        })
    }

    return { showToast }
}