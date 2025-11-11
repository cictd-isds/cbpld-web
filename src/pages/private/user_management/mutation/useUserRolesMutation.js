import { useMutation } from "@tanstack/react-query";
import React from "react";
import { handleRequest } from "../../../../utils/api/handleRequest";
import API from "../../../../utils/api/apiClient";
import { useBoundStore } from "../../../../store/store";
import { USER_ROLES } from "../../../../utils/queryKeys";

function useUserRolesMutation() {
  const { setPending, setSuccess, setError, clearMutation } = useBoundStore();

  const updateUserRole = async (data) => {
    const updateresponse = await handleRequest(
      () =>
        API.put(`/api/v1/users/${data.userID}/roles/sync`, data.updatePayload),
      [USER_ROLES]
    );
    return updateresponse.data;
  };

  const updateUserRoleMutation = useMutation({
    mutationFn: updateUserRole,
    onMutate: () => {
      setPending(true);
    },
    onSuccess: (data) => setSuccess(data),
    onError: (error) => setError(error),
    onSettled: () => setPending(false),
  });

  return {
    updateUserRoleMutation,
  };
}

export default useUserRolesMutation;
