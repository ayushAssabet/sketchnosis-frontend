"use client";
import LoadingButton from "@/components/elements/LoadingButton";
import AsyncSearchableDropdown from "@/components/elements/SearchableCategorySelect";
import AppInputField from "@/components/forms/InputField";
import AppTextArea from "@/components/forms/TextArea";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import IllustrationDialog from "./SelectIllustrationDialog";
import { transformCampaignData } from "@/helpers/dataTransformer.helper";
import { useGetCampaignDetail } from "@/features/campaigns/hooks/useGetCampaigns";
import renderImageUploadSection from "./ImageUploadSection";
import { useCampaignActionForm } from "@/features/campaigns/hooks/useCampaignActionForm";
import { useCampaign } from "@/features/campaigns/hooks/useCampaign";

const CampaignActionForm: React.FC<{
    isUpdate: boolean;
}> = ({ isUpdate }) => {
    const searchParams = useSearchParams();
    const campaignId = searchParams.get("update");
    const { data: campaignDetail, isLoading: isLoadingCampaignDetail } =
        useGetCampaignDetail(campaignId);
    const { formData, handleChange, errors, setFormData, validateForm } =
        useCampaignActionForm(campaignDetail?.data);
    const [defaultCategories, setDefaultCategories] = useState<
        { label: string; value: string }[]
    >([]);

    const {
        addCampaign,
        updateCampaign,
        isAddingCampaign,
        isUpdatingCampaign,
    } = useCampaign();

    const [selectedDays, setSelectedDays] = useState<string[]>([]);

    // Changed from File to illustration object
    const [weeklyImages, setWeeklyImages] = useState<
        Record<string, { id: string; url: string; title: string } | null>
    >({});
    const [dailyImages, setDailyImages] = useState<
        Record<string, { id: string; url: string; title: string } | null>
    >({});

    // Dialog state
    const [illustrationDialogOpen, setIllustrationDialogOpen] = useState(false);
    const [currentUploadKey, setCurrentUploadKey] = useState<string | null>(
        null
    );

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Include images in form data based on repeat type
        const campaignPayload = transformCampaignData(
            formData,
            selectedDays,
            weeklyImages,
            dailyImages
        );
        console.log(campaignPayload);
        const result = validateForm(campaignPayload);
        if (!result.success) return;

        isUpdate
            ? updateCampaign(campaignId!, campaignPayload as unknown as any)
            : addCampaign(campaignPayload as unknown as any);
    };

    const handleAreaOfConcernsChange = (
        selected: { label: string; value: string }[]
    ) => {
        setFormData((prev) => ({
            ...prev,
            areaOfConcernIds: selected.map((item) => item.value),
        }));
    };

    const handleDayToggle = (day: string) => {
        setSelectedDays((prev) =>
            prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
        );
    };

    console.log(selectedDays);

    // Modified to handle illustration selection instead of file upload
    const handleOpenIllustrationDialog = (key: string) => {
        setCurrentUploadKey(key);
        setIllustrationDialogOpen(true);
    };

    const handleIllustrationSelect = (illustration: {
        id: string;
        url: string;
        title: string;
    }) => {
        if (formData.repeatType === "weekly") {
            console.log(currentUploadKey);
            setWeeklyImages((prev) => ({
                ...prev,
                [currentUploadKey!]: illustration,
            }));
        } else {
            setDailyImages((prev) => ({
                ...prev,
                [currentUploadKey!]: illustration,
            }));
        }
    };

    // Fixed: Made key and label the same
    const days = [
        { key: "d1", label: "d1" },
        { key: "d2", label: "d2" },
        { key: "d3", label: "d3" },
        { key: "d4", label: "d4" },
        { key: "d5", label: "d5" },
        { key: "d6", label: "d6" },
        { key: "d7", label: "d7" },
    ];

    // Fixed: Proper toggle function with complete state updates
    const handleRepeatToggle = (type: "daily" | "weekly") => {
        setFormData((prev) => ({
            ...prev,
            numberOfWeeks: "2",
            repeatType: type,
        }));

        // Clear images when switching types
        if (type === "weekly") {
            setDailyImages({});
            setSelectedDays((prev) => {
                if (!prev || prev.length < 2) {
                    return ["d1", "d2"];
                }
                return prev;
            });
        } else {
            setWeeklyImages({});
        }
    };

    const [hasInitializedDays, setHasInitializedDays] = useState(false);

    useEffect(() => {
        if (
            !hasInitializedDays &&
            formData?.selectedDays &&
            formData.selectedDays.length > 0 // Only run when we actually have selectedDays
        ) {
            console.log(
                "Setting selectedDays from formData:",
                formData.selectedDays
            );
            setSelectedDays([...new Set(formData.selectedDays)]);
            setHasInitializedDays(true);
        }
    }, [formData?.selectedDays, hasInitializedDays]);

    useEffect(() => {
        if (campaignDetail?.data) {
            setDefaultCategories(
                campaignDetail?.data?.areaOfConcerns?.map(
                    (category: Record<string, any>) => ({
                        label: category?.name,
                        value: category?.id,
                    })
                )
            );

            if (campaignDetail?.data?.repeatType === "weekly") {
                const weeklyImagesData: Record<
                    string,
                    { id: string; url: string; title: string } | null
                > = {};

                campaignDetail?.data?.scheduleImages?.forEach((image: any) => {
                    const key = `${image.dayOfWeek}`;
                    weeklyImagesData[key] = {
                        id: image?.id,
                        url: image?.illustration?.fileUrl,
                        title: image?.illustration?.title,
                    };
                });

                setWeeklyImages(weeklyImagesData);
            } else {
                const dailyImagesData: Record<
                    string,
                    { id: string; url: string; title: string } | null
                > = {};

                campaignDetail?.data?.scheduleImages?.forEach((image: any) => {
                    const key = `day${image.dayNumber || image.day}`;
                    dailyImagesData[key] = {
                        id: image?.id,
                        url: image?.illustration?.fileUrl,
                        title: image?.illustration?.title,
                    };
                });

                setDailyImages(dailyImagesData);
            }
        }
    }, [campaignDetail]);

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-6 py-6">
                {/* Name and Category Row */}
                <div className="grid grid-cols-2 gap-6">
                    <AppInputField
                        id="name"
                        name="name"
                        label="Name"
                        className="text-sm"
                        type="text"
                        value={formData?.name ?? ""}
                        onChange={handleChange}
                        placeholder="Enter Campaign name"
                        error={errors?.name}
                        disabled={isAddingCampaign || isUpdatingCampaign}
                        variant="dashboard"
                        required
                    />
                    <AsyncSearchableDropdown
                        defaultOption={defaultCategories}
                        onSelectionChange={handleAreaOfConcernsChange}
                        error={errors?.areaOfConcernIds}
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <AppTextArea
                        id="description"
                        name="description"
                        className="text-sm"
                        label="Description"
                        value={formData?.description ?? ""}
                        onChange={handleChange}
                        placeholder="Enter Description"
                        error={errors?.description}
                        disabled={isAddingCampaign || isUpdatingCampaign}
                        variant="dashboard"
                        rows={3}
                    />
                </div>

                {/* Repeat Options */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                        Repeat
                    </label>
                    <div className="flex space-x-4">
                        <label
                            className={`flex items-center px-4 py-2 border rounded-lg cursor-pointer transition-colors ${
                                formData.repeatType === "daily"
                                    ? "border-blue-500 bg-blue-50 text-blue-700"
                                    : "border-gray-300 hover:border-gray-400"
                            }`}
                        >
                            <input
                                type="radio"
                                name="repeat"
                                value="daily"
                                checked={formData.repeatType === "daily"}
                                onChange={() => handleRepeatToggle("daily")}
                                className="sr-only"
                            />
                            <span className="text-sm">Daily</span>
                        </label>
                        <label
                            className={`flex items-center px-4 py-2 border rounded-lg cursor-pointer transition-colors ${
                                formData.repeatType === "weekly"
                                    ? "border-blue-500 bg-blue-50 text-blue-700"
                                    : "border-gray-300 hover:border-gray-400"
                            }`}
                        >
                            <input
                                type="radio"
                                name="repeat"
                                value="weekly"
                                checked={formData.repeatType === "weekly"}
                                onChange={() => handleRepeatToggle("weekly")}
                                className="sr-only"
                            />
                            <span className="text-sm">Weekly</span>
                        </label>
                    </div>
                </div>

                {/* Conditional Fields based on Repeat Type */}
                {formData.repeatType === "weekly" ? (
                    <>
                        {/* Number of Weeks and Select Days */}
                        <div className="grid grid-cols-2 gap-6">
                            <AppInputField
                                id="numberOfWeeks"
                                name="numberOfWeeks"
                                label="No. of Weeks"
                                type="number"
                                value={formData?.numberOfWeeks ?? "2"}
                                onChange={handleChange}
                                placeholder="Enter number of weeks"
                                error={errors?.numberOfWeeks}
                                disabled={
                                    isAddingCampaign || isUpdatingCampaign
                                }
                                variant="dashboard"
                                min="1"
                                max="12"
                            />
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Select Days
                                </label>
                                <div className="flex space-x-2">
                                    {days.map((day) => (
                                        <button
                                            key={day.key}
                                            type="button"
                                            data-attr={day?.key}
                                            onClick={() =>
                                                handleDayToggle(day.key)
                                            }
                                            className={`w-10 h-10 rounded text-sm font-medium transition-colors capitalize ${
                                                selectedDays.includes(day.key)
                                                    ? "bg-primary text-white"
                                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                            }`}
                                        >
                                            {day.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    /* Number of Days for Daily */
                    <div className="grid grid-cols-2 gap-6">
                        <AppInputField
                            id="numberOfDays"
                            name="numberOfDays"
                            label="No. of Days"
                            type="number"
                            value={formData?.numberOfDays ?? "10"}
                            onChange={handleChange}
                            placeholder="Enter duration in days"
                            error={errors?.numberOfDays}
                            disabled={isAddingCampaign || isUpdatingCampaign}
                            variant="dashboard"
                            min="1"
                            max="365"
                        />
                        <div></div>
                    </div>
                )}

                {/* Image Upload Section */}
                {renderImageUploadSection({
                    formData,
                    selectedDays,
                    weeklyImages,
                    dailyImages,
                    handleOpenIllustrationDialog,
                    days,
                })}

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 pt-6 ml-auto w-fit">
                    <Button
                        type="button"
                        variant="outline"
                        className="px-8 py-2"
                        disabled={isAddingCampaign || isUpdatingCampaign}
                    >
                        Cancel
                    </Button>
                    <LoadingButton
                        title="Campaign"
                        isLoading={isAddingCampaign || isUpdatingCampaign}
                        isUpdate={isUpdate}
                        className="px-8 w-fit"
                    />
                </div>
            </form>

            {/* Illustration Dialog */}
            <IllustrationDialog
                isOpen={illustrationDialogOpen}
                onClose={() => setIllustrationDialogOpen(false)}
                onSelect={handleIllustrationSelect}
                selectedIllustration={null}
            />
        </>
    );
};

export default CampaignActionForm;
