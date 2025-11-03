import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import Icon from "@mdi/react";
import { mdiAlertBox } from "@mdi/js";
import { orange } from "@mui/material/colors";

export function ConfirmDialog({
  open,
  title,
  content,
  handleClose,
  onConfirm,
  loading,
}) {
  console.log("rerender");
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Icon path={mdiAlertBox} size={5} color={orange[500]} />
          <Typography>{content}</Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={onConfirm}
          loading={loading}
          color="primary"
          variant="contained"
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
