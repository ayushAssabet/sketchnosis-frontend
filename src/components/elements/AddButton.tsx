import Link from "next/link"
import { Button } from "../ui/button"
import { Plus } from "lucide-react"

const AppAddButton  :React.FC<{
    href? : string , 
    title : string
    onClick? : () => void
}> = ({
    href , 
    title,
    onClick
}) => {
    return(
        href ? 
        <Link href={href}>
            <Button className="cursor-pointer !text-sm">
                <Plus />
                {title}
            </Button>
        </Link>
        :
        <Button className="cursor-pointer !text-sm" type={'button'} onClick={onClick}>
            <Plus />
            {title}
        </Button>

    )
}

export default AppAddButton