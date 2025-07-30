import CommonContainer from "@/components/elements/CommonContainer";
import { appRoutes } from "@/lib/routes";
import PrivateView from "@/views/PrivateView";

const DashboardIndexPage: React.FC = () => {
  return (
    <>
      <PrivateView
        title="Dashboard"
        breadCrumbItems={[
          {
            title: "Dashboard",
            href: appRoutes.DASHBOARD_INDEX_PAGE,
          },
        ]}
      >
        <CommonContainer title="clinic-list-section">
          Dashboard-sketchnosis comming
        </CommonContainer>
      </PrivateView>
    </>
  );
};

export default DashboardIndexPage;
