import { Fragment } from "react";
import CustomDialog from "./CustomDialog";

function LargeModal({ open, handleClose, children, title = "" }) {
  return (
    <Fragment>
      <CustomDialog
        open={open}
        handleClose={handleClose}
        title={title}
        fullWidth={"lg"}
        maxWidth={"lg"}
      >
        {children}
      </CustomDialog>
    </Fragment>
  );
}

export default LargeModal;
