import ProfileContent from "./_partials/ProfileContent";

export async function generateMetadata() {
    return {
        title: "User Profile",
    };
}

const UserProfileIndexPage: React.FC = () => {
    return (
        <>
            <ProfileContent />
        </>
    );
};

export default UserProfileIndexPage;
