import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { CreateUserDialog } from "./UserActionModal";
import { useGetUserRoleList } from "@/features/userRole/hooks/useGetUser";
import DeleteButtonWithConfirmDialog from "@/components/elements/DeleteButton";
import { useRoleUser } from "@/features/userRole/hooks/useUserRole";

export default function AdminUserManagement() {

    const { data , mutate } = useGetUserRoleList()
    const { deleteUser } = useRoleUser(mutate)

    console.log(data)
    const [users, setUsers] = useState([]);

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    

    const handleDeleteUser = (userId: number) => {
        setUsers(users.filter((user) => user.id !== userId));
    };

    useEffect(() => {
      setUsers(data?.data || [])
    },[data])

    return (
        <div className="min-h-screen">
            <div className="max-w-6xl mx-auto">

                {/* Main Content */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Users</CardTitle>
                            <Button
                                onClick={() => setIsDialogOpen(true)}
                                className="flex items-center space-x-2"
                            >
                                <Plus className="h-4 w-4" />
                                <span>Add User</span>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="text-left py-3 px-4 font-medium text-gray-900">
                                            Email
                                        </th>
                                        <th className="text-left py-3 px-4 font-medium text-gray-900">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr
                                            key={user.id}
                                            className="border-b border-gray-100 hover:bg-gray-50"
                                        >
                                            <td className="py-4 px-4">
                                                <div className="flex items-center space-x-3">
                                                    <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-medium">
                                                        {user.email[0].toUpperCase()}
                                                    </div>
                                                    <p className="text-sm text-gray-600 flex items-center">
                                                        <Mail className="h-3 w-3 mr-1" />
                                                        {user.email}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">
                                              <DeleteButtonWithConfirmDialog 
                                                onConfirm={() => deleteUser(user.id)}
                                                title="Delete User"
                                                description="Are you sure you want to delete this user? This action cannot be undone."
                                              />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                <CreateUserDialog
                    isOpen={isDialogOpen}
                    onClose={() => setIsDialogOpen(false)}
                    mutate={mutate}
                />
            </div>
        </div>
    );
}
