import { Typography } from "@mui/material";
import React from "react";
import { Outlet } from "react-router";

export default function ProjectManagementLayout() {
  return (
    <>
      <Typography>Project management</Typography>
      <Outlet />
    </>
  );
}
