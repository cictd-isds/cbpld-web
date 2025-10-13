import React from "react";
import { Grid, Box } from "@mui/material";

export default function Tasks() {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid size={8} md={8} sx={{ bgcolor: "red" }}>
          asda
        </Grid>
        <Grid size={4} md={4} sx={{ bgcolor: "blue" }}>
          ww
        </Grid>
      </Grid>
    </Box>
  );
}
