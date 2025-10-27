import Icon from "@mdi/react";
import { mdiFileTree, mdiListStatus } from "@mdi/js";
import Tasks from "../pages/private/project_management/tasks/Tasks";
import ProjectManagementLayout from "../pages/private/project_management/ProjectManagementLayout";

export const projRoutes = [
  {
    path: "project-management",
    name: "Project Management",
    element: <ProjectManagementLayout />,
    icon: <Icon path={mdiFileTree} size={1} />,
    children: [
      {
        element: <Tasks />,
        index: true,
      },
      {
        name: "Tasks",
        element: <Tasks />,
        path: "tasks",
        icon: <Icon path={mdiListStatus} size={1} />,
      },
    ],
  },
];
