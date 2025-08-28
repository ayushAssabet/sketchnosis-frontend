import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { viewImage } from "@/helpers/viewImage.helper";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export const IllustrationAvatarWrapper = ({ fileUrl }: { fileUrl: any }) => {
    const [imageUrl, setImageUrl] = useState<string>("");
    const [loading , setIsLoading ] = useState<boolean>(false)

    useEffect(() => {
        const loadImage = async () => {
            if (fileUrl) {
                const url = `${process.env.NEXT_PUBLIC_BACKEND_HOST}/v1/illustration/view-illustration?url=${fileUrl}`;
                const blobUrl = await viewImage(url);
                if (blobUrl) {
                    setImageUrl(blobUrl);
                }
            }
        };

        loadImage();

        return () => {
            if (imageUrl) {
                URL.revokeObjectURL(imageUrl);
            }
        };
    }, [fileUrl]);

    if(loading){
        return <Loader size={32}/>
    }

    return (
        <Avatar className="!rounded-none w-full h-48">
            {imageUrl && (
                <Image
                    src={imageUrl}
                    alt={`Illustration`}
                    fill
                    className="!w-full !rounded-none object-cover"
                />
            )}
            <AvatarFallback className="bg-gray-300">
                {'I'}
            </AvatarFallback>
        </Avatar>
    );
};
