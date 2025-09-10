import AdminUserContent from "./_partials/AdminUserContent";

export async function generateMetadata() {
    return {
        title: "Admin Management",
    };
}

const AdminManagementIndexPage: React.FC = () => {
    return (
        <>
            <AdminUserContent />
        </>
    );
};

export default AdminManagementIndexPage;
