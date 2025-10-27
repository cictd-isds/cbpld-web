export const createModeSlice = (set) => ({
  mode: "light",
  setMode: (param) => set({ mode: param }),
});
