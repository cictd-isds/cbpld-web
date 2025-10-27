import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import { routeList } from "./routeList";

export default function RouteProvider() {
  const router = createBrowserRouter(routeList);
  return <RouterProvider router={router} />;
}
