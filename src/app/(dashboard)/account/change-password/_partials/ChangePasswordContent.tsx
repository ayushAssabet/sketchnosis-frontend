"use client";

import { appRoutes } from "@/lib/routes";
import CommonContainer from "@/components/elements/CommonContainer";
import PrivateView from "@/views/PrivateView";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChangePasswordForm from "./ChangePasswordForm";
import Link from "next/link";
import { Lock, User } from "lucide-react";

const ChangePasswordContent: React.FC = () => {
    return (
        <div>
            <PrivateView
                title="User Profile"
                breadCrumbItems={[
                    { title: "Profile", href: appRoutes.USER_PROFILE_INDEX },
                ]}
            >
                <CommonContainer title="campaign-list-section">
                    <Tabs defaultValue="security" className="w-full">
                        <TabsList className="flex gap-6 bg-white mb-4">
                            <Link href={appRoutes.USER_PROFILE_INDEX}>
                                <TabsTrigger value="profile">
                                    <User />
                                    Profile
                                </TabsTrigger>
                            </Link>
                            <Link href={appRoutes.USER_CHANGE_PASSWORD_INDEX}>
                                <TabsTrigger value="security">
                                    <Lock />
                                    Password & Security
                                </TabsTrigger>
                            </Link>
                        </TabsList>
                        <TabsContent value="security" className="space-y-6">
                            <ChangePasswordForm />
                        </TabsContent>
                    </Tabs>
                </CommonContainer>
            </PrivateView>
        </div>
    );
};

export default ChangePasswordContent;
