import Icon from "@mdi/react";
import {
  mdiDomain,
  mdiHomeSearch,
  mdiViewDashboardVariantOutline,
} from "@mdi/js";
import BIVSLayout from "../pages/private/bivs/BIVSLayout";
import Dashboard from "../pages/private/bivs/dashboard_page";
import PDMD from "../pages/private/bivs/PDMD";
import Review_inspection from "../pages/private/bivs/PDMD/Review_inspection";

export const bivsRoutes = [
  {
    path: "bivs",
    name: "Butuan Inspection & Verification System",
    element: <BIVSLayout />,
    icon: <Icon path={mdiDomain} size={1} />,
    children: [
      {
        element: <Dashboard />,
        index: true,
      },
      {
        name: "Dashboard",
        element: <Dashboard />,
        path: "dashboard",
        icon: <Icon path={mdiViewDashboardVariantOutline} size={1} />,
      },
      {
        name: "PDMD",
        element: <PDMD />,
        path: "pdmd",
        icon: <Icon path={mdiHomeSearch} size={1} />,
      },
      {
        name: "Inspection Review",
        element: <Review_inspection />,
        path: "pdmd/:transactionId/:inspectorName/:violationStatus/:inspectDate",
        // icon: <Icon path={mdiHomeSearch} size={1} />, // no icon
        hidden: true,
      },
    ],
  },
];
