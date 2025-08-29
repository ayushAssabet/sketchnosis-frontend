"use client";
import React, { useEffect, useState } from "react";
import { Search, Check, Megaphone, Edit, X } from "lucide-react";
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
import { Button } from "../ui/button";
import { Campaign } from "@/features/campaigns/interface/campaign.interface";

interface CampaignSelectorProps {
    selectedCampaign?: string | null;
    selectedStartDate?: string;
    onCampaignSelect: (campaign: Campaign | null, startDate: string) => void;
    placeholder?: string;
    disabled?: boolean;
    showStartDate?: boolean;
    onInputChange?: (searchTerm: string) => void;
    onUnassign?: () => void;
    open?: boolean; // NEW
    setOpen?: (val: boolean) => void; // NEW
}

const CampaignSelector: React.FC<CampaignSelectorProps> = ({
    selectedCampaign,
    selectedStartDate = "",
    onCampaignSelect,
    placeholder = "Assign Campaign",
    disabled = false,
    showStartDate = true,
    onInputChange,
    onUnassign,
    open,
    setOpen,
}) => {
    const { data } = useCampaignsList();

    const [internalOpen, setInternalOpen] = useState(false);
    const actualOpen = open !== undefined ? open : internalOpen;
    const actualSetOpen = setOpen ?? setInternalOpen;

    const [searchTerm, setSearchTerm] = useState<string>("");
    const [tempSelectedCampaign, setTempSelectedCampaign] =
        useState<Campaign | null>(null);
    const [tempStartDate, setTempStartDate] = useState(selectedStartDate);
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);

    const filteredCampaigns = campaigns.filter(
        (campaign) =>
            campaign.name?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
            campaign.description
                ?.toLowerCase()
                .includes(searchTerm?.toLowerCase())
    );

    const currentCampaign = campaigns.find((c) => c.id === selectedCampaign);

    const handleSearchChange = (value: string) => {
        setSearchTerm(value);
        onInputChange?.(value);
    };

    const handleOpenDialog = (editMode: boolean = false) => {
        if (!disabled) {
            actualSetOpen(true);
            setIsEditMode(editMode);
            if (editMode && currentCampaign) {
                setTempSelectedCampaign(currentCampaign);
            } else {
                setTempSelectedCampaign(null);
            }
            setTempStartDate(selectedStartDate);
        }
    };

    const handleCancel = () => {
        actualSetOpen(false);
        setSearchTerm("");
        setTempSelectedCampaign(null);
        setTempStartDate(selectedStartDate);
        setIsEditMode(false);
    };

    const handleAssign = () => {
        onCampaignSelect(tempSelectedCampaign, tempStartDate);
        actualSetOpen(false);
        setSearchTerm("");
        setIsEditMode(false);
    };

    const handleUnassign = () => {
        onUnassign?.();
        actualSetOpen(false);
        setSearchTerm("");
        setTempSelectedCampaign(null);
        setTempStartDate("");
        setIsEditMode(false);
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
            const campaign = data?.data?.data?.find(
                (campaign: Campaign) => campaign.id === selectedCampaign
            );
            setTempSelectedCampaign(campaign || null);
        }
    }, [selectedCampaign, data]);

    const getDialogTitle = () => {
        return isEditMode
            ? "Edit Campaign Assignment"
            : "Choose a campaign to assign the patient.";
    };

    const getActionButtonText = () => {
        return isEditMode ? "Update" : "Assign";
    };

    return (
        <Dialog open={actualOpen} onOpenChange={actualSetOpen}>
            <DialogTrigger asChild>
                {/* Hidden trigger - parent controls open */}
                <span></span>
            </DialogTrigger>

            <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden">
                <DialogHeader>
                    <DialogTitle>{getDialogTitle()}</DialogTitle>
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
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                        />
                    </div>

                    {/* Campaign List */}
                    <div className="space-y-3">
                        {filteredCampaigns
                            .filter(
                                (campaign) => campaign?.isPublished != false
                            )
                            .map((campaign) => (
                                <div
                                    key={campaign.id}
                                    onClick={() =>
                                        handleCampaignClick(campaign)
                                    }
                                    className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                                        tempSelectedCampaign?.id === campaign.id
                                            ? "border-primary bg-blue-50/50 shadow-md"
                                            : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                                    }`}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h3 className="font-medium text-gray-900 text-sm mb-2 flex space-x-2">
                                                <span>{campaign.name}</span>
                                                <span
                                                    className={`px-2 py-1 text-xs rounded-md font-medium mr-2 ${
                                                        campaign.isPublished ===
                                                        true
                                                            ? "bg-green-100 text-green-800"
                                                            : "bg-gray-100 text-gray-800"
                                                    }`}
                                                >
                                                    {campaign.isPublished ??
                                                        "active"}
                                                </span>
                                            </h3>
                                            <div className="flex items-center space-x-3 flex-wrap">
                                                {campaign.areaOfConcerns?.map(
                                                    (concerns, index) => (
                                                        <Badge
                                                            variant="secondary"
                                                            key={index}
                                                        >
                                                            {concerns?.name}
                                                        </Badge>
                                                    )
                                                )}
                                                {campaign?.repeatType ===
                                                    "daily" && (
                                                    <Badge
                                                        className="text-xs lowercase"
                                                        variant="outline"
                                                    >
                                                        <span className="text-xs text-gray-600">
                                                            {
                                                                campaign.numberOfDays
                                                            }{" "}
                                                            Days
                                                        </span>
                                                        <span className="text-xs text-gray-600 capitalize ml-1">
                                                            {
                                                                campaign.repeatType
                                                            }
                                                        </span>
                                                    </Badge>
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
                    {isEditMode && onUnassign && (
                        <Button
                            variant="destructive"
                            onClick={handleUnassign}
                            className="mr-auto"
                        >
                            Unassign Campaign
                        </Button>
                    )}
                    <div className="flex space-x-2 ml-auto">
                        <Button variant="outline" onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleAssign}
                            disabled={!tempSelectedCampaign}
                        >
                            {getActionButtonText()}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CampaignSelector;
