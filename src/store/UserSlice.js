// import { useBoundStore } from "./store";

export const createUserSlice = (set) => ({
  user: null,
  token: null,
  setUserAndToken: ({ user, token }) => set({ user, token }),
  logout: () => {
    set({ user: null, token: null });
  },
  permissions: [],
  setPermissions: (permissions) =>
    set({
      permissions,
    }),

  //old version
  // user: null,
  // token: "",
  // setUser: () => set((state) => ({ user: state })),
  // setToken: (token) => set({ token }),
});

// export const useGetUserUser = () => useBoundStore((state) => state.user);
// export const useGetUserToken = () => useBoundStore((state) => state.token);
// export const useUserActions = () => useBoundStore((state) => state.actions);
