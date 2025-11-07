// import { useBoundStore } from "./store";

export const createUserSlice = (set) => ({
  user: null,
  token: null,
  permissions: [],

  setUserAndToken: ({ user, token }) => set({ user, token }),
  logout: () => {
    set({ user: null, token: null });
  },

  setPermissions: (permissions) =>
    set({
      permissions,
    }),

  updateUser: (data = {}) => {
    set((prev) => {
      const currentUser = prev.user;
      const updatedUser = { ...currentUser };
      for (const [key, value] of Object.entries(data)) {
        updatedUser[key] = value;
      }
      return { user: updatedUser };
    });
  },
});
