import { title } from "process"
import ChangePasswordContent from "./_partials/ChangePasswordContent"

const ChangePasswordIndexPage  :React.FC = async ({searchParams} : {searchParams : any}) => {
    const params = console.log(await searchParams)
    return(
        <>
            <title>SKECHNOSIS | {title ?? 'CHANGE PASSWORD'}</title>
            <ChangePasswordContent />
        </>
    )
}

export default ChangePasswordIndexPage