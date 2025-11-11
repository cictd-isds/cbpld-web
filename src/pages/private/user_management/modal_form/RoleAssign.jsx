import {
  Box,
  Button,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import useUserRolesMutation from "../mutation/useUserRolesMutation";

function RoleAssign({ roles, data, handleClose }) {
  const { updateUserRoleMutation } = useUserRolesMutation();

  // 🟩 Extract the current roles assigned to the user
  const [selectedRoles, setSelectedRoles] = useState([]);

  useEffect(() => {
    const assignedRoles = data?.roles?.map((r) => r.name) || [];
    setSelectedRoles(assignedRoles);
  }, [data]);

  // 🟩 Handle role checkbox change
  const handleToggleRole = (roleName) => {
    setSelectedRoles((prev) =>
      prev.includes(roleName)
        ? prev.filter((r) => r !== roleName)
        : [...prev, roleName]
    );
  };

  // 🟩 Handle save (example)
  const handleUpdateRolePermissions = () => {
    const payload = {
      userID: data?.id,
      updatePayload: { roles: selectedRoles },
      // deletePayload: { roles: unselectedRoles },
    };
    console.log(payload);
    updateUserRoleMutation.mutate(payload, {
      onSuccess: () => handleClose(),
    });
  };

  return (
    <Box width={{ md: 600, sm: 300, lg: 800 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Assign Roles
      </Typography>

      {/* 🟩 Display all roles */}
      <FormGroup>
        {roles?.data?.map((role) => (
          <FormControlLabel
            key={role.id}
            control={
              <Checkbox
                checked={selectedRoles.includes(role.name)}
                onChange={() => handleToggleRole(role.name)}
              />
            }
            label={role.name}
          />
        ))}
      </FormGroup>

      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Button
          variant="contained"
          color="warning"
          loading={updateUserRoleMutation.isPending}
          onClick={handleUpdateRolePermissions}
        >
          Update Roles
        </Button>
      </Box>
    </Box>
  );
}

export default React.memo(RoleAssign);
