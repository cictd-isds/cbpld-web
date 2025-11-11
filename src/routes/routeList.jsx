import Profile from "../pages/private/profile";
import Register from "../pages/public/Register";
import Verify from "../pages/public/Verify";
import PrivateRoute from "./PrivateRoute";
import Layout from "../pages/private/Layout";
import { projRoutes } from "./projRoutes";
import UserRoles from "../pages/private/roles/UserRoles";
import Icon from "@mdi/react";
import { mdiAccountGroup, mdiAccount, mdiAccountKey } from "@mdi/js";
import { hrisRoutes } from "./hrisRoutes";
import PublicLayout from "../pages/public/PublicLayout";
import UserManagement from "../pages/private/user_management/UserManagement";

const publicRoutes = [
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        path: "reset-password",
      },
    ],
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "verify-email",
    element: <Verify />,
  },
];

const privateRoutes = [
  {
    path: "home",
    element: <Layout />,
    children: [
      { element: <UserRoles />, index: true },
      {
        path: "user-roles",
        name: "User Roles",
        element: <UserRoles />,
        parent: true,
        icon: <Icon path={mdiAccountKey} size={1} />,
      },
      {
        path: "user-management",
        element: <UserManagement />,
        parent: true,
        icon: <Icon path={mdiAccountGroup} size={1} />,
        name: "User Management",
      },
      {
        path: "profile",
        element: <Profile />,
        hidden: true,
        name: "Profle",
        icon: <Icon path={mdiAccount} size={1} />,
      },
      ...projRoutes,
      ...hrisRoutes,
    ],
  },
];

const privateRouteWrapper = (router) => {
  return router?.map((route) => ({
    ...route,
    element: route?.element ? (
      <PrivateRoute>{route.element}</PrivateRoute>
    ) : null,
    children: route?.children?.length
      ? privateRouteWrapper(route.children)
      : null,
  }));
};

const removeElementOnRoutes = (router) => {
  return router?.map((route) => ({
    ...route,
    element: null,
    children: route?.children?.length
      ? removeElementOnRoutes(route.children)
      : null,
  }));
};
export const allRoutes = removeElementOnRoutes([...privateRoutes[0].children]);

export const routeList = [
  ...publicRoutes,
  ...privateRouteWrapper(privateRoutes),
];
