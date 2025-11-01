import React, { Fragment, useState, useCallback } from "react";
import Datatable from "../../../components/datatables/Datatable";
import { Box, Button, Chip, IconButton, Tooltip } from "@mui/material";
import { Icon } from "@mdi/react";
import { mdiDelete, mdiEye, mdiPencil } from "@mdi/js";
import { useFetcPermissions } from "./query/useFetchPermissions";
import MediumModal from "../../../components/common/modals/MediumModal";
import RolePermissions from "./rolePermissions/RolePermissions";
import { ROLES } from "../../../utils/queryKeys";

export default function UserRoles() {
  const { data: permissions } = useFetcPermissions();
  const [openModal, setOpenModal] = useState({
    type: "",
    data: null,
  });
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
      field: "permissions",
      headerName: "Assigned Permissions",
      flex: 2,
      renderCell: (params) => {
        const permissions = params?.value || [];
        return (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 0.5,
              alignItems: "center",
              p: 1,
            }}
          >
            {permissions?.slice(0, 3)?.map((p, idx) => (
              <Chip key={idx} label={p?.name} size="small" color="primary" />
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
    // {
    //   field: "users_count",
    //   headerName: "Users Assigned",
    //   flex: 0.8,
    //   align: "center",
    //   renderCell: (params) => (
    //     <Chip
    //       label={params.value || 0}
    //       color="secondary"
    //       variant="outlined"
    //       size="small"
    //     />
    //   ),
    // },
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
          <Box
            sx={{
              display: "flex",
              gap: 1,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Tooltip title="View Role Details">
              <IconButton
                color="primary"
                onClick={() => handleOpenModal({ type: "view", data: row })}
              >
                <Icon path={mdiEye} size={1} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit Role">
              <IconButton color="secondary" onClick={() => handleEdit(row)}>
                <Icon path={mdiPencil} size={1} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete Role">
              <IconButton color="error" onClick={() => handleDelete(row)}>
                <Icon path={mdiDelete} size={1} />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
  ];

  const handleOpenModal = useCallback(({ type, data }) => {
    setOpenModal({ type, data });
  }, []);

  const handleCloseModal = useCallback(() => {
    setOpenModal({ type: "", data: null });
  }, []);
  const handleEdit = (row) => {
    console.log(row);
  };
  const handleDelete = (row) => {
    console.log(row);
  };

  return (
    <Fragment>
      <MediumModal
        title={openModal?.data?.name}
        open={!!openModal.data}
        handleClose={handleCloseModal}
      >
        {openModal.type === "view" && (
          <RolePermissions permissions={permissions} />
        )}
      </MediumModal>
      <Box sx={{ mb: 1, display: "flex", gap: 1, justifyContent: "flex-end" }}>
        <Button variant="outlined">Add Roles</Button>
        <Button variant="outlined">Add Permission</Button>
      </Box>
      <Box>
        <Datatable
          apiLink="/api/v1/roles"
          customColumns={columnHeader}
          exportFileName=""
          queryKey={ROLES}
        />
      </Box>
    </Fragment>
  );
}
