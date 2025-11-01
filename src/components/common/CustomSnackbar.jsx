import React from "react";
import { Snackbar, Alert, Slide } from "@mui/material";
import { useSnackbarStore } from "../../store/snackbarStore";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

export default function CustomSnackbar() {
  const { open, severity, message, closeSnackbar } = useSnackbarStore();

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={closeSnackbar}
      TransitionComponent={SlideTransition}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert
        onClose={closeSnackbar}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
