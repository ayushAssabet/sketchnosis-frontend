import { PageProps } from "@/utils/type";
import IllustrationActionContent from "./_partials/IllustrationActionContent";

export async function generateMetadata({ searchParams }: PageProps) {
    const resolvedSearchParams = await searchParams;
    const isUpdate =
        resolvedSearchParams?.update != null &&
        resolvedSearchParams.update !== "";

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
