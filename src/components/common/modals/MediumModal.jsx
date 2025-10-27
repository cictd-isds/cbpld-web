import { Fragment } from "react";
import CustomDialog from "./CustomDialog";

function MediumModal({ open, handleClose, children, title = "" }) {
  return (
    <Fragment>
      <CustomDialog
        open={open}
        handleClose={handleClose}
        title={title}
        fullWidth={"md"}
        maxWidth={"md"}
      >
        {children}
      </CustomDialog>
    </Fragment>
  );
}

export default MediumModal;
