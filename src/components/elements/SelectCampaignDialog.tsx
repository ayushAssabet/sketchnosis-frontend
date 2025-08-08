"use client";
import React, { useEffect, useState } from "react";
import { Search, Check, Megaphone } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "../ui/badge";
import { useCampaignsList } from "@/features/campaigns/hooks/useGetCampaigns";
import { Campaign } from "@/interface/campaign.interface";
import { Button } from "../ui/button";

interface CampaignSelectorProps {
    selectedCampaign?: string | null;
    selectedStartDate?: string;
    onCampaignSelect: (campaign: Campaign | null, startDate: string) => void;
    placeholder?: string;
    disabled?: boolean;
    showStartDate?: boolean;
    onInputChange?: (searchTerm: string) => void;
}

const CampaignSelector: React.FC<CampaignSelectorProps> = ({
    selectedCampaign,
    selectedStartDate = "",
    onCampaignSelect,
    placeholder = "Assign Campaign",
    disabled = false,
    showStartDate = true,
    onInputChange,
}) => {
    const { data } = useCampaignsList();

    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [tempSelectedCampaign, setTempSelectedCampaign] =
        useState<Campaign | null>(null);
    const [tempStartDate, setTempStartDate] = useState(selectedStartDate);
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);

    const filteredCampaigns = campaigns.filter(
        (campaign) =>
            campaign.name?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
            campaign.description
                ?.toLowerCase()
                .includes(searchTerm?.toLowerCase())
    );

    const handleSearchChange = (value: string) => {
        setSearchTerm(value);
        onInputChange?.(value);
    };

    const handleOpenDialog = () => {
        if (!disabled) {
            setIsDialogOpen(true);
            setTempSelectedCampaign(null);
            setTempStartDate(selectedStartDate);
        }
    };

    const handleCancel = () => {
        setIsDialogOpen(false);
        setSearchTerm("");
        setTempSelectedCampaign(null);
        setTempStartDate(selectedStartDate);
    };

    const handleAssign = () => {
        onCampaignSelect(tempSelectedCampaign, tempStartDate);
        setIsDialogOpen(false);
        setSearchTerm("");
    };

    const handleCampaignClick = (campaign: Campaign) => {
        setTempSelectedCampaign(campaign);
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    useEffect(() => {
        if (data?.data?.data) {
            setCampaigns(data?.data?.data);
        }
    }, [data]);

    useEffect(() => {
        if (selectedCampaign) {
            setTempSelectedCampaign(
                data?.data?.data?.filter(
                    (campaign: Campaign) => campaign.id === selectedCampaign
                )
            );
        }
    }, [selectedCampaign, data]);

    console.log(campaigns);
    console.log(selectedCampaign);

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            {/* Campaign Input Field */}
            <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Campaign
                </label>
                <DialogTrigger asChild>
                    <div
                        onClick={handleOpenDialog}
                        className={`
                            w-full px-3 py-2 border border-gray-300 rounded-md bg-white cursor-pointer
                            flex items-center justify-between min-h-[40px]
                            ${
                                disabled
                                    ? "bg-gray-100 cursor-not-allowed"
                                    : "hover:border-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent"
                            }
                            ${
                                selectedCampaign
                                    ? "text-gray-900"
                                    : "text-gray-500"
                            }
                            transition-colors duration-200
                            `}
                    >
                        <div className="flex-1">
                            {selectedCampaign ? (
                                <div>
                                    <div className="font-medium text-sm">
                                        <Badge variant="outline">
                                            {
                                                data?.data?.data
                                                    ?.filter(
                                                        (campaign) =>
                                                            campaign.id ==
                                                            selectedCampaign
                                                    )
                                                    ?.at(0)?.name
                                            }
                                        </Badge>
                                    </div>
                                </div>
                            ) : (
                                <span className="text-sm">{placeholder}</span>
                            )}
                        </div>
                        <div className="ml-2 flex items-center space-x-1">
                            <Megaphone className="h-4 w-4 text-gray-400" />
                            <svg
                                className="h-4 w-4 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </div>
                    </div>
                </DialogTrigger>
            </div>

            <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden">
                <DialogHeader>
                    <DialogTitle>
                        Choose a campaign to assign the patient.
                    </DialogTitle>
                </DialogHeader>

                {/* Dialog Content */}
                <div className="max-h-96 overflow-y-auto">
                    {/* Search Input */}
                    <div className="relative mb-4">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search campaigns..."
                            value={searchTerm}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md   focus:border-transparent text-sm"
                        />
                    </div>

                    {/* Campaign List */}
                    <div className="space-y-3">
                        {filteredCampaigns.map((campaign) => (
                            <div
                                key={campaign.id}
                                onClick={() => handleCampaignClick(campaign)}
                                className={`
                                    p-4 border rounded-lg cursor-pointer transition-all duration-200
                                    ${
                                        tempSelectedCampaign?.id === campaign.id
                                            ? "border-primary bg-blue-50/50 shadow-md"
                                            : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                                    }
                                    `}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h3 className="font-medium text-gray-900 text-sm mb-2 flex space-x-2">
                                            <span>{campaign.name}</span>
                                            <span
                                                className={`
                                                    px-2 py-1 text-xs rounded-md font-medium mr-2
                                                    ${
                                                        campaign.status ===
                                                        "active"
                                                            ? "bg-green-100 text-green-800"
                                                            : "bg-gray-100 text-gray-800"
                                                    }
                                                `}
                                            >
                                                {campaign.status ?? "active"}
                                            </span>
                                        </h3>
                                        <div className="flex items-center space-x-3">
                                            {campaign.areaOfConcerns.map(
                                                (concerns, index) => {
                                                    return (
                                                        <Badge
                                                            variant="secondary"
                                                            key={index}
                                                        >
                                                            {concerns?.name}
                                                        </Badge>
                                                    );
                                                }
                                            )}
                                            {campaign?.repeatType ==
                                                "daily" && (
                                                <Badge
                                                    className="text-xs lowercase"
                                                    variant="outline"
                                                >
                                                    <span className="text-xs text-gray-600">
                                                        {campaign.numberOfDays}{" "}
                                                        Days
                                                    </span>
                                                    <span className="text-xs text-gray-600 capitalize">
                                                        {campaign.repeatType}
                                                    </span>
                                                </Badge>
                                            )}
                                            {campaign.repeatType ==
                                                "weekly" && (
                                                <div className="text-xs flex font-medium items-center gap-2">
                                                    Weekly
                                                    {[
                                                        ...new Set(
                                                            campaign?.scheduleImages?.map(
                                                                (image) =>
                                                                    image.dayOfWeek
                                                            )
                                                        ),
                                                    ].map(
                                                        (dayOfWeek, index) => (
                                                            <p
                                                                key={index}
                                                                className="w-6 h-6 rounded text-[10px] font-medium transition-colors bg-primary text-white flex items-center justify-center"
                                                            >
                                                                {dayOfWeek}
                                                            </p>
                                                        )
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        <p className="text-sm text-gray-600 leading-relaxed mt-4 line-clamp-3">
                                            {campaign.description}
                                        </p>
                                    </div>
                                    {tempSelectedCampaign?.id ===
                                        campaign.id && (
                                        <div className="ml-3 flex-shrink-0">
                                            <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                                                <Check className="w-3 h-3 text-white" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredCampaigns.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                            <p className="text-sm">
                                No campaigns found matching your search.
                            </p>
                        </div>
                    )}
                </div>

                {/* Campaign Start Date */}
                {showStartDate && tempSelectedCampaign && (
                    <div className="pt-4 border-t border-gray-200">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Campaign Start Date
                        </label>
                        <input
                            type="date"
                            value={tempStartDate}
                            onChange={(e) => setTempStartDate(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                        />
                    </div>
                )}

                <DialogFooter>
                    <Button variant="outline" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button onClick={handleAssign}>Assign</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CampaignSelector;
