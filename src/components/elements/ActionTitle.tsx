const ActionTitle : React.FC<{
    title : string
}> = ({
    title
}) => {
    return(
        <h2 className="pb-3 text-primary border-b border-gray-200 font-medium text-xl">{title}</h2>
    )
}

export default ActionTitle