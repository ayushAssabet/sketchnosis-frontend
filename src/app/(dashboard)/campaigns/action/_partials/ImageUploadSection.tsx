import { ImageIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { viewImage } from "@/helpers/viewImage.helper";
import { useEffect, useState } from "react";

export const ImageUploadPreview = ({ 
    selectedImage, 
    size = "large", 
    dayLabel,
    onClick 
}) => {
    const [imageUrl, setImageUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const loadImage = async () => {
            // Handle both fileUrl (from dialog selection) and url (from edit data)
            const imageSource = selectedImage?.fileUrl || selectedImage?.url;
            
            if (imageSource) {
                setIsLoading(true);
                try {
                    const url = `${process.env.NEXT_PUBLIC_BACKEND_HOST}/v1/illustration/view-illustration?url=${imageSource}`;
                    const blobUrl = await viewImage(url);
                    if (blobUrl) {
                        setImageUrl(blobUrl);
                    }
                } catch (error) {
                    console.error("Failed to load image:", error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        loadImage();

        return () => {
            if (imageUrl) {
                URL.revokeObjectURL(imageUrl);
            }
        };
    }, [selectedImage?.fileUrl, selectedImage?.url]);

    // Size configurations
    const sizeConfig = {
        large: {
            container: "w-12 h-12",
            icon: "w-6 h-6",
            avatar: "w-12 h-12"
        },
        medium: {
            container: "w-10 h-10",
            icon: "w-5 h-5",
            avatar: "w-10 h-10"
        }
    };

    const config = sizeConfig[size] || sizeConfig.large;

    if (selectedImage && (imageUrl || isLoading)) {
        return (
            <div 
                className={`${config.container} mx-auto cursor-pointer`}
                onClick={onClick}
            >
                <Avatar className={config.avatar}>
                    {imageUrl && !isLoading && (
                        <AvatarImage
                            src={imageUrl}
                            alt={selectedImage.title || dayLabel || "Selected image"}
                            className="object-cover"
                        />
                    )}
                    <AvatarFallback className="bg-gradient-to-br from-blue-900 to-purple-900">
                        {isLoading ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        ) : (
                            <ImageIcon className={`${config.icon} text-white`} />
                        )}
                    </AvatarFallback>
                </Avatar>
            </div>
        );
    }

    // Default state - no image selected
    return (
        <div 
            className={`${config.container} mx-auto cursor-pointer`}
            onClick={onClick}
        >
            <ImageIcon className={`${config.container} text-gray-400`} />
        </div>
    );
};

// Updated renderImageUploadSection using the new component
const renderImageUploadSection = ({
    formData,
    selectedDays,
    weeklyImages,
    dailyImages,
    handleOpenIllustrationDialog,
    days
}) => {
    if (formData.repeatType === "weekly") {
        const numberOfWeeks = parseInt(formData.numberOfWeeks || "2");
        return (
            <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                    Weekly Images
                </label>
                <div className="grid grid-cols-2 gap-6">
                    {Array.from(
                        { length: numberOfWeeks },
                        (_, weekIndex) => (
                            <div key={weekIndex}>
                                <h4 className="text-sm font-medium text-gray-600 mb-3 text-center">
                                    Week {weekIndex + 1}
                                </h4>
                                <div className="grid grid-cols-2 gap-3">
                                    {selectedDays.map((dayKey) => {
                                        const day = days.find(
                                            (d) => d.key === dayKey
                                        );
                                        const uploadKey = `week${weekIndex + 1}_${dayKey}`;
                                        const selectedImage = weeklyImages[uploadKey];

                                        return (
                                            <div
                                                key={`${weekIndex}_${dayKey}`}
                                                className="text-center"
                                            >
                                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-gray-400 transition-colors">
                                                    <ImageUploadPreview
                                                        selectedImage={selectedImage}
                                                        size="large"
                                                        dayLabel={day?.label}
                                                        onClick={() =>
                                                            handleOpenIllustrationDialog(uploadKey)
                                                        }
                                                    />
                                                </div>
                                                <span className="text-xs text-gray-500 mt-1 block">
                                                    {day?.label}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>
        );
    } else {
        // Daily images
        const numberOfDays = parseInt(formData.numberOfDays);
        return (
            <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                    Daily Images
                </label>
                <div className="flex gap-3 overflow-x-auto pb-2">
                    {Array.from({ length: numberOfDays }, (_, index) => {
                        const uploadKey = `day${index + 1}`;
                        const selectedImage = dailyImages[uploadKey];

                        return (
                            <div
                                key={index}
                                className="flex-shrink-0 text-center"
                            >
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 hover:border-gray-400 transition-colors w-16">
                                    <ImageUploadPreview
                                        selectedImage={selectedImage}
                                        size="medium"
                                        dayLabel={`Day ${index + 1}`}
                                        onClick={() =>
                                            handleOpenIllustrationDialog(uploadKey)
                                        }
                                    />
                                </div>
                                <span className="text-xs text-gray-500 mt-1 block">
                                    Day {index + 1}
                                </span>
                            </div>
                        );
                    })}
                    <button
                        type="button"
                        className="flex-shrink-0 w-16 h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-gray-400 transition-colors"
                    >
                        <span className="text-gray-400 text-2xl">→</span>
                    </button>
                </div>
            </div>
        );
    }
};

export default renderImageUploadSection;