export const createUserSlice = (set) => ({
  user: {},
  token: "",
  setUser: () => set((state) => ({ user: state })),
  setToken: (token) => set({ token }),
});
