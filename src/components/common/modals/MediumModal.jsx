import { Fragment } from "react";

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
