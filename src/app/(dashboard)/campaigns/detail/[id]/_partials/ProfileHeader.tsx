import DeleteButtonWithConfirmDialog from "@/components/elements/DeleteButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCampaign } from "@/features/campaigns/hooks/useCampaign";
import { appImages } from "@/helpers/image.helper";
import { ClinicIndividualInterface } from "@/interface/clinic.interface";
import { appRoutes } from "@/lib/routes";
import { Edit, PenSquareIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ProfileHeader: React.FC<{ entity: ClinicIndividualInterface }> = ({
    entity,
}) => {
    const { deleteCampaign } = useCampaign();
    return (
        <>
            <div className="entity__header flex items-center justify-between">
                <div>
                    <div className="entity__intro flex mb-3 items-center">
                        <div className="entity__profile-wrapper w-16 h-16 rounded-full relative">
                            {entity?.logoUrl ? (
                                <Image
                                    src={entity?.logoUrl}
                                    fill
                                    alt={entity?.name + "Profile Image"}
                                />
                            ) : (
                                <>
                                    <Image
                                        src={appImages?.profileFrame}
                                        fill
                                        alt="profile-frame"
                                    />
                                    <p className="text-center text-xl font bold capitalize  absolute bg-transparent w-1/2 top-[50%] left-[50%] translate-[-50%]">
                                        {entity?.name?.split("")?.at(0)}
                                    </p>
                                </>
                            )}
                        </div>
                        <div className="entity__intro pr-9  ml-2">
                            <h3 className="text-[#000] capitalize text-lg font-semibold">
                                {entity?.name}
                            </h3>
                        </div>
                    </div>
                    <p className="text-sm mb-4">{entity?.description}</p>
                    <ul className="category__list mb-3 space-x-2">
                        {entity?.areaOfConcerns?.map((concern, index) => {
                            return (
                                <Badge
                                    key={index}
                                    className="py-1 px-2.5 rounded-full capitalize"
                                >
                                    {concern?.name}
                                </Badge>
                            );
                        })}
                    </ul>
                </div>
                <div className="flex">
                    <Link
                        href={
                            appRoutes.CAMPAIGN_ACTION_PAGE +
                            `?update=${entity?.id}`
                        }
                    >
                        <Button
                            variant="ghost"
                            className="!px-2 cursor-pointer text-green-500"
                        >
                            <Edit />
                        </Button>
                    </Link>
                    <DeleteButtonWithConfirmDialog
                        title="Delete Campaign?"
                        description={`This will permanently delete "${entity?.name}".`}
                        onConfirm={() => deleteCampaign(entity?.id)}
                        isRedirect={appRoutes.CAMPAIGN_INDEX_PAGE}
                    />
                </div>
            </div>
        </>
    );
};

export default ProfileHeader;
