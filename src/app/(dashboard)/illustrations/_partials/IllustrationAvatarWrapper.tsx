import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { viewImage } from "@/helpers/viewImage.helper";
import { useEffect, useState } from "react";

export const IllustrationAvatarWrapper = ({ row }: { row: any }) => {
    const [imageUrl, setImageUrl] = useState<string>("");

    useEffect(() => {
        const loadImage = async () => {
            if (row.original?.fileUrl) {
                const url = `http://localhost:4001/v1/illustration/view-illustration?url=${row.original.fileUrl}`;
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
    }, [row.original?.fileUrl]);

    return (
        
        <Avatar>
            {imageUrl && (
                <AvatarImage
                    src={imageUrl}
                    alt={`${row.original?.title || 'Clinic'} logo`}
                />
            )}
            <AvatarFallback className="bg-gray-300">
                {(row.original?.title ?? "")
                    .split(" ")
                    .map((word: string) => word[0])
                    .join("")
                    .substring(0, 2)
                    .toUpperCase() || "CL"}
            </AvatarFallback>
        </Avatar>
    );
};