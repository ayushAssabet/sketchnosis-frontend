import { Badge } from "@/components/ui/badge";
import { appImages } from "@/helpers/image.helper";
import { ClinicIndividualInterface } from "@/interface/clinic.interface";
import Image from "next/image";

const ProfileHeader: React.FC<{ entity: ClinicIndividualInterface }> = ({
    entity,
}) => {
    return (
        <>
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
                                    {entity?.name.split("")?.at(0)}
                                </p>
                            </>
                        )}
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
                <ul className="category__list mb-3">
                    {entity?.areaOfConcerns?.map((concern, index) => {
                        return <Badge key={index} className="py-1 px-2.5 rounded-full capitalize">{concern?.name}</Badge>;
                    })}
                </ul>
                <p className="text-sm">{entity?.description}</p>
            </div>
        </>
    );
};

export default ProfileHeader;
