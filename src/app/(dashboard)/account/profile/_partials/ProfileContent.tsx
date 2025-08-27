"use client";

import { appRoutes } from "@/lib/routes";
import CommonContainer from "@/components/elements/CommonContainer";
import PrivateView from "@/views/PrivateView";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileContentHeader from "./ProfileHeader";
import ProfileInfo from "./ProfileInfo";
import Link from "next/link";
import { Lock, User } from "lucide-react";

const ProfileContent: React.FC = () => {
    return (
        <div>
            <PrivateView
                title="User Profile"
                breadCrumbItems={[
                    { title: "Profile", href: appRoutes.USER_PROFILE_INDEX },
                ]}
            >
                <CommonContainer title="campaign-list-section">
                    <Tabs defaultValue="profile" className="w-full">
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
                        <TabsContent value="profile" className="space-y-6">
                            <ProfileContentHeader />
                            <ProfileInfo />
                        </TabsContent>
                    </Tabs>
                </CommonContainer>
            </PrivateView>
        </div>
    );
};

export default ProfileContent;
