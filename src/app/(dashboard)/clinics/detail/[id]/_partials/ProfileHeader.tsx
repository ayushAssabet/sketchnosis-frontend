import { IllustrationAvatarWrapper } from "@/app/(dashboard)/patients/detail/[id]/_partials/IllustrationWrapper";
import DeleteButtonWithConfirmDialog from "@/components/elements/DeleteButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useClinic } from "@/features/context/useClinicActions";
import { appImages } from "@/helpers/image.helper";
import { ClinicIndividualInterface } from "@/interface/clinic.interface";
import { appRoutes } from "@/lib/routes";
import { Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ProfileHeader: React.FC<{ entity: ClinicIndividualInterface }> = ({
    entity,
}) => {
    const { deleteClinic } = useClinic();

    console.log(entity);
    return (
        <>
            <div className="entity__header flex items-center justify-between">
                <div>
                    <div className="entity__intro flex mb-3">
                        <div className="entity__profile-wrapper w-16 h-16 rounded-full relative">
                            {/* {entity?.logoUrl ? (
                                <IllustrationAvatarWrapper
                                    row={{
                                        title: entity?.name,
                                        fileUrl: entity?.logoUrl,
                                    }}
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
                            )} */}
                            <IllustrationAvatarWrapper
                                row={{
                                    title: entity?.name,
                                    fileUrl: entity?.logoUrl,
                                }}
                            />
                        </div>
                        <div className="entity__intro pr-9  ml-2">
                            <h3 className="text-[#000] capitalize text-lg font-semibold">
                                {entity?.name}
                            </h3>
                            <p>
                                <span className="text-sm text-[#7F7F7F]">
                                    {entity?.address}
                                </span>
                            </p>
                            <p>
                                <span className="text-sm text-[#7F7F7F]">
                                    {entity?.createdAt}
                                </span>
                            </p>
                        </div>
                        <div className="entity__intro px-9 border-l border-[#F0F0F0]">
                            <h3 className="text-[#212121] text-sm font-medium">
                                Contact Person
                            </h3>
                            <p>
                                <span className="text-sm text-[#7F7F7F]">
                                    {entity?.email}
                                </span>
                                <span className="text-sm text-[#7F7F7F]">
                                    {entity?.contactPersonName}
                                </span>
                            </p>
                        </div>
                        <div className="entity__intro px-9 border-l border-[#F0F0F0]">
                            <h3 className="text-[#212121] text-sm font-medium">
                                Total No. Of Patients
                            </h3>
                            <p>
                                <span className="text-sm text-[#7F7F7F]">
                                    {entity?.email} Adults
                                </span>
                                <span className="text-sm text-[#7F7F7F]">
                                    {entity?.contactPersonName} Children
                                </span>
                            </p>
                        </div>
                    </div>
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
                    <p className="text-sm">{entity?.description}</p>
                </div>
                <div className="flex">
                    <Link
                        href={
                            appRoutes.CLINIC_ACTION_PAGE +
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
                        title="Delete Clinic?"
                        description={`This will permanently delete "${entity?.name}".`}
                        onConfirm={() => deleteClinic(entity?.id)}
                        isRedirect={appRoutes.CLINIC_INDEX_PAGE}
                    />
                </div>
            </div>
        </>
    );
};

export default ProfileHeader;
