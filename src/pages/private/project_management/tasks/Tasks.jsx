import React, { Fragment } from "react";
import { Grid, Box, Button, Paper } from "@mui/material";
import FullModal from "../../../../components/common/modals/FullModal";
import LargeModal from "../../../../components/common/modals/LargeModal";
import MediumModal from "../../../../components/common/modals/MediumModal";
import SmallModal from "../../../../components/common/modals/SmallModal";
import SmallestModal from "../../../../components/common/modals/SmallestModal";

export default function Tasks() {
  const [open, setOpen] = React.useState(null);

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6, sm: 6 }}>
          <Paper sx={{ p: 2, display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Button variant="contained" onClick={() => setOpen("full")}>
              FullModal
            </Button>
            <Button variant="contained" onClick={() => setOpen("large")}>
              LargeModal
            </Button>
            <Button variant="contained" onClick={() => setOpen("medium")}>
              MediumModal
            </Button>
            <Button variant="contained" onClick={() => setOpen("small")}>
              SmallModal
            </Button>
            <Button variant="contained" onClick={() => setOpen("smallest")}>
              SmallestModal
            </Button>
          </Paper>
        </Grid>
        <Grid size={8} md={8} sx={{ bgcolor: "red" }}>
          asda
        </Grid>
        <Grid size={4} md={4} sx={{ bgcolor: "blue" }}>
          ww
        </Grid>
      </Grid>

      <Fragment>
        <FullModal open={open === "full"} handleClose={() => setOpen(null)}>
          full
        </FullModal>
        <LargeModal open={open === "large"} handleClose={() => setOpen(null)}>
          large
        </LargeModal>
        <MediumModal open={open === "medium"} handleClose={() => setOpen(null)}>
          medium
        </MediumModal>
        <SmallModal open={open === "small"} handleClose={() => setOpen(null)}>
          small
        </SmallModal>
        <SmallestModal
          open={open === "smallest"}
          handleClose={() => setOpen(null)}
        >
          smallest
        </SmallestModal>
      </Fragment>
    </Box>
  );
}
