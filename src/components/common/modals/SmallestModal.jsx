import { Fragment } from "react";
import CustomDialog from "./CustomDialog";

function SmallestModal({ open, handleClose, children, title = "" }) {
  return (
    <Fragment>
      <CustomDialog
        open={open}
        handleClose={handleClose}
        title={title}
        fullWidth={"xs"}
        maxWidth={"xs"}
      >
        {children}
      </CustomDialog>
    </Fragment>
  );
}

export default SmallestModal;
