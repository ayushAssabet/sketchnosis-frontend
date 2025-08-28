import { permissions } from "@/utils/permissions";
import { appRoutes } from "./routes";

export const routePermissions: { [key: string]: string[] } = {
  [appRoutes.DASHBOARD_INDEX_PAGE]: [],

  [appRoutes.CATEGORY_INDEX_PAGE]: [permissions.VIEW_CATEGORY],
  [appRoutes.CLINIC_INDEX_PAGE]: [permissions.VIEW_CLINIC],
  [appRoutes.PATIENT_INDEX_PAGE]: [permissions.VIEW_PATIENT],
  [appRoutes.CAMPAIGN_INDEX_PAGE]: [permissions.VIEW_CAMPAIGN],
  [appRoutes.ILLUSTRATIONS_INDEX_PAGE]: [permissions.VIEW_ILLUSTRATION],
  [appRoutes.PERMISSION_MANAGEMENT_INDEX_PAGE]: [permissions.VIEW_ADMIN],

  // detail pages
  [appRoutes.CLINIC_INDIVIDUAL_PAGE]: [permissions.VIEW_CLINIC],
  [appRoutes.CAMPAIGN_INDIVIDUAL_PAGE]: [permissions.VIEW_CAMPAIGN],
  [appRoutes.PATIENT_DETAIL_PAGE]: [permissions.VIEW_PATIENT],

  // action pages
  [appRoutes.CLINIC_ACTION_PAGE]: [permissions.ADD_CLINIC],
  [appRoutes.CAMPAIGN_ACTION_PAGE]: [permissions.ADD_CAMPAIGN],
  [appRoutes.PATIENT_ACTION_PAGE]: [permissions.ADD_PATIENT],
  [appRoutes.ILLUSTRATIONS_ACTION_PAGE]: [permissions.ADD_ILLUSTRATION],
};