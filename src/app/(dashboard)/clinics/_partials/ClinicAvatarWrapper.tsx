import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { viewImage } from "@/helpers/viewImage.helper";
import { useEffect, useState } from "react";

export const ClinicAvatarWrapper = ({ row }: { row: any }) => {
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    console.log(row.original.logoUrl);

    const loadImage = async () => {
      if (row.original?.logoUrl) {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_HOST}/v1/clinics/viewlogo?url=${row.original.logoUrl}`;
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
          alt={`${row.original?.name || "Clinic"} logo`}
        />
      )}
      <AvatarFallback className="bg-gray-300">
        {(row.original?.name ?? "")
          .split(" ")
          .map((word: string) => word[0])
          .join("")
          .substring(0, 2)
          .toUpperCase() || "CL"}
      </AvatarFallback>
    </Avatar>
  );
};
