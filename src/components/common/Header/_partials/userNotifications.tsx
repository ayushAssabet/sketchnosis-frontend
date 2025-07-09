import { Button } from "@/components/ui/button"
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuGroup, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { BellIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const UserNotifications : React.FC = () => {
    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    className="relative h-8 w-8 rounded-full"
                >
                    <BellIcon className="w-[1.2rem] h-[1.2rem]"/>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-80" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">Notifications</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem className="hover:cursor-pointer" asChild>
                        <p>Notification</p>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href="#">
                            <div className="flex gap-2">
                                <div className="w-[35px] h-[35px]  relative">
                                    <Image src="https://smarthr.dreamstechnologies.com/laravel/template/public/build/img/profiles/avatar-27.jpg" 
                                    alt="Profile" fill className="aspect-square rounded-full"/>
                                </div>
                                <div className="flex-1">
                                    <p className="mb-1"><span className="text-dark font-semibold">Ayush </span>
                                        performance in Math is below the threshold.
                                    </p>
                                    <span className="text-xs text-right block">Just Now</span>
                                </div>
                            </div>
                        </Link>
                    </DropdownMenuItem>
                    
                </DropdownMenuGroup>
                
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserNotifications