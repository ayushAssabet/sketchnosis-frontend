import { IllustrationAvatarWrapper } from "./IllustrationAvatarWrapper"

const IllustrationList = ({
    illustrationList
} : {
    illustrationList : Array<Record<string,any>>
}) => {
    console.log(illustrationList)
    return(
        <div className="mt-12">   
            <h3 className="text-primary mb-6 font-semibold">Assigned Illustrations</h3>
            <div className="grid grid-cols-5 gap-4">
                {
                    illustrationList?.map((illustration) => {
                        return(
                            <IllustrationAvatarWrapper 
                                fileUrl={illustration?.illustration?.fileUrl}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default IllustrationList