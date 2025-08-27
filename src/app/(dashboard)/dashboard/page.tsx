import DashboardContent from "./_partials/DashboardContent";



export async function generateMetadata() {
  return {
    title: "Dashboard",
  };
}

const DashboardIndexPage: React.FC = () => {
  return (
    <>
      <DashboardContent />
    </>
  );
};



export default DashboardIndexPage;
