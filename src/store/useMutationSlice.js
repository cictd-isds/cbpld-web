export const createuseMutationSlice = (set) => ({
  isSuccess: false,
  isError: false,
  data: null,
  error: null,
  pending: false,
  clearMutation: () =>
    set({
      isSuccess: false,
      data: null,
      error: null,
      pending: false,
      isError: false,
    }),
  setPending: (pending) => set({ pending }),
  setSuccess: ({ isSuccess, data }) => set({ isSuccess, data }),
  setError: ({ isError, error }) => set({ isError, error: error }),
  //old version
  // user: null,
  // token: "",
  // setUser: () => set((state) => ({ user: state })),
  // setToken: (token) => set({ token }),
});

// export const useGetUserUser = () => useBoundStore((state) => state.user);
// export const useGetUserToken = () => useBoundStore((state) => state.token);
// export const useUserActions = () => useBoundStore((state) => state.actions);
