import AccessManagement from "./_partials/AccessContent";

export async function generateMetadata() {
    return {
        title: "Access Management",
    };
}

const AccessManagementIndexPage: React.FC = () => {
    return (
        <>
            <AccessManagement />
        </>
    );
};

export default AccessManagementIndexPage;
