import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { Box } from "@mui/material";
import { useBoundStore } from "../../store/store";
export default function CustomGlobalSnackbar({
  delay = 3000,
  vertical = "top",
  horizontal = "right",
}) {
  const { isSuccess, isError, error, data, mutationId } = useBoundStore();
  const [open, setOpen] = React.useState(false);

  const renderer = React.useRef(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  React.useEffect(() => {
    if (!renderer.current) {
      // avoid showing the snackbar if first render / reload
      renderer.current = true;
    } else {
      if (isSuccess || isError) {
        setOpen(true);
      }
    }
  }, [isSuccess, isError, mutationId]);

  return (
    <Box>
      <Snackbar
        open={open}
        autoHideDuration={delay}
        onClose={handleClose}
        anchorOrigin={{ vertical: vertical, horizontal: horizontal }}
      >
        <Alert
          onClose={handleClose}
          severity={isError ? "error" : isSuccess ? "success" : ""}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {isError && (error?.message || "error")}
          {isSuccess && (data?.message || "successful request")}
        </Alert>
      </Snackbar>
    </Box>
  );
}
