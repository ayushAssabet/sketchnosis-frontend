"use client";
import CommonContainer from "@/components/elements/CommonContainer";
import PrivateView from "@/views/PrivateView";
import { appRoutes } from "@/lib/routes";
import {
    useGetClinicDetail,
    useGetClinicDetailWithPatients,
} from "@/features/context/useGetClinic";
import ProfileHeader from "./ProfileHeader";
import PatientList from "./PatientList";

const ProfileContent = ({ id }: { id: string }) => {
    const { data, isLoading } = useGetClinicDetailWithPatients(id);
    console.log(data);
    return (
        <>
            <PrivateView
                title="Clinic"
                breadCrumbItems={[
                    { title: "Clinic", href: appRoutes.CLINIC_INDEX_PAGE },
                    {
                        title: "Clinic Detail",
                        href: appRoutes.CLINIC_INDIVIDUAL_PAGE,
                    },
                ]}
            >
                <CommonContainer title="campaign-list-section">
                    <>
                        <div className="py-10 px-12">
                            <ProfileHeader entity={data?.data} />
                            <PatientList
                                patientList={data?.data?.patients ?? []}
                            />
                        </div>
                    </>
                </CommonContainer>
            </PrivateView>
        </>
    );
};

export default ProfileContent;
