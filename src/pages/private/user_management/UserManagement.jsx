import React, { Fragment, useState, useCallback } from "react";
import Datatable from "../../../components/datatables/Datatable";
import { Box, Button, Chip, IconButton, Tooltip } from "@mui/material";
import { Icon } from "@mdi/react";
import { mdiDelete, mdiEye, mdiLockReset, mdiPencil } from "@mdi/js";
import MediumModal from "../../../components/common/modals/MediumModal";
import RoleAssign from "./modal_form/RoleAssign";
import { USER_ROLES } from "../../../utils/queryKeys";
import { ConfirmDialog } from "../../../components/common/ConfirmDialog";
import useFetchRoles from "./query/useFetchRoles";
import RegisterUser from "./modal_form/RegisterUser";
import UpdateUser from "./modal_form/UpdateUser";
import useUserManagement from "./mutation/useUserManagement";

export default function UserManagement() {
  const { userDeleteMutation, userForgotPassMutation } = useUserManagement();

  const DIALOGDEFINE = {
    delete: {
      title: "Delete user?",
      content: "Do you wish to delete this user?",
      onConfirm: () => {
        userDeleteMutation.mutate(openModal.data.id, {
          onSuccess: handleCloseModal,
        });
      },
      isPending: userDeleteMutation.isPending,
    },
    forgotpass: {
      title: "Force forgot password",
      content: "Do you wish to send email to this user?",
      onConfirm: () => {
        userForgotPassMutation.mutate(openModal.data.id, {
          onSuccess: handleCloseModal,
        });
      },
      isPending: userForgotPassMutation.isPending,
    },
  };

  const { data: roles } = useFetchRoles();
  const [openModal, setOpenModal] = useState({
    type: "",
    data: null,
  });
  const columnHeader = [
    // {
    //   field: "id",
    //   headerName: "ID",
    //   flex: 0.5,
    // },
    {
      field: "name",
      headerName: "User",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "roles",
      headerName: "Roles",
      flex: 1,
      renderCell: (params) => {
        const roles = params?.value || [];
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
            {roles?.slice(0, 3)?.map((p, idx) => (
              <Chip key={idx} label={p?.name} size="small" color="primary" />
            ))}
            {roles.length > 3 && (
              <Chip
                label={`+${roles.length - 3} more`}
                size="small"
                variant="outlined"
              />
            )}
          </Box>
        );
      },
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
      minWidth: 220,
      flex: 0,
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
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Tooltip title="View User Role">
              <IconButton
                color="primary"
                onClick={() => handleOpenModal("view", row)}
              >
                <Icon path={mdiEye} size={1} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit User">
              <IconButton
                color="secondary"
                onClick={() => handleOpenModal("update", row)}
              >
                <Icon path={mdiPencil} size={1} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Force forgot password">
              <IconButton
                color="error"
                loading={
                  userForgotPassMutation.isPending &&
                  openModal.data?.id === row?.id
                }
                onClick={() => handleDialog(row, "forgotpass")}
              >
                <Icon path={mdiLockReset} size={1} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete User">
              <IconButton
                color="error"
                loading={
                  userDeleteMutation.isPending && openModal.data?.id === row?.id
                }
                onClick={() => handleDialog(row, "delete")}
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

  const handleDialog = (row, type) => {
    handleOpenModal(type, row);
  };

  const dialog = DIALOGDEFINE[openModal.type];

  return (
    <Fragment>
      {dialog && (
        <ConfirmDialog
          open={Boolean(openModal.type)}
          title={dialog.title}
          content={dialog.content}
          handleClose={handleCloseModal}
          onConfirm={dialog.onConfirm}
          loading={dialog.isPending}
        />
      )}
      <MediumModal
        title={openModal?.data?.name}
        open={!!openModal.type && !DIALOGDEFINE?.[openModal.type]}
        handleClose={handleCloseModal}
      >
        {openModal.type === "view" ? (
          <RoleAssign
            roles={roles}
            data={openModal.data}
            handleClose={handleCloseModal}
          />
        ) : openModal.type === "create" ? (
          <RegisterUser
            data={openModal.data}
            handleCloseModal={handleCloseModal}
          />
        ) : (
          openModal.type === "update" && (
            <UpdateUser
              data={openModal.data}
              handleCloseModal={handleCloseModal}
            />
          )
        )}
      </MediumModal>
      <Box sx={{ mb: 1, display: "flex", gap: 1, justifyContent: "flex-end" }}>
        <Button
          variant="outlined"
          onClick={() => handleOpenModal("create", { name: "create role" })}
        >
          Add User
        </Button>
      </Box>
      <Box>
        <Datatable
          apiLink="/api/v1/users"
          customColumns={columnHeader}
          exportFileName=""
          queryKey={USER_ROLES}
        />
      </Box>
    </Fragment>
  );
}
