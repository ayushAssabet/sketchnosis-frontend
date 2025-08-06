import PatientListContent from "./_partials/PatientsListContent";

export async function generateMetadata() {
    return {
        title: "Patient List",
    };
}

const PatientIndexpage: React.FC = () => {
    return (
        <>
            <PatientListContent />
        </>
    );
};

export default PatientIndexpage;
