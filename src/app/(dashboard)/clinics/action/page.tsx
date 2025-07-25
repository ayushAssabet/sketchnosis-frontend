import { PageProps } from "@/utils/type";
import ClinicActionContent from "./_partials/ClinicActionContent";

export async function generateMetadata({ searchParams }: PageProps) {
    const resolvedSearchParams = await searchParams;
    const isUpdate =
        resolvedSearchParams?.update != null &&
        resolvedSearchParams.update !== "";

    return {
        title: isUpdate ? "UPDATE CLINIC" : "ADD CLINIC",
    };
}

const ClinicActions: React.FC = () => {
    return (
        <>
            <ClinicActionContent />
        </>
    );
};

export default ClinicActions;
