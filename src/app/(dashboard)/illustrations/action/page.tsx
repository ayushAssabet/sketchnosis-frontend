import IllustrationActionContent from "./_partials/IllustrationActionContent";

export async function generateMetadata({
    searchParams,
}: {
    searchParams: { update?: string };
}) {
    const isUpdate = searchParams?.update != null && searchParams.update !== "";
    return {
        title: isUpdate ? "UPDATE Illustration" : "ADD Illustration",
    };
}

const IllustrationActionIndexPage : React.FC = () => {
    return (
        <>
            <IllustrationActionContent />
        </>
    );
};

export default IllustrationActionIndexPage ;
