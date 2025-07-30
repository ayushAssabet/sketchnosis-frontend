import LoadingButton from "@/components/elements/LoadingButton";
import AsyncSearchableDropdown from "@/components/elements/SearchableCategorySelect";
import AppDropZone from "@/components/forms/DropZone";
import AppInputField from "@/components/forms/InputField";
import AppTextArea from "@/components/forms/TextArea";
import { Button } from "@/components/ui/button";
import { useCampaign } from "@/features/campaigns/useCampaign";
import { useCampaignActionForm } from "@/features/campaigns/useCampaignActionForm";
import { Upload, Image as ImageIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import IllustrationDialog from "./SelectIllustrationDialog";

// const CampaignActionForm: React.FC<{
//     isUpdate: boolean;
// }> = ({ isUpdate }) => {
//     const searchParams = useSearchParams();
//     const campaignId = searchParams.get("update");

//     const [selectedDays, setSelectedDays] = useState<string[]>(["S", "M"]); // Default selected days
//     const [weeklyImages, setWeeklyImages] = useState<
//         Record<string, File | null>
//     >({});
//     const [dailyImages, setDailyImages] = useState<Record<string, File | null>>(
//         {}
//     );

//     const { formData, handleChange, errors, setFormData, validateForm } =
//         useCampaignActionForm();

//     const {
//         addCampaign,
//         updateCampaign,
//         isAddingCampaign,
//         isUpdatingCampaign,
//     } = useCampaign();

//     const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         const result = validateForm();
//         if (!result.success) return;

//         // Include images in form data based on repeat type
//         const submitData = {
//             ...formData,
//             selectedDays:
//                 formData.repeat === "weekly" ? selectedDays : undefined,
//             images: formData.repeat === "weekly" ? weeklyImages : dailyImages,
//         };

//         isUpdate
//             ? updateCampaign(campaignId!, submitData)
//             : addCampaign(submitData);
//     };

//     const handleAreaOfConcernsChange = (
//         selected: { label: string; value: string }[]
//     ) => {
//         setFormData((prev) => ({
//             ...prev,
//             areaOfConcernIds: selected.map((item) => item.value),
//         }));
//     };

//     const handleDayToggle = (day: string) => {
//         setSelectedDays((prev) =>
//             prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
//         );
//     };

//     const handleImageUpload = (key: string, file: File | null) => {
//         if (formData.repeat === "weekly") {
//             setWeeklyImages((prev) => ({ ...prev, [key]: file }));
//         } else {
//             setDailyImages((prev) => ({ ...prev, [key]: file }));
//         }
//     };

//     const days = [
//         { key: "S", label: "Sun" },
//         { key: "M", label: "Mon" },
//         { key: "T", label: "Tue" },
//         { key: "W", label: "Wed" },
//         { key: "T2", label: "Thu" },
//         { key: "F", label: "Fri" },
//         { key: "S2", label: "Sat" },
//     ];

//     const renderImageUploadSection = () => {
//         if (formData.repeat === "weekly") {
//             const numberOfWeeks = parseInt(formData.numberOfWeeks || "2");
//             return (
//                 <div className="col-span-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-3">
//                         Weekly Images
//                     </label>
//                     <div className="grid grid-cols-2 gap-6">
//                         {Array.from(
//                             { length: numberOfWeeks },
//                             (_, weekIndex) => (
//                                 <div key={weekIndex}>
//                                     <h4 className="text-sm font-medium text-gray-600 mb-3 text-center">
//                                         Week {weekIndex + 1}
//                                     </h4>
//                                     <div className="grid grid-cols-2 gap-3">
//                                         {selectedDays.map((dayKey) => {
//                                             const day = days.find(
//                                                 (d) =>
//                                                     d.key === dayKey ||
//                                                     (dayKey === "T" &&
//                                                         d.key === "T") ||
//                                                     (dayKey === "S" &&
//                                                         d.key === "S")
//                                             );
//                                             const uploadKey = `week${
//                                                 weekIndex + 1
//                                             }_${dayKey}`;

//                                             return (
//                                                 <div
//                                                     key={`${weekIndex}_${dayKey}`}
//                                                     className="text-center"
//                                                 >
//                                                     <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-gray-400 transition-colors">
//                                                         <input
//                                                             type="file"
//                                                             accept="image/*"
//                                                             onChange={(e) =>
//                                                                 handleImageUpload(
//                                                                     uploadKey,
//                                                                     e.target
//                                                                         .files?.[0] ||
//                                                                         null
//                                                                 )
//                                                             }
//                                                             className="hidden"
//                                                             id={uploadKey}
//                                                         />
//                                                         <label
//                                                             htmlFor={uploadKey}
//                                                             className="cursor-pointer"
//                                                         >
//                                                             {weeklyImages[
//                                                                 uploadKey
//                                                             ] ? (
//                                                                 <img
//                                                                     src={URL.createObjectURL(
//                                                                         weeklyImages[
//                                                                             uploadKey
//                                                                         ]!
//                                                                     )}
//                                                                     alt="Upload preview"
//                                                                     className="w-12 h-12 mx-auto rounded object-cover"
//                                                                 />
//                                                             ) : (
//                                                                 <ImageIcon className="w-12 h-12 mx-auto text-gray-400" />
//                                                             )}
//                                                         </label>
//                                                     </div>
//                                                     <span className="text-xs text-gray-500 mt-1 block">
//                                                         {day?.label}
//                                                     </span>
//                                                 </div>
//                                             );
//                                         })}
//                                     </div>
//                                 </div>
//                             )
//                         )}
//                     </div>
//                 </div>
//             );
//         } else {
//             // Daily images
//             const numberOfDays = parseInt(formData.numberOfDays);
//             return (
//                 <div className="col-span-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-3">
//                         Daily Images
//                     </label>
//                     <div className="flex gap-3 overflow-x-auto pb-2">
//                         {Array.from({ length: numberOfDays }, (_, index) => {
//                             const uploadKey = `day${index + 1}`;
//                             return (
//                                 <div
//                                     key={index}
//                                     className="flex-shrink-0 text-center"
//                                 >
//                                     <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 hover:border-gray-400 transition-colors w-16">
//                                         <input
//                                             type="file"
//                                             accept="image/*"
//                                             onChange={(e) =>
//                                                 handleImageUpload(
//                                                     uploadKey,
//                                                     e.target.files?.[0] || null
//                                                 )
//                                             }
//                                             className="hidden"
//                                             id={uploadKey}
//                                         />
//                                         <label
//                                             htmlFor={uploadKey}
//                                             className="cursor-pointer"
//                                         >
//                                             {dailyImages[uploadKey] ? (
//                                                 <img
//                                                     src={URL.createObjectURL(
//                                                         dailyImages[uploadKey]!
//                                                     )}
//                                                     alt="Upload preview"
//                                                     className="w-10 h-10 mx-auto rounded object-cover"
//                                                 />
//                                             ) : (
//                                                 <ImageIcon className="w-10 h-10 mx-auto text-gray-400" />
//                                             )}
//                                         </label>
//                                     </div>
//                                     <span className="text-xs text-gray-500 mt-1 block">
//                                         Day {index + 1}
//                                     </span>
//                                 </div>
//                             );
//                         })}
//                         <button
//                             type="button"
//                             className="flex-shrink-0 w-16 h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-gray-400 transition-colors"
//                         >
//                             <span className="text-gray-400 text-2xl">→</span>
//                         </button>
//                     </div>
//                 </div>
//             );
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className="space-y-6 py-6">
//             {/* Name and Category Row */}
//             <div className="grid grid-cols-2 gap-6">
//                 <AppInputField
//                     id="name"
//                     name="name"
//                     label="Name"
//                     className="text-sm"
//                     type="text"
//                     value={formData?.name ?? ""}
//                     onChange={handleChange}
//                     placeholder="Enter Campaign name"
//                     error={errors?.name}
//                     disabled={isAddingCampaign || isUpdatingCampaign}
//                     variant="dashboard"
//                     required
//                 />
//                 <AsyncSearchableDropdown
//                     defaultOption={[]}
//                     onSelectionChange={handleAreaOfConcernsChange}
//                     error={errors?.category}
//                     required
//                 />
//             </div>

//             {/* Description */}
//             <div>
//                 <AppTextArea
//                     id="description"
//                     name="description"
//                     className="text-sm"
//                     label="Description"
//                     value={formData?.description ?? ""}
//                     onChange={handleChange}
//                     placeholder="Enter Description"
//                     error={errors?.description}
//                     disabled={isAddingCampaign || isUpdatingCampaign}
//                     variant="dashboard"
//                     rows={3}
//                 />
//             </div>

//             {/* Repeat Options */}
//             <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-3">
//                     Repeat
//                 </label>
//                 <div className="flex space-x-4">
//                     <label
//                         className={`flex items-center px-4 py-2 border rounded-lg cursor-pointer transition-colors ${
//                             formData.repeat === "daily"
//                                 ? "border-blue-500 bg-blue-50 text-blue-700"
//                                 : "border-gray-300 hover:border-gray-400"
//                         }`}
//                     >
//                         <input
//                             type="radio"
//                             name="repeat"
//                             value="daily"
//                             checked={formData.repeat === "daily"}
//                             onChange={handleChange}
//                             className="sr-only"
//                         />
//                         <span className="text-sm">Daily</span>
//                     </label>
//                     <label
//                         className={`flex items-center px-4 py-2 border rounded-lg cursor-pointer transition-colors ${
//                             formData.repeat === "weekly"
//                                 ? "border-blue-500 bg-blue-50 text-blue-700"
//                                 : "border-gray-300 hover:border-gray-400"
//                         }`}
//                     >
//                         <input
//                             type="radio"
//                             name="repeat"
//                             value="weekly"
//                             checked={formData.repeat === "weekly"}
//                             onChange={handleChange}
//                             className="sr-only"
//                         />
//                         <span className="text-sm">Weekly</span>
//                     </label>
//                 </div>
//             </div>

//             {/* Conditional Fields based on Repeat Type */}
//             {formData.repeat === "weekly" ? (
//                 <>
//                     {/* Number of Weeks and Select Days */}
//                     <div className="grid grid-cols-2 gap-6">
//                         <AppInputField
//                             id="numberOfWeeks"
//                             name="numberOfWeeks"
//                             label="No. of Weeks"
//                             type="number"
//                             value={formData?.numberOfWeeks ?? "2"}
//                             onChange={handleChange}
//                             placeholder="Enter number of weeks"
//                             error={errors?.numberOfWeeks}
//                             disabled={isAddingCampaign || isUpdatingCampaign}
//                             variant="dashboard"
//                             min="1"
//                             max="12"
//                         />
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-3">
//                                 Select Days
//                             </label>
//                             <div className="flex space-x-2">
//                                 {days.map((day) => (
//                                     <button
//                                         key={day.key}
//                                         type="button"
//                                         onClick={() => handleDayToggle(day.key)}
//                                         className={`w-10 h-10 rounded text-sm font-medium transition-colors ${
//                                             selectedDays.includes(day.key)
//                                                 ? "bg-blue-500 text-white"
//                                                 : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//                                         }`}
//                                     >
//                                         {day.key === "T2"
//                                             ? "T"
//                                             : day.key === "S2"
//                                             ? "S"
//                                             : day.key}
//                                     </button>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                 </>
//             ) : (
//                 /* Number of Days for Daily */
//                 <div className="grid grid-cols-2 gap-6">
//                     <AppInputField
//                         id="numberOfDays"
//                         name="numberOfDays"
//                         label="No. of Days"
//                         type="number"
//                         value={formData?.numberOfDays ?? "10"}
//                         onChange={handleChange}
//                         placeholder="Enter duration in days"
//                         error={errors?.numberOfDays}
//                         disabled={isAddingCampaign || isUpdatingCampaign}
//                         variant="dashboard"
//                         min="1"
//                         max="365"
//                     />
//                     <div></div>
//                 </div>
//             )}

//             {/* Image Upload Section */}
//             {renderImageUploadSection()}

//             {/* Action Buttons */}
//             <div className="flex justify-end space-x-4 pt-6 ml-auto w-fit">
//                 <Button
//                     type="button"
//                     variant="outline"
//                     className="px-8 py-2"
//                     disabled={isAddingCampaign || isUpdatingCampaign}
//                 >
//                     Cancel
//                 </Button>
//                 <LoadingButton
//                     title="Campaign"
//                     isLoading={isAddingCampaign || isUpdatingCampaign}
//                     isUpdate={isUpdate}
//                     className="px-8 w-fit"
//                 />
//             </div>
//         </form>
//     );
// };

// export default CampaignActionForm;


const CampaignActionForm: React.FC<{
    isUpdate: boolean;
}> = ({ isUpdate }) => {
    const searchParams = useSearchParams();
    const campaignId = searchParams.get("update");

    const [selectedDays, setSelectedDays] = useState<string[]>(["S", "M"]); // Default selected days
    
    // Changed from File to illustration object
    const [weeklyImages, setWeeklyImages] = useState<
        Record<string, { id: string; url: string; title: string } | null>
    >({});
    const [dailyImages, setDailyImages] = useState<Record<string, { id: string; url: string; title: string } | null>>(
        {}
    );

    // Dialog state
    const [illustrationDialogOpen, setIllustrationDialogOpen] = useState(false);
    const [currentUploadKey, setCurrentUploadKey] = useState<string | null>(null);

    const { formData, handleChange, errors, setFormData, validateForm } =
        useCampaignActionForm();

    const {
        addCampaign,
        updateCampaign,
        isAddingCampaign,
        isUpdatingCampaign,
    } = useCampaign();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = validateForm();
        if (!result.success) return;

        // Include images in form data based on repeat type
        const submitData = {
            ...formData,
            selectedDays:
                formData.repeat === "weekly" ? selectedDays : undefined,
            images: formData.repeat === "weekly" ? weeklyImages : dailyImages,
        };

        isUpdate
            ? updateCampaign(campaignId!, submitData)
            : addCampaign(submitData);
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

    // Modified to handle illustration selection instead of file upload
    const handleOpenIllustrationDialog = (key: string) => {
        setCurrentUploadKey(key);
        setIllustrationDialogOpen(true);
    };

    const handleIllustrationSelect = (illustration: { id: string; url: string; title: string }) => {
        if (formData.repeat === "weekly") {
            setWeeklyImages((prev) => ({ ...prev, [currentUploadKey!]: illustration }));
        } else {
            setDailyImages((prev) => ({ ...prev, [currentUploadKey!]: illustration }));
        }
    };


    console.log(weeklyImages , dailyImages)

    const days = [
        { key: "S", label: "Sun" },
        { key: "M", label: "Mon" },
        { key: "T", label: "Tue" },
        { key: "W", label: "Wed" },
        { key: "T2", label: "Thu" },
        { key: "F", label: "Fri" },
        { key: "S2", label: "Sat" },
    ];

    const renderImageUploadSection = () => {
        if (formData.repeat === "weekly") {
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
                                                (d) =>
                                                    d.key === dayKey ||
                                                    (dayKey === "T" &&
                                                        d.key === "T") ||
                                                    (dayKey === "S" &&
                                                        d.key === "S")
                                            );
                                            const uploadKey = `week${
                                                weekIndex + 1
                                            }_${dayKey}`;
                                            const selectedImage = weeklyImages[uploadKey];

                                            console.log(selectedImage)

                                            return (
                                                <div
                                                    key={`${weekIndex}_${dayKey}`}
                                                    className="text-center"
                                                >
                                                    <div 
                                                        className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-gray-400 transition-colors cursor-pointer"
                                                        onClick={() => handleOpenIllustrationDialog(uploadKey)}
                                                    >
                                                        {selectedImage ? (
                                                            <div className="w-12 h-12 mx-auto bg-gradient-to-br from-blue-900 to-purple-900 rounded flex items-center justify-center">
                                                                <ImageIcon className="w-6 h-6 text-white" />
                                                            </div>
                                                        ) : (
                                                            <ImageIcon className="w-12 h-12 mx-auto text-gray-400" />
                                                        )}
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
                                    <div 
                                        className="border-2 border-dashed border-gray-300 rounded-lg p-3 hover:border-gray-400 transition-colors w-16 cursor-pointer"
                                        onClick={() => handleOpenIllustrationDialog(uploadKey)}
                                    >
                                        {selectedImage ? (
                                            <div className="w-10 h-10 mx-auto bg-gradient-to-br from-blue-900 to-purple-900 rounded flex items-center justify-center">
                                                <ImageIcon className="w-5 h-5 text-white" />
                                            </div>
                                        ) : (
                                            <ImageIcon className="w-10 h-10 mx-auto text-gray-400" />
                                        )}
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
                        defaultOption={[]}
                        onSelectionChange={handleAreaOfConcernsChange}
                        error={errors?.category}
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
                                formData.repeat === "daily"
                                    ? "border-blue-500 bg-blue-50 text-blue-700"
                                    : "border-gray-300 hover:border-gray-400"
                            }`}
                        >
                            <input
                                type="radio"
                                name="repeat"
                                value="daily"
                                checked={formData.repeat === "daily"}
                                onChange={handleChange}
                                className="sr-only"
                            />
                            <span className="text-sm">Daily</span>
                        </label>
                        <label
                            className={`flex items-center px-4 py-2 border rounded-lg cursor-pointer transition-colors ${
                                formData.repeat === "weekly"
                                    ? "border-blue-500 bg-blue-50 text-blue-700"
                                    : "border-gray-300 hover:border-gray-400"
                            }`}
                        >
                            <input
                                type="radio"
                                name="repeat"
                                value="weekly"
                                checked={formData.repeat === "weekly"}
                                onChange={handleChange}
                                className="sr-only"
                            />
                            <span className="text-sm">Weekly</span>
                        </label>
                    </div>
                </div>

                {/* Conditional Fields based on Repeat Type */}
                {formData.repeat === "weekly" ? (
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
                                disabled={isAddingCampaign || isUpdatingCampaign}
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
                                            onClick={() => handleDayToggle(day.key)}
                                            className={`w-10 h-10 rounded text-sm font-medium transition-colors ${
                                                selectedDays.includes(day.key)
                                                    ? "bg-blue-500 text-white"
                                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                            }`}
                                        >
                                            {day.key === "T2"
                                                ? "T"
                                                : day.key === "S2"
                                                ? "S"
                                                : day.key}
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
                {renderImageUploadSection()}

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
