import { mdiClose } from "@mdi/js";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  styled,
  SvgIcon,
  Typography,
} from "@mui/material";

const CustomDialogStyled = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function CustomDialog({
  open,
  handleClose,
  title,
  styles = {},
  fullWidth,
  maxWidth,
  children,
}) {
  return (
    <CustomDialogStyled
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      open={open}
      onClose={handleClose}
      sx={{ ...styles }}
    >
      <DialogTitle>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">{title}</Typography>
          <IconButton aria-label="close" onClick={handleClose}>
            <SvgIcon>
              <path d={mdiClose} />
            </SvgIcon>
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box
          noValidate
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            m: "auto",
            width: "fit-content",
          }}
        >
          {children}
        </Box>
      </DialogContent>
    </CustomDialogStyled>
  );
}

export default CustomDialog;
