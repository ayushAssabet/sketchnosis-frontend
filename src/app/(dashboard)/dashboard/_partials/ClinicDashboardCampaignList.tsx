import { Badge } from "@/components/ui/badge";
import { useCampaignsList } from "@/features/campaigns/hooks/useGetCampaigns";
import { useAuth } from "@/features/login/context/AuthContextProvider";
import { BACKEND_HOST } from "@/utils/constants";

const ClinicDashboardCampaignList = () => {
    const { user } = useAuth();
    const { data } = useCampaignsList(
        `${BACKEND_HOST}/v1/clinics/campaign/${user?.clinicId}?limit=100`
    );

    return (
        <ul>
            {data?.data?.map((campaign: Record<string, any>) => {
                return (
                    <div
                        key={campaign.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 border-gray-200 hover:border-gray-300 hover:shadow-sm`}
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <h3 className="font-medium text-gray-900 text-sm mb-2 flex space-x-2">
                                    <span>{campaign.name}</span>
                                    <span
                                        className={`px-2 py-1 text-xs rounded-md font-medium mr-2 ${
                                            campaign.isPublished === true
                                                ? "bg-green-100 text-green-800"
                                                : "bg-gray-100 text-gray-800"
                                        }`}
                                    >
                                        {campaign.isPublished
                                            ? "published"
                                            : "draft"}
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
                                    {campaign?.repeatType === "daily" && (
                                        <Badge
                                            className="text-xs lowercase"
                                            variant="outline"
                                        >
                                            <span className="text-xs text-gray-600">
                                                {campaign.numberOfDays} {campaign.numberOfDays > 1 ? "days" : "day"}
                                            </span>
                                            <span className="text-xs text-gray-600 capitalize ml-1">
                                                {campaign.repeatType}
                                            </span>
                                        </Badge>
                                    )}
                                </div>

                                <p className="text-sm text-gray-600 leading-relaxed mt-4 line-clamp-3">
                                    {campaign.description}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </ul>
    );
};

export default ClinicDashboardCampaignList



/*
 */
