import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { viewImage } from "@/helpers/viewImage.helper";
import { Loader, SettingsIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export const SelectIllustrationAvatarWrapper = ({ image }: { image: any }) => {
    const [imageUrl, setImageUrl] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);

    console.log(image)

    useEffect(() => {
        const loadImage = async () => {
            if (image.fileUrl) {
                const url = `http://localhost:4001/v1/illustration/view-illustration?url=${image.fileUrl}`;
                const blobUrl = await viewImage(url);
                if (blobUrl) {
                    setImageUrl(blobUrl);
                }
            }
            setIsLoading(false);
        };

        loadImage();

        return () => {
            if (imageUrl) {
                URL.revokeObjectURL(imageUrl);
            }
        };
    }, [image.fileUrl]);

    if (isLoading) {
        return (
            <>
                <Loader className="animate-spin" />
            </>
        );
    }

    return (
        <div>
            <div className="h-[160px] relative mb-5">
                <Image src={imageUrl} alt="illustrations" fill />
            </div>
            <h3 className="text-sm">{image?.title}</h3>
        </div>
    );
};
