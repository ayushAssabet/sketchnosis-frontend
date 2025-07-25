const CommonContainer  :React.FC<{
    children  : React.ReactNode , 
    title : string
}> = ({
    children ,
    title
}) => {
    return(
        <section id={title} className="p-5 pb-24">
            <div className="bg-white w-full rounded-2xl min-h-[80vh] p-5 max-w-[95%] mx-auto">
                {children}
            </div>
        </section>
    )
}

export default CommonContainer