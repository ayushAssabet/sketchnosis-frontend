import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface Entity {
    id: string;
    firstName: string;
    lastName: string;
    gender: "Male" | "Female" | "Other";
    address?: string;
    email?: string;
    phone: string;
    fileURL?: string;
    age?: string;
    areaOfConcerns: {
        name: string;
        id: string;
    }[];
}
const PatientProfileHeader: React.FC<{ entity: Entity }> = ({ entity }) => {
    return (
        <>
            <div className="entity__header">
                <div className="entity__intro flex gap-20">
                    <div className="entity__profile-wrapper w-16 h-16 rounded-full">
                        {entity?.fileURL ? (
                            <Image
                                src=""
                                fill
                                alt={entity?.firstName + "Profile Image"}
                            />
                        ) : (
                            <p className="text-center text-xl font bold">
                                {entity?.firstName.split("")?.at(0) +
                                    entity?.lastName?.split("")?.at(0)}
                            </p>
                        )}
                    </div>
                    <div className="entity__intro px-9 border-l">
                        <h3 className="">
                            {entity?.firstName} {entity?.lastName}
                        </h3>
                        <p>
                            <span className="text-sm text-[#7F7F7F]">
                                {entity?.gender}
                            </span>
                            <span className="text-sm text-[#7F7F7F]">
                                {entity?.age}
                            </span>
                        </p>
                    </div>
                </div>
                <ul className="category__list">
                    {entity?.areaOfConcerns?.map((concern, index) => {
                        return <Badge key={index}>{concern?.name}</Badge>;
                    })}
                </ul>
            </div>
        </>
    );
};

export default PatientProfileHeader;
