import { PageProps } from "@/utils/type";
import PatientActionContent from "./_partials/PatientActionContent";

export async function generateMetadata({ searchParams }: PageProps) {
    const resolvedSearchParams = await searchParams;
    const isUpdate =
        resolvedSearchParams?.update != null &&
        resolvedSearchParams.update !== "";

    return {
        title: isUpdate ? "UPDATE PATIENT" : "ADD PATIENT",
    };
}

const PatientActions: React.FC = () => {
    return (
        <>
            <PatientActionContent />
        </>
    );
};

export default PatientActions;
