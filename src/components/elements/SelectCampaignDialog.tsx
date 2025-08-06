"use client";
import React, { useState } from "react";
import { Calendar, Search, X, Check } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "../ui/badge";

interface Campaign {
    id: string;
    name: string;
    description: string;
    duration: string;
    status: "Active" | "Inactive";
    category: string;
}

interface CampaignSelectorProps {
    selectedCampaign?: Campaign | null;
    selectedStartDate?: string;
    onCampaignSelect: (campaign: Campaign | null, startDate: string) => void;
    placeholder?: string;
    disabled?: boolean;
    showStartDate?: boolean;
    onInputChange?: (searchTerm: string) => void;
}

// Mock campaign data - replace with your actual data source
const mockCampaigns: Campaign[] = [
    {
        id: "1",
        name: "Heart Health Awareness Campaign",
        description:
            "Take in mind to your heart! This campaign shares easy-to-understand tips, visuals, and facts about keeping your heart healthy. Learn about signs to watch for lifestyle changes you can make, and how to care for your heart – all through simple illustrations and guides.",
        duration: "100 days Daily",
        status: "Active",
        category: "Health",
    },
    {
        id: "2",
        name: "Diabetes Prevention Campaign",
        description:
            "Understanding diabetes prevention through lifestyle modifications, dietary changes, and regular monitoring. This comprehensive campaign provides practical guidance for maintaining healthy blood sugar levels.",
        duration: "56 days Monthly",
        status: "Active",
        category: "Health",
    },
    {
        id: "3",
        name: "Mental Wellness Initiative",
        description:
            "Promoting mental health awareness and providing resources for stress management, mindfulness practices, and emotional wellbeing through interactive content and community support.",
        duration: "75 days Daily",
        status: "Active",
        category: "Health",
    },
];

const CampaignSelector: React.FC<CampaignSelectorProps> = ({
    selectedCampaign,
    selectedStartDate = "",
    onCampaignSelect,
    placeholder = "Assign Campaign",
    disabled = false,
    showStartDate = true,
    onInputChange,
}) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [tempSelectedCampaign, setTempSelectedCampaign] =
        useState<Campaign | null>(selectedCampaign || null);
    const [tempStartDate, setTempStartDate] = useState(selectedStartDate);
    const [campaigns] = useState<Campaign[]>(mockCampaigns);

    const filteredCampaigns = campaigns.filter(
        (campaign) =>
            campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            campaign.description
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
    );

    const handleSearchChange = (value: string) => {
        setSearchTerm(value);
        onInputChange?.(value);
    };

    const handleOpenDialog = () => {
        if (!disabled) {
            setIsDialogOpen(true);
            setTempSelectedCampaign(selectedCampaign || null);
            setTempStartDate(selectedStartDate);
        }
    };

    const handleCancel = () => {
        setIsDialogOpen(false);
        setSearchTerm("");
        setTempSelectedCampaign(selectedCampaign || null);
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
                                    : "hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                                        {selectedCampaign.name}
                                    </div>
                                    {showStartDate && selectedStartDate && (
                                        <div className="text-xs text-gray-500 mt-1">
                                            Start Date:{" "}
                                            {formatDate(selectedStartDate)}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <span className="text-sm">{placeholder}</span>
                            )}
                        </div>
                        <div className="ml-2 flex items-center space-x-1">
                            <Calendar className="h-4 w-4 text-gray-400" />
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
                                            ? "border-blue-500 bg-blue-50 shadow-md"
                                            : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                                    }
                                    `}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h3 className="font-medium text-gray-900 text-sm mb-1 flex space-x-2">
                                            <span>{campaign.name}</span>
                                            <span
                                                className={`
                                                    px-2 py-1 text-xs rounded-md font-medium mr-2
                                                    ${
                                                        campaign.status ===
                                                        "Active"
                                                            ? "bg-green-100 text-green-800"
                                                            : "bg-gray-100 text-gray-800"
                                                    }
                                                `}
                                            >
                                                {campaign.status}
                                            </span>
                                        </h3>
                                        <div className="flex items-center space-x-3">
                                            <span>
                                                <Badge>
                                                    {campaign.category}
                                                </Badge>
                                            </span>
                                        </div>
                                        <p className="mb-4">
                                            <span className="text-xs text-gray-600">
                                                {campaign.duration}
                                            </span>
                                        </p>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            {campaign.description}
                                        </p>
                                    </div>
                                    {tempSelectedCampaign?.id ===
                                        campaign.id && (
                                        <div className="ml-3 flex-shrink-0">
                                            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                    </div>
                )}

                <DialogFooter>
                    <button
                        onClick={handleCancel}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleAssign}
                        disabled={!tempSelectedCampaign}
                        className={`
                        px-4 py-2 text-sm font-medium text-white rounded-md transition-colors
                            ${
                                tempSelectedCampaign
                                    ? "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                                    : "bg-gray-400 cursor-not-allowed"
                            }
                        `}
                    >
                        Assign
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CampaignSelector;
