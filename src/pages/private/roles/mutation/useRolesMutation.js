import { useMutation } from "@tanstack/react-query";
import React from "react";
import { handleRequest } from "../../../../utils/api/handleRequest";
import API from "../../../../utils/api/apiClient";
import { useBoundStore } from "../../../../store/store";

function useRolesMutation() {
  const { setPending, setSuccess, setError, clearMutation } = useBoundStore();
  const createRole = async (data) => {
    const response = await handleRequest(
      () => API.post(`/api/v1/roles`, data),
      ["roles"]
    );
    return response.data;
  };

  const updateRole = async (data) => {
    const response = await handleRequest(
      () => API.put(`/api/v1/roles/${data?.id}`, data),
      ["roles"]
    );
    return response.data;
  };

  const deleteRole = async (data) => {
    const response = await handleRequest(
      () => API.delete(`/api/v1/roles/${data?.id}`),
      ["roles"]
    );
    return response.data;
  };

  const createRoleMutation = useMutation({
    mutationFn: createRole,
    onMutate: () => {
      setPending(true);
    },
    onSuccess: (data) => setSuccess(data),
    onError: (error) => setError(error),
    onSettled: () => setPending(false),
  });

  const updateRoleMutation = useMutation({
    mutationFn: updateRole,
    onMutate: () => {
      setPending(true);
    },
    onSuccess: (data) => setSuccess(data),
    onError: (error) => setError(error),
    onSettled: () => setPending(false),
  });

  const deleteRoleMutation = useMutation({
    mutationFn: deleteRole,
    onMutate: () => {
      setPending(true);
    },
    onSuccess: (data) => setSuccess(data),
    onError: (error) => setError(error),
    onSettled: () => setPending(false),
  });

  return {
    createRoleMutation,
    updateRoleMutation,
    deleteRoleMutation,
  };
}

export default useRolesMutation;
