import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileContentHeader from "./ProfileHeader";
import ProfileInfo from "./ProfileInfo";

const ProfileTabs = () => {
    return (
        <Tabs defaultValue="profile" className="w-full">
            <TabsList className="flex gap-6 bg-white mb-4">
                <TabsTrigger
                    value="profile"
                    className=" rounded-none shadow-none border-primary"
                >
                    Profile
                </TabsTrigger>
                <TabsTrigger value="security" className="text-gray-500">
                    Password and Security
                </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
                <ProfileContentHeader />
                <ProfileInfo />
            </TabsContent>

            <TabsContent value="security">
                <Card>
                    <CardHeader>
                        <CardTitle>Password and Security Settings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600">
                            Security settings would go here.
                        </p>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    );
};

export default ProfileTabs
