'use client'
import PageHeader from "@/app/(user)/view/_partials/PageHeader";
import { CheckIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";

const SuccessContent: React.FC = () => {
    
    const searchParams = useSearchParams()
    const action = searchParams?.get('action')

    return (
        <div className="h-screen flex flex-col bg-white max-w-md mx-auto">
            {
                action == 'denied' 
                ? <PageHeader hasBackLink={false}>Registration Successfully Denied</PageHeader>
                : <PageHeader hasBackLink={false}>Registration Successful</PageHeader>
            }
            <div className="p-4 rounded-full bg-green-400 w-fit mt-5 mx-auto">
                <CheckIcon className="text-white" size={48} />
            </div>
            {
                action == 'denied' 
                ? 
                <p className="text-sm text-gray-700 leading-relaxed flex items-start mt-5 text-center">
                    You have successfully declined to join the Health Awareness Campaign.
                    You’ll not receive any sms or email regarding this campaign.
                </p>
                :
                <p className="text-sm text-gray-700 leading-relaxed flex items-start mt-5 text-center">
                    You have successfully joined the Health Awareness Campaign.
                    You’ll receive your first SMS shortly, it will include a secure
                    link to your daily health tip or illustration.
                </p>
            }
            {
                action == 'denied' 
                ?
                <p className="text-sm text-gray-700 leading-relaxed mt-5 text-center">
                    Thank you ! , Now you may close this tab.
                </p>
                :
                <p className="text-sm text-gray-700 leading-relaxed mt-5 text-center">
                    Thank you for registering , Now you may close this tab.
                </p>
            }
        </div>
    );
};

export default SuccessContent;
