import { Fragment } from "react";
import CustomDialog from "./CustomDialog";

function SmallModal({ open, handleClose, children, title = "" }) {
  return (
    <Fragment>
      <CustomDialog
        open={open}
        handleClose={handleClose}
        title={title}
        fullWidth={"sm"}
        maxWidth={"sm"}
      >
        {children}
      </CustomDialog>
    </Fragment>
  );
}

export default SmallModal;
