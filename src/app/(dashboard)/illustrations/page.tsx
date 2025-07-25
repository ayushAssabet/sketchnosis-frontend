import IllustrationContent from "./_partials/IllustrationsProviderWrapper";

export async function generateMetadata() {
    return {
        title: "Illustrations List",
    };
}

const IllustrationIndexPage: React.FC = () => {
    return (
        <>
            <IllustrationContent />
        </>
    );
};

export default IllustrationIndexPage;
