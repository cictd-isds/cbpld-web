import { useMutation } from "@tanstack/react-query";
import { handleRequest } from "../../../../utils/api/handleRequest";
import API from "../../../../utils/api/apiClient";
import { useBoundStore } from "../../../../store/store";
import { USER_ROLES } from "../../../../utils/queryKeys";

function useUserManagement() {
  const { setPending, setSuccess, setError, clearMutation } = useBoundStore();

  const userRegister = async (payload) => {
    const response = await handleRequest(
      () => API.post(`/api/v1/users/store`, payload),
      [USER_ROLES]
    );
    return response.data;
  };

  const userUpdate = async (data) => {
    const response = await handleRequest(
      () => API.put(`/api/v1/users/${data.id}`, data),
      [USER_ROLES]
    );
    return response.data;
  };

  const userDelete = async (id) => {
    const response = await handleRequest(
      () => API.delete(`/api/v1/users/${id}`, { password: 123123123 }),
      [USER_ROLES]
    );
    return response.data;
  };

  const userForgotPassword = async (id) => {
    const response = await handleRequest(
      () => API.post(`/api/v1/users/${id}/force-password-reset`),
      [USER_ROLES]
    );
    return response.data;
  };

  const userRegisterMutation = useMutation({
    mutationFn: userRegister,
    onMutate: () => {
      setPending(true);
    },
    onSuccess: (data) => setSuccess(data),
    onError: (error) => setError(error),
    onSettled: () => setPending(false),
  });

  const userUpdateMutation = useMutation({
    mutationFn: userUpdate,
    onMutate: () => {
      setPending(true);
    },
    onSuccess: (data) => setSuccess(data),
    onError: (error) => setError(error),
    onSettled: () => setPending(false),
  });

  const userDeleteMutation = useMutation({
    mutationFn: userDelete,
    onMutate: () => {
      setPending(true);
    },
    onSuccess: (data) => setSuccess(data),
    onError: (error) => setError(error),
    onSettled: () => setPending(false),
  });

  const userForgotPassMutation = useMutation({
    mutationFn: userForgotPassword,
    onMutate: () => {
      setPending(true);
    },
    onSuccess: (data) => setSuccess(data),
    onError: (error) => setError(error),
    onSettled: () => setPending(false),
  });

  return {
    userRegisterMutation,
    userUpdateMutation,
    userDeleteMutation,
    userForgotPassMutation,
  };
}

export default useUserManagement;
