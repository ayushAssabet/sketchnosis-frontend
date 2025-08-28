import React from "react";
import { Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Campaign {
    id: string;
    name: string;
    description: string;
    numberOfDays: number;
    repeatType: string;
    status?: string;
    numberOfWeeks?: string;
    areaOfConcerns: Array<{
        id: string;
        name: string;
    }>;
}

interface AssignedCampaignCardProps {
    campaign: Campaign;
    startDate?: string;
    onEdit?: () => void;
    onDelete?: () => void;
}

const PatientCampaignCard: React.FC<AssignedCampaignCardProps> = ({
    campaign,
    startDate,
    onEdit,
    onDelete,
}) => {
    const formatDate = (dateString: string) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    console.log(campaign);

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            {/* Campaign Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {campaign?.name}
                    </h3>

                    {/* Campaign Tags */}
                    <div className="flex items-center space-x-2 mb-3">
                        {campaign.areaOfConcerns?.map((concern, index) => (
                            <Badge
                                key={index}
                            >
                                {concern.name}
                            </Badge>
                        ))}
                    </div>

                    

                    {/* Campaign Duration and Type */}
                    <div className="flex items-center space-x-4 mb-4">
                        <div className="flex items-center space-x-1">
                            {campaign?.numberOfWeeks ? (
                                <Badge variant="outline" className="text-sm">
                                    {campaign.numberOfWeeks} weeks
                                </Badge>
                            ) : (
                                <Badge variant="outline" className="text-sm">
                                    {campaign.numberOfDays} days
                                </Badge>
                            )}
                        </div>
                    </div>

                    {/* Start Date */}
                    {startDate && (
                        <div className="text-xs text-gray-600 mb-4">
                            <span className="font-medium">Start from : </span>{" "}
                            {formatDate(startDate)}
                        </div>
                    )}

                    {/* Campaign Description */}
                    <p className="text-sm text-gray-700 leading-relaxed line-clamp-4">
                        {campaign.description}
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2 ml-4">
                    {/* {onEdit && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={onEdit}
                            className="h-8 w-8 p-0 hover:bg-gray-50"
                        >
                            <Edit className="h-4 w-4 text-gray-600" />
                        </Button>
                    )} */}

                    {onDelete && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={onDelete}
                            className="h-8 w-8 p-0 hover:bg-red-50 hover:border-red-200"
                        >
                            <Trash2 className="h-4 w-4  hover:text-red-600 text-red-500" />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PatientCampaignCard;

// // Example usage component
// const AssignedCampaignExample = () => {
//   const sampleCampaign = {
//     id: "1",
//     name: "Heart Health Awareness Campaign",
//     description: "Take a moment for your heart! This campaign shares easy-to-understand tips, visuals, and facts about keeping your heart healthy. Learn about steps to watch for, lifestyle changes you can make, and how to care for your heart – all through simple illustrations and guides.",
//     numberOfDays: 120,
//     repeatType: "daily",
//     status: "active",
//     areaOfConcerns: [
//       { id: "1", name: "Cardiology" }
//     ]
//   };

//   const handleEdit = () => {
//     console.log("Edit campaign clicked");
//   };

//   const handleDelete = () => {
//     console.log("Delete campaign clicked");
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <AssignedCampaignCard
//         campaign={sampleCampaign}
//         startDate="2025-01-15"
//         onEdit={handleEdit}
//         onDelete={handleDelete}
//       />
//     </div>
//   );
// };

// export default AssignedCampaignExample;
