import Icon from "@mdi/react";
import {
  mdiCalendarAccountOutline,
  mdiCalendarBlankMultiple,
  mdiFileTree,
  mdiHumanQueue,
  mdiListStatus,
  mdiNumeric2,
  mdiNumeric3,
  mdiNumeric4,
} from "@mdi/js";
import Tasks from "../pages/private/project_management/tasks/Tasks";
import ProjectManagementLayout from "../pages/private/project_management/ProjectManagementLayout";

export const hrisRoutes = [
  {
    path: "hris",
    name: "HRIS",
    element: <ProjectManagementLayout />,
    icon: <Icon path={mdiHumanQueue} size={1} />,
    children: [
      {
        element: <Tasks />,
        index: true,
      },
      {
        name: "Work Schedule",
        element: <Tasks />,
        path: "work-schdule",
        icon: <Icon path={mdiCalendarBlankMultiple} size={1} />,
        children: [
          {
            name: "level 1 ccccccccccc",
            element: <Tasks />,
            path: "level2",
            icon: <Icon path={mdiCalendarAccountOutline} size={1} />,
            children: [
              {
                name: "level 2 xxxxxxxxxxxxxxxxxxxx",
                element: <Tasks />,
                path: "level2",
                icon: <Icon path={mdiNumeric2} size={1} />,
              },
              {
                name: "level 2xcxcxc",
                element: <Tasks />,
                path: "level2xxx",
                icon: <Icon path={mdiNumeric2} size={1} />,
                children: [
                  {
                    name: "level 3",
                    element: <Tasks />,
                    path: "level3",
                    icon: <Icon path={mdiNumeric3} size={1} />,
                  },
                  {
                    name: "level 3xx",
                    element: <Tasks />,
                    path: "level3xx",
                    icon: <Icon path={mdiNumeric3} size={1} />,
                    children: [
                      {
                        name: "level 4",
                        element: <Tasks />,
                        path: "level4",
                        icon: <Icon path={mdiNumeric4} size={1} />,
                      },
                      {
                        name: "level 4xx",
                        element: <Tasks />,
                        path: "level4xx",
                        icon: <Icon path={mdiNumeric4} size={1} />,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "level2.2",
            element: <Tasks />,
            path: "level2.2",
            icon: <Icon path={mdiListStatus} size={1} />,
          },
        ],
      },
    ],
  },
];
