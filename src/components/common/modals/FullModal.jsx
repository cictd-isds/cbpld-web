import { Fragment } from "react";
import CustomDialog from "./CustomDialog";

function FullModal({ open, handleClose, children, title = "" }) {
  return (
    <Fragment>
      <CustomDialog
        open={open}
        handleClose={handleClose}
        title={title}
        styles={{
          "& .MuiDialog-paper": {
            width: "100vw",
            height: "100vh",
            maxWidth: "none",
            maxHeight: "none",
            margin: 0,
          },
        }}
        fullWidth={true}
        maxWidth={false}
      >
        {children}
      </CustomDialog>
    </Fragment>
  );
}

export default FullModal;
