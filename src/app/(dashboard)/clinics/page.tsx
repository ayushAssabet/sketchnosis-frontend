import ClinicContent from "./_partials/ClinicContent";

export async function generateMetadata() {
    return {
        title: "Clinic List",
    };
}

const CategoryIndexPage: React.FC = () => {
    return (
        <>
            <ClinicContent />
        </>
    );
};

export default CategoryIndexPage;
