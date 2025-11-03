import React, { Fragment, useState, useCallback } from "react";
import Datatable from "../../../components/datatables/Datatable";
import { Box, Button, Chip, IconButton, Tooltip } from "@mui/material";
import { Icon } from "@mdi/react";
import { mdiDelete, mdiEye, mdiPencil } from "@mdi/js";
import { useFetcPermissions } from "./query/useFetchPermissions";
import MediumModal from "../../../components/common/modals/MediumModal";
import RolePermissions from "./rolePermissions/RolePermissions";
import { ROLES } from "../../../utils/queryKeys";
import CreateUpdateRole from "./CreateUpdateRole";
import { ConfirmDialog } from "../../../components/common/ConfirmDialog";
import useRolesMutation from "./mutation/useRolesMutation";
import CustomGlobalSnackbar from "../../../components/common/CustomGlobalSnackbar";

export default function UserRoles() {
  const { data: permissions } = useFetcPermissions();
  const { deleteRoleMutation } = useRolesMutation();
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
                onClick={() => handleOpenModal("view", row)}
              >
                <Icon path={mdiEye} size={1} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit Role">
              <IconButton
                color="secondary"
                onClick={() => handleOpenModal("update", row)}
              >
                <Icon path={mdiPencil} size={1} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete Role">
              <IconButton
                color="error"
                loading={
                  deleteRoleMutation.isPending && openModal.data?.id === row?.id
                }
                onClick={() => handleDelete(row)}
              >
                <Icon path={mdiDelete} size={1} />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
  ];

  const handleOpenModal = useCallback((type, data) => {
    console.log(type, data);
    setOpenModal({ type, data });
  }, []);

  const handleCloseModal = useCallback(() => {
    setOpenModal({ type: "", data: null });
  }, []);

  const handleDelete = (row) => {
    console.log(row);
    handleOpenModal("delete", row);
  };

  const confirmDelete = useCallback(() => {
    console.log("confirm delete", openModal.data);
    deleteRoleMutation.mutate(openModal.data, {
      onSuccess: () => handleCloseModal(),
    });
  }, [openModal]);

  return (
    <Fragment>
      <ConfirmDialog
        open={openModal.type === "delete"}
        title="Delete role?"
        content="Do you wish to delete this role?"
        handleClose={handleCloseModal}
        onConfirm={confirmDelete}
        loading={deleteRoleMutation.isPending}
      />
      <CustomGlobalSnackbar />
      <MediumModal
        title={openModal?.data?.name}
        open={!!openModal.type && openModal.type !== "delete"}
        handleClose={handleCloseModal}
      >
        {openModal.type === "view" ? (
          <RolePermissions
            permissions={permissions}
            data={openModal.data}
            handleClose={handleCloseModal}
          />
        ) : openModal.type === "create" || openModal.type === "update" ? (
          <CreateUpdateRole
            data={openModal.data}
            handleCloseModal={handleCloseModal}
          />
        ) : null}
      </MediumModal>
      <Box sx={{ mb: 1, display: "flex", gap: 1, justifyContent: "flex-end" }}>
        <Button
          variant="outlined"
          onClick={() => handleOpenModal("create", { name: "create role" })}
        >
          Add Roles
        </Button>
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
