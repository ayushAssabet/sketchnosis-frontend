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
import ClinicCampaignList from "./ClinicCampaignList";
import { useGetAllPermissionsByUserId } from "@/features/access/hooks/usePermissions";
import { hasPermission } from "@/helpers/permission.helper";
import { permissions } from "@/utils/permissions";

const ProfileContent = ({ id }: { id: string }) => {
    const { data, isLoading , mutate } = useGetClinicDetailWithPatients(id);
    const { data : permissionData } = useGetAllPermissionsByUserId()


    const canViewPatient = hasPermission([permissions.VIEW_PATIENT] , permissionData?.data)
    // const canViewPatient = true
    
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
                            
                                <ClinicCampaignList 
                                    mutate={mutate}
                                    clinicId={id}
                                    clinicCampaign={data?.data?.clinicCampaigns}
                                    hasViewPatient={canViewPatient}
                                />
                                {
                                    canViewPatient && 
                                    <PatientList
                                        patientList={data?.data?.patients ?? []}
                                    />
                                }
                        </div>
                    </>
                </CommonContainer>
            </PrivateView>
        </>
    );
};

export default ProfileContent;
