import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { viewImage } from "@/helpers/viewImage.helper";
import { useEffect, useState } from "react";

export const IllustrationAvatarWrapper = ({ row }: { row: any }) => {

    console.log(row)
    const [imageUrl, setImageUrl] = useState<string>("");

    useEffect(() => {
        const loadImage = async () => {
            if (row?.fileUrl) {
                const url = `${process.env.NEXT_PUBLIC_BACKEND_HOST}/v1/illustration/view-illustration?url=${row.fileUrl}`;
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
    }, [row]);

    return (
        <Avatar className="w-full h-auto">
            {imageUrl && (
                <AvatarImage
                    src={imageUrl}
                    alt={`${row?.title || "Clinic"} logo`}
                />
            )}
            <AvatarFallback className="bg-gray-300">
                {(row?.title ?? "")
                    .split(" ")
                    .map((word: string) => word[0])
                    .join("")
                    .substring(0, 2)
                    .toUpperCase() || "CL"}
            </AvatarFallback>
        </Avatar>
    );
};
