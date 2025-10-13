import Typography from "@mui/material/Typography";
import { Grid, TextField, Box, Paper } from "@mui/material";

import ProjectLogo from "../../assets/department_logo.png";

export default function Home() {
  return (
    <Box flexGrow={1} height="100% " display="flex" flexDirection="column">
      <Box
        display="flex"
        flex={1}
        justifyContent="center"
        alignItems="flex-end"
        pb={10}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="flex-end"
          gap={2}
        >
          <Box
            sx={{
              width: 70,
              height: 70,
              borderRadius: "100%",
              overflow: "hidden",
            }}
          >
            <img src={ProjectLogo} style={{ height: "100%", width: "100%" }} />
          </Box>
          <Typography variant="h1">
            {import.meta.env.VITE_APP_DEPARTMENT}
          </Typography>
          <Box
            px={10} // info
          >
            <Typography variant="h5" textAlign="center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box display="flex" justifyContent="flex-end" pr={2}>
        <Typography>Version 1.0.0</Typography>
      </Box>
    </Box>
  );
}
