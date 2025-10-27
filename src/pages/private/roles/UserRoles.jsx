import React, { Fragment } from "react";
import Datatable from "../../../components/datatables/Datatable";
import { Box, Button, Chip, Icon, Tooltip } from "@mui/material";
import { mdiDelete, mdiEye, mdiPencil } from "@mdi/js";

export default function UserRoles() {
  const columnHeader = [
    {
      field: "id",
      headerName: "Role ID",
      flex: 0.5,
    },
    {
      field: "name",
      headerName: "Role Name",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1.5,
      renderCell: (params) => (
        <Box
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "100%",
          }}
        >
          {params.value || "-"}
        </Box>
      ),
    },
    {
      field: "permissions",
      headerName: "Assigned Permissions",
      flex: 2,
      renderCell: (params) => {
        const permissions = params?.value || [];
        return (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {permissions.slice(0, 3).map((p, idx) => (
              <Chip key={idx} label={p} size="small" color="primary" />
            ))}
            {permissions.length > 3 && (
              <Chip
                label={`+${permissions.length - 3} more`}
                size="small"
                variant="outlined"
              />
            )}
          </Box>
        );
      },
    },
    {
      field: "users_count",
      headerName: "Users Assigned",
      flex: 0.8,
      align: "center",
      renderCell: (params) => (
        <Chip
          label={params.value || 0}
          color="secondary"
          variant="outlined"
          size="small"
        />
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.7,
      renderCell: (params) => {
        const color =
          params.value === "Active"
            ? "success"
            : params.value === "Inactive"
            ? "warning"
            : "default";
        return <Chip label={params.value} color={color} size="small" />;
      },
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
              <Tooltip title="View Role Details">
                <Button
                  size="small"
                  color="info"
                  variant="contained"
                  onClick={() => handleView(row)}
                >
                  <Icon path={mdiEye} size={0.8} />
                </Button>
              </Tooltip>
              <Tooltip title="Edit Role">
                <Button
                  size="small"
                  color="secondary"
                  variant="contained"
                  onClick={() => handleEdit(row)}
                >
                  <Icon path={mdiPencil} size={0.8} />
                </Button>
              </Tooltip>
              <Tooltip title="Delete Role">
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
      <Box sx={{ mb: 1, display: "flex", gap: 1, justifyContent: "flex-end" }}>
        <Button variant="outlined">Add Roles</Button>
        <Button variant="outlined">Add Permission</Button>
      </Box>
      <Box>
        <Datatable
          apiLink=""
          customColumns={columnHeader}
          columnGroupingModel={CustomColumnGroupingModel}
          exportFileName=""
        />
      </Box>
    </Fragment>
  );
}
