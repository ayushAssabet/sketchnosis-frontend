import ClinicActionContent from "./_partials/ClinicActionContent";

export async function generateMetadata({
    searchParams,
}: {
    searchParams: { update?: string };
}) {
    const isUpdate = searchParams?.update != null && searchParams.update !== "";
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
