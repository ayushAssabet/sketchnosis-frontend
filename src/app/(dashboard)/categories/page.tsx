import CategoryContent from "./_partials/elements/CategoryContent";

export async function generateMetadata() {
    return {
        title: "Area of Concern List",
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
