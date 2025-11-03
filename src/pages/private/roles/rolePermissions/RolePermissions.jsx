import { Alert, Box, Button, Snackbar, Typography } from "@mui/material";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import useRolesMutation from "../mutation/useRolesMutation";

function RolePermissions({ permissions, data, handleClose }) {
  const { updateRoleMutation } = useRolesMutation();
  const transformPerm = useMemo(() => {
    const root = [];
    permissions.forEach(({ name }) => {
      const parts = name.split(".");
      const action = parts.pop(); // last part is the permission (view, edit, etc.)
      let currentLevel = root;

      parts.forEach((part, idx) => {
        const moduleName = part;

        // find existing module
        let existing = currentLevel.find((m) => m.module === moduleName);
        if (!existing) {
          existing = { module: moduleName, perms: [], children: [] };
          currentLevel.push(existing);
        }

        // if it's the last module before the permission, add the perm
        if (idx === parts.length - 1) {
          if (!existing.perms.includes(action)) existing.perms.push(action);
        }

        // move deeper for next iteration
        currentLevel = existing.children;
      });
    });

    return root;
  }, [permissions]);

  const [permState, setPermState] = useState([]);
  const [open, setOpen] = useState({});

  const onToggle = useCallback((name) => {
    setOpen((prev) => ({ ...prev, [name]: !prev[name] }));
  }, []);

  const onChangePerm = useCallback((perm) => {
    setPermState((prev) =>
      prev.includes(perm) ? prev.filter((a) => a !== perm) : [...prev, perm]
    );
  }, []);
  console.log(open);
  console.log(permState);

  useEffect(() => {
    const perms = data?.permissions?.map((item) => item.name);
    setPermState(perms);
    console.log("permsss", perms);
  }, [data]);

  const returnPerm = useCallback(
    (permission, moduleName) => {
      return (
        <Box sx={{ width: "100%" }}>
          <List>
            {permission?.map((p) => {
              const moduleNameJoiner = moduleName
                ? moduleName + "." + p?.module
                : p?.module;
              return (
                <React.Fragment key={p.module}>
                  <ListItemButton
                    variant="contained"
                    onClick={() => onToggle(moduleNameJoiner)}
                  >
                    <ListItemText primary={p?.module?.split("-")?.join(" ")} />
                    {open[moduleNameJoiner] ? (
                      <ExpandLess sx={{ ml: 2 }} />
                    ) : (
                      <ExpandMore sx={{ ml: 2 }} />
                    )}
                  </ListItemButton>
                  <Collapse
                    sx={{ pl: p?.children?.length ? 3 : 0 }}
                    in={open[moduleNameJoiner]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      {p?.children?.length ? (
                        returnPerm(p?.children, moduleNameJoiner)
                      ) : (
                        <Box display="flex" gap={2}>
                          {p?.perms?.map((perm) => {
                            return (
                              <FormGroup key={perm}>
                                <FormControlLabel
                                  onChange={() =>
                                    onChangePerm(`${moduleNameJoiner}.${perm}`)
                                  }
                                  control={
                                    <Checkbox
                                      checked={permState.includes(
                                        `${moduleNameJoiner}.${perm}`
                                      )}
                                    />
                                  }
                                  label={perm}
                                />
                              </FormGroup>
                            );
                          })}
                        </Box>
                      )}
                    </List>
                  </Collapse>
                </React.Fragment>
              );
            })}
          </List>
        </Box>
      );
    },
    [open, permState, onChangePerm, onToggle]
  );

  const handleUpdateRolePermissions = () => {
    const payload = {
      id: data?.id,
      name: data?.name,
      permissions: permState,
    };
    updateRoleMutation.mutate(payload, {
      onSuccess: () => handleClose(),
      onSettled: () => {},
    });
  };

  return (
    <Box width={{ md: 600, sm: 300, lg: 800 }}>
      {returnPerm(transformPerm || [], "")}
      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Button
          variant="contained"
          color="warning"
          loading={updateRoleMutation.isPending}
          onClick={handleUpdateRolePermissions}
        >
          Update Permissions
        </Button>
      </Box>
    </Box>
  );
}

export default React.memo(RolePermissions);
