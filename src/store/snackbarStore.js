import { create } from "zustand";

export const useSnackbarStore = create((set) => ({
  open: false,
  severity: "info",
  message: "",
  showSnackbar: (severity, message) => set({ open: true, severity, message }),
  closeSnackbar: () => set({ open: false }),
}));
