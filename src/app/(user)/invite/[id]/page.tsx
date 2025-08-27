import { use } from "react"
import HealthCampaignInvite from "./_partials/InviteContent"

const UserInviteIndexPage = ({params}) => {

    const searchParams : Record<string,any> = use(params)

    return(
        <HealthCampaignInvite campaingInviteId={searchParams?.id}/>
    )
}

export default UserInviteIndexPage