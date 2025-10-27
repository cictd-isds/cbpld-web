import React, { Fragment } from "react";
import { Outlet } from "react-router";
import Datatable from "../../../components/datatables/Datatable";
import { Box, Button, Icon, Tooltip } from "@mui/material";
import { mdiDelete, mdiEye, mdiPencil } from "@mdi/js";

function UserManagement() {
  const columnHeader = [
    {
      field: "employee_id",
      headerName: "Employee ID",
      flex: 0.8,
    },
    {
      field: "name",
      headerName: "Full Name",
      flex: 1.2,
    },
    {
      field: "email",
      headerName: "Email Address",
      flex: 1.3,
    },
    {
      field: "user_role",
      headerName: "Role",
      flex: 0.8,
    },
    {
      field: "department",
      headerName: "Department",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.7,
      renderCell: (params) => {
        const status = params.value;
        const color =
          status === "Active"
            ? "green"
            : status === "Suspended"
            ? "orange"
            : "gray";
        return (
          <Box
            sx={{
              color,
              fontWeight: 600,
              textTransform: "capitalize",
            }}
          >
            {status}
          </Box>
        );
      },
    },
    {
      field: "last_login",
      headerName: "Last Login",
      flex: 1,
      valueFormatter: (params) =>
        params?.value
          ? new Date(params.value).toLocaleString()
          : "Never logged in",
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      headerAlign: "center",
      align: "center",
      sortable: false,
      renderCell: (params) => {
        const row = params?.row;
        return (
          <Fragment>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Tooltip title="View Details">
                <Button
                  size="small"
                  color="info"
                  variant="contained"
                  onClick={() => handleView(row)}
                >
                  <Icon path={mdiEye} size={0.8} />
                </Button>
              </Tooltip>
              <Tooltip title="Edit User">
                <Button
                  size="small"
                  color="secondary"
                  variant="contained"
                  onClick={() => handleEdit(row)}
                >
                  <Icon path={mdiPencil} size={0.8} />
                </Button>
              </Tooltip>
              <Tooltip title="Delete User">
                <Button
                  size="small"
                  color="error"
                  variant="contained"
                  onClick={() => handleDelete(row)}
                >
                  <Icon path={mdiDelete} size={0.8} />
                </Button>
              </Tooltip>
            </Box>
          </Fragment>
        );
      },
    },
  ];

  const CustomColumnGroupingModel = [
    // {
    //   groupId: "info",
    //   headerName: "User Info",
    //   headerAlign: "center",
    //   description: "",
    //   align: "center",
    //   children: [
    //     { field: "name" },
    //     { field: "email" },
    //     { field: "user_role" },
    //     {
    //       field: "status",
    //     },
    //   ],
    // },
  ];

  const handleView = (row) => {
    console.log(row);
  };
  const handleEdit = (row) => {
    console.log(row);
  };
  const handleDelete = (row) => {
    console.log(row);
  };

  return (
    <Fragment>
      <Box></Box>
      <Box>
        <Datatable
          apiLink="/api/users"
          customColumns={columnHeader}
          columnGroupingModel={CustomColumnGroupingModel}
          exportFileName=""
        />
      </Box>
    </Fragment>
    // <div>
    //   <h1>
    //     User Management Lorem ipsum dolor sit amet, consectetur adipiscing elit,
    //     sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
    //     enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
    //     aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
    //     in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    //     Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
    //     officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet,
    //     consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
    //     et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
    //     exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    //     Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
    //     dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
    //     proident, sunt in culpa qui officia deserunt mollit anim id est
    //     laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    //     eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
    //     minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
    //     ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
    //     voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
    //     sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
    //     mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur
    //     adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
    //     magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
    //     laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
    //     in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
    //     pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
    //     qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit
    //     amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
    //     labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
    //     exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    //     Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
    //     dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
    //     proident, sunt in culpa qui officia deserunt mollit anim id est
    //     laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    //     eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
    //     minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
    //     ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
    //     voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
    //     sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
    //     mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur
    //     adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
    //     magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
    //     laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
    //     in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
    //     pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
    //     qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit
    //     amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
    //     labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
    //     exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    //     Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
    //     dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
    //     proident, sunt in culpa qui officia deserunt mollit anim id est
    //     laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    //     eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
    //     minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
    //     ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
    //     voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
    //     sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
    //     mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur
    //     adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
    //     magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
    //     laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
    //     in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
    //     pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
    //     qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit
    //     amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
    //     labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
    //     exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    //     Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
    //     dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
    //     proident, sunt in culpa qui officia deserunt mollit anim id est
    //     laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    //     eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
    //     minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
    //     ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
    //     voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
    //     sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
    //     mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur
    //     adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
    //     magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
    //     laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
    //     in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
    //     pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
    //     qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit
    //     amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
    //     labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
    //     exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    //     Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
    //     dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
    //     proident, sunt in culpa qui officia deserunt mollit anim id est
    //     laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    //     eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
    //     minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
    //     ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
    //     voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
    //     sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
    //     mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur
    //     adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
    //     magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
    //     laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
    //     in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
    //     pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
    //     qui officia deserunt mollit anim id est laborum.
    //   </h1>
    //   <Outlet />
    // </div>
  );
}

export default UserManagement;
