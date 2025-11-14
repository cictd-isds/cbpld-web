import { Box, LinearProgress, Typography } from "@mui/material";

export default function ProgressWithLabel({ value }) {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
      }}
    >
      {/* Progress Bar */}
      <LinearProgress
        variant="determinate"
        value={value}
        sx={{
          height: 25,
          borderRadius: 2,
        }}
      />

      {/* Text inside bar */}
      <Typography
        variant="body2"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: "bold",
        }}
      >
        {`${value}%`}
      </Typography>
    </Box>
  );
}
