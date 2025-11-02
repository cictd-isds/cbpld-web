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
  setSuccess: (data) => {
    set({
      isSuccess: true,
      data,
      mutationId: Date.now(),
      isError: false,
      error: null,
    });
  },
  setError: (error) => {
    set({
      isError: true,
      error: error,
      mutationId: Date.now(),
      isSuccess: false,
      data: null,
    });
  },
});
