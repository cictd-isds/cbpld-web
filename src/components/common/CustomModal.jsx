import React from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Fade,
  Backdrop,
  useTheme,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { useBoundStore } from "../../store/store"; // adjust import path if needed

/**
 * CustomModal Component
 *
 * Props:
 * - open: boolean — controls modal visibility
 * - onClose: function — called when modal closes
 * - title: string — modal title text
 * - children: ReactNode — modal content
 * - size: 'small' | 'medium' | 'large' | 'full' (default: 'medium')
 * - height: string | number (optional, overrides preset)
 * - width: string | number (optional, overrides preset)
 * - sx: object (optional, to override styles)
 */
export default function CustomModal({
  open,
  onClose,
  title = "",
  children,
  size = "medium",
  height,
  width,
  sx = {},
}) {
  const mode = useBoundStore((state) => state.mode); // "light" | "dark"

  // Size presets
  const getSize = () => {
    switch (size) {
      case "small":
        return { width: 400, maxWidth: "90%" };
      case "medium":
        return { width: 600, maxWidth: "95%" };
      case "large":
        return { width: 900, maxWidth: "98%" };
      case "full":
        return { width: "95vw", height: "90vh" };
      default:
        return { width: 600 };
    }
  };

  const modalSize = getSize();
  const theme = useTheme();
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="custom-modal-title"
      aria-describedby="custom-modal-description"
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 300,
        },
      }}
    >
      <Fade in={open} timeout={300}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: mode === "dark" ? "#1E1E1E" : "background.paper",
            color: mode === "dark" ? "#FFFFFF" : "inherit",
            borderRadius: 3,
            boxShadow: 24,
            p: 3,
            width: width || modalSize.width,
            height: height || modalSize.height || "auto",
            maxWidth: modalSize.maxWidth || "100%",
            overflowY: "auto",
            outline: "none",
            transition: "all 0.3s ease",
            ...sx,
          }}
        >
          {/* Header */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography
              id="custom-modal-title"
              variant="h6"
              fontWeight={600}
              sx={{
                color:
                  theme.palette.mode === "dark"
                    ? theme.palette.primary.main
                    : theme.palette.text.primary,
              }}
            >
              {title}
            </Typography>

            <IconButton onClick={onClose}>
              <CloseIcon
                sx={{ color: mode === "dark" ? "#fff" : "#000" }}
                fontSize="small"
              />
            </IconButton>
          </Box>

          {/* Content */}
          <Box id="custom-modal-description">{children}</Box>
        </Box>
      </Fade>
    </Modal>
  );
}
