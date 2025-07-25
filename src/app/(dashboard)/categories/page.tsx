import CategoryContent from "./_partials/elements/CategoryContent";

export async function generateMetadata() {
    return {
        title: "Category List",
    };
}

const CategoryIndexPage: React.FC = () => {
    return (
        <>
            <CategoryContent />
        </>
    );
};

export default CategoryIndexPage;
