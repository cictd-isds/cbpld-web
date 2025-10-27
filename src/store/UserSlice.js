import { useBoundStore } from "./store";

export const createUserSlice = (set) => ({
  user: null,
  token: null,
  actions: {
    setUserAndToken: ({ user, token }) =>
      set((state) => ({
        user: user ? user : state.user,
        token: token ? token : state.token,
      })),
    logout: () => {
      set({ user: null, token: null });
      localStorage.removeItem("app-storage"); // 🧹 Clear persisted data
    },
  },

  //old version
  // user: null,
  // token: "",
  // setUser: () => set((state) => ({ user: state })),
  // setToken: (token) => set({ token }),
});

export const useGetUserUser = () => useBoundStore((state) => state.user);
export const useGetUserToken = () => useBoundStore((state) => state.token);
export const useUserActions = () => useBoundStore((state) => state.actions);
