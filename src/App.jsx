import "./App.css";
import ReactQueryProvider from "./utils/ReactQueryProvider";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { getTheme } from "./utils/theme/theme";
import { useBoundStore } from "./store/store";
import { useMemo } from "react";
import RouteProvider from "./routes/RouteProvider";
import CustomSnackbar from "./components/common/CustomSnackbar";

function App() {
  const mode = useBoundStore((state) => state.mode);
  const theme = useMemo(() => getTheme(mode), [mode]);
  return (
    <ReactQueryProvider>
      <ThemeProvider theme={theme}>
        <RouteProvider />
        <CustomSnackbar />
      </ThemeProvider>
    </ReactQueryProvider>
  );
}

export default App;
