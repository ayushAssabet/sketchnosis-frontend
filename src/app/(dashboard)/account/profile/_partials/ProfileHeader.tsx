import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Camera, Trash2 } from "lucide-react"

const ProfileContentHeader : React.FC = () => {
    return(
        <>
            <div className="flex items-center space-x-4 border-b-2 border-gray-300 pb-8">
                <Avatar className="w-24 h-24">
                    <AvatarImage
                        src="/api/placeholder/96/96"
                        alt="Profile photo"
                    />
                    <AvatarFallback className="bg-gray-200 text-2xl">
                        S
                    </AvatarFallback>
                </Avatar>
                <div className="flex space-x-3">
                    <Button
                        variant="default"
                        className="bg-primary text-white"
                    >
                        <Camera className="w-4 h-4 mr-2" />
                        Change photo
                    </Button>
                    <Button variant="destructive">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Photo
                    </Button>
                </div>
            </div>
        </>
    )
}

export default ProfileContentHeader