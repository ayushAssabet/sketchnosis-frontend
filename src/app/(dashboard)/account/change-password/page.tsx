import ChangePasswordContent from "./_partials/ChangePasswordContent";

export async function generateMetadata() {
    return {
        title: "Change Password",
    };
}

const ChangePasswordIndexPage: React.FC = () => {
    return (
        <>
            <ChangePasswordContent />
        </>
    );
};

export default ChangePasswordIndexPage;
