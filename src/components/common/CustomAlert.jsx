import React from "react";
import { Alert, AlertTitle, Stack } from "@mui/material";

export default function CustomAlert({ severity, title, message }) {
  if (!message) return null; // Don't render anything if no message

  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert severity={severity} variant="filled">
        {title && <AlertTitle>{title}</AlertTitle>}
        {message}
      </Alert>
    </Stack>
  );
}
