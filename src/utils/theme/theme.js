// src/theme.js
import { createTheme } from "@mui/material/styles";
import "@fontsource/poppins"; // Defaults to 400 weight
import "@fontsource/poppins/500.css"; // Optional: import specific weights
import "@fontsource/poppins/700.css";

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // Light mode palette
          primary: {
            main: "#1976d2",
          },
          secondary: {
            main: "#9c27b0",
          },
          background: {
            default: "#f5f5f5",
            paper: "#ffffff",
            dark: "#424650",
            light: "#333333",
          },
          nav: {
            highlight: "#2196f3",
            textClick: "#333333",
          },
          text: {
            primary: "#333333",
            secondary: "#666666",
          },
        }
      : {
          // Dark mode palette
          primary: {
            main: "#ffffff",
          },
          nav: {
            highlight: "#4dabf5",
            textClick: "#ffffff",
          },
          secondary: {
            main: "#ce93d8",
          },
          background: {
            default: "#41434B",
            paper: "#41434B",
            dark: "#424650",
            light: "#ffffff",
          },
          text: {
            primary: "#ffffff",
            secondary: "#bbbbbb",
          },
        }),
  },
  typography: {
    fontFamily: `"Poppins", "Helvetica", "Arial", sans-serif`,
    h1: {
      fontSize: "2rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: 600,
    },
    button: {
      textTransform: "none",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: "8px 16px",
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "4px 8px",
        },
      },
    },
  },
});

export const getTheme = (mode) => createTheme(getDesignTokens(mode));
