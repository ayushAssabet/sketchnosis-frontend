import DeleteButtonWithConfirmDialog from "@/components/elements/DeleteButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { usePatient } from "@/features/patients/usePatientAction";
import { usePatientActionForm } from "@/features/patients/usePatientActionForm";
import { appImages } from "@/helpers/image.helper";
import { appRoutes } from "@/lib/routes";
import { PenSquareIcon } from "lucide-react";
import Image from "next/image";

const PatientDetailProfileHeader: React.FC<{ entity: any }> = ({ entity }) => {
    const { deletePatient } = usePatient();
    return (
        <>
            <div className="flex justify-between">
                <div className="entity__header">
                    <div className="entity__intro flex mb-3">
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
                                        {entity?.firstName?.split("")?.at(0)}
                                    </p>
                                </>
                            )}
                        </div>
                        <div className="entity__intro pr-9  ml-2">
                            <h3 className="text-[#000] capitalize text-lg font-semibold">
                                {entity?.firstName} {entity?.firstName}
                            </h3>
                            <p>
                                <span className="text-sm text-[#7F7F7F] capitalize">
                                    {entity?.gender}
                                </span>
                            </p>
                            <p>
                                <span className="text-sm text-[#7F7F7F]">
                                    {entity?.address}
                                </span>
                            </p>
                        </div>
                        <div className="entity__intro px-9 border-l border-[#F0F0F0]">
                            <h3 className="text-[#212121] text-sm font-medium">
                                Contact Detail
                            </h3>
                            <p>
                                <span className="text-sm text-[#7F7F7F]">
                                    {entity?.email}
                                </span>
                            </p>
                            <p>
                                <span className="text-sm text-[#7F7F7F]">
                                    {entity?.phone}
                                </span>
                            </p>
                        </div>
                    </div>
                    <ul className="category__list mb-3">
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
                <div className="actions">
                    <Button variant="ghost">
                        <PenSquareIcon  className="text-green-500"/>
                    </Button>

                    <DeleteButtonWithConfirmDialog
                        title="Delete Clinic?"
                        description={`This will permanently delete "${entity?.firstName}".`}
                        onConfirm={() => deletePatient(entity?.id)}
                        isRedirect={appRoutes.PATIENT_INDEX_PAGE}
                    />
                </div>
            </div>
        </>
    );
};

export default PatientDetailProfileHeader;
