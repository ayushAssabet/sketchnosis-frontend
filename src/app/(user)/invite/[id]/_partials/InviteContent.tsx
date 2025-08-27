"use client";
import React from "react";
import {
    Calendar,
    CheckCircle2,
    Shield,
    Database,
    Users,
    Loader,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { useUserDeviceId } from "@/hooks/use-deviceId";
import { useInvitationAction } from "@/features/invitation/useInvitationAction";
import { useScreenModal } from "@/features/restrictDevice/useRestrictDevice";
import { useGetInvitation } from "@/features/invitation/useGetInvitation";
import Link from "next/link";

export default function HealthCampaignInvite({
    campaingInviteId,
}: {
    campaingInviteId: string;
}) {
    
    const [agreedToTerms, setAgreedToTerms] = React.useState(false);
    const { deviceId } = useUserDeviceId();
    const {
        acceptInvitation,
        isAcceptingInvitation,
        declineInvitation,
        isDecliningInvitation,
    } = useInvitationAction();

    const { ScreenModal } = useScreenModal(576);
    const { data }= useGetInvitation(campaingInviteId);

    console.log(data)

    return (
        <div className="h-screen flex flex-col bg-white max-w-md mx-auto">
            {/* Header */}
            <div className="bg-primary text-white p-6 rounded-b-lg flex-shrink-0">
                <div className="text-center">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Users className="w-6 h-6" />
                    </div>
                    <h1 className="text-lg font-semibold mb-1">
                        You're invited to join a health awareness campaign.
                    </h1>
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-auto p-6 space-y-6">
                {/* Campaign Period */}
                <Card className="gap-0">
                    <CardHeader className="pb-3 block">
                        <CardTitle className="flex items-center gap-2 text-base">
                            <Calendar className="w-4 h-4 text-primary" />
                            Campaign Period
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <p className="text-sm text-gray-600">
                            {/* {data?.campaign?.name} ,  */}
                            Starting from {data?.startDate} for {" "} 
                            {data?.campaign.repeatType == 'weekly' 
                                ? `${data?.campaign.numberOfWeeks} weeks` 
                                : `${data?.campaign.numberOfDays} daily`
                            }

                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                            By participating in this campaign, you acknowledge
                            and agree to the following:
                        </p>
                    </CardContent>
                </Card>

                {/* Daily Content Delivery */}
                <div>
                    <h3 className="font-semibold text-sm mb-3 flex items-center gap-2 capitalize">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        {data?.campaign?.repeatType} Content Delivery:
                    </h3>
                    <ul className="text-xs text-gray-600 space-y-1 ml-6">
                        <li>
                            • You will receive SMS messages containing
                            illustration with a secure link to view a
                            health-related tip or illustration.
                        </li>
                    </ul>
                </div>

                {/* Access Restrictions */}
                <div>
                    <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                        <Shield className="w-4 h-4 text-primary" />
                        Access Restrictions:
                    </h3>
                    <ul className="text-xs text-gray-600 space-y-1 ml-6">
                        <li>
                            • Each illustration or tip will be available for 24
                            hours from the time of delivery.
                        </li>
                        <li>
                            • Content can only be accessed through the provided
                            secure browser link.
                        </li>
                        <li>
                            • Screenshots, screen recordings, downloads, or any
                            other method of copying or reproducing the content
                            are strictly prohibited and is a act of serious
                            offence.
                        </li>
                    </ul>
                </div>

                {/* Confidentiality & Non-Sharing */}
                <div>
                    <h3 className="font-semibold text-sm mb-3">
                        Confidentiality & Non-Sharing:
                    </h3>
                    <ul className="text-xs text-gray-600 space-y-1 ml-6">
                        <li>
                            • All campaign materials are provided for your
                            personal use only.
                        </li>
                        <li>
                            • Sharing, forwarding or otherwise distributing the
                            content to any other individual or platform is not
                            permitted.
                        </li>
                    </ul>
                </div>

                {/* Privacy & Data Handling */}
                <div>
                    <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                        <Database className="w-4 h-4 text-primary" />
                        Privacy & Data Handling:
                    </h3>
                    <ul className="text-xs text-gray-600 space-y-1 ml-6">
                        <li>
                            • Your participation and personal information will
                            be handled in accordance with applicable privacy and
                            health information protection standards.
                        </li>
                        <li>
                            • Content may contain health-related information
                            intended solely for your personal awareness and
                            education.
                        </li>
                        <li>
                            • We will not disclose your personal health
                            information without your consent, except as required
                            by law.
                        </li>
                    </ul>
                </div>

                <Separator />
                <div className="flex items-start space-x-3 cursor-pointer">
                    <Checkbox
                        id="terms"
                        checked={agreedToTerms}
                        onCheckedChange={() =>
                            setAgreedToTerms((prev) => !prev)
                        }
                        className="mt-0.5 cursor-pointer"
                    />
                    <label
                        htmlFor="terms"
                        className="text-xs text-gray-600 leading-relaxed cursor-pointer"
                    >
                        I have read and understood the above{" "}
                        <Link href={''} className="text-primary underline cursor-pointer">
                            Privacy Policy
                        </Link>
                        , and{" "}
                        <Link  href={''} className="text-primary underline cursor-pointer">
                            Terms & Conditions
                        </Link>{" "}
                        and I agree to participate in the campaign under these
                        conditions.
                    </label>
                </div>
            </div>

            {/* Sticky Footer */}
            <div className="sticky bottom-0 bg-white border-t p-4 space-y-3 flex-shrink-0">
                {/* Action Buttons */}
                <div className="space-y-3 pt-4">
                    <Button
                        className="w-full  text-white"
                        disabled={!agreedToTerms}
                        onClick={() =>
                            acceptInvitation(deviceId, campaingInviteId)
                        }
                    >
                        {isAcceptingInvitation ? (
                            <Loader />
                        ) : (
                            "Accept terms & Conditions"
                        )}
                    </Button>
                    <Button
                        variant="outline"
                        className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                        onClick={() =>
                            declineInvitation(deviceId, campaingInviteId)
                        }
                    >
                        {isDecliningInvitation ? <Loader /> : "Decline"}
                    </Button>
                </div>
            </div>

            <ScreenModal />
        </div>
    );
}
