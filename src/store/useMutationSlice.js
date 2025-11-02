export const createuseMutationSlice = (set, get) => ({
  isSuccess: false,
  isError: false,
  data: null,
  error: null,
  pending: false,
  mutationId: 0,
  clearMutation: () =>
    set({
      isSuccess: false,
      data: null,
      error: null,
      pending: false,
      isError: false,
    }),
  setPending: (pending) => set({ pending }),
  setSuccess: ({ isSuccess, data }) => {
    set({
      isSuccess,
      data,
      mutationId: Date.now(),
      isError: false,
      error: null,
    });
  },
  setError: ({ isError, error }) => {
    set({
      isError,
      error: error,
      mutationId: Date.now(),
      isSuccess: false,
      data: null,
    });
  },
});
