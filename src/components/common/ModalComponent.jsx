import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Icon from "@mdi/react";
import { mdiClose } from "@mdi/js";
import { useBoundStore } from "../../store/store";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  p: 4,
  pb: 6,
  borderRadius: 5,
};

export default function ModalComponent({
  isOpen,
  onClose,
  sx,
  children,
  title,
}) {
  const mode = useBoundStore((state) => state.mode);
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={[style, sx]}>
        <Box
          display="flex"
          justifyContent={title ? "space-between" : "flex-end"}
        >
          <Typography sx={{ color: mode === "dark" ? "#ffffff" : "" }}>
            {title}
          </Typography>
          <Icon
            onClick={onClose}
            style={{ cursor: "pointer" }}
            path={mdiClose}
            color={mode === "dark" ? "#ffffff" : ""}
            size={1}
          />
        </Box>
        {children}
      </Box>
    </Modal>
  );
}
