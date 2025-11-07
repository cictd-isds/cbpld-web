import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbarStore } from "../../../../../store/snackbarStore";
import { handleRequest } from "../../../../../utils/api/handleRequest";
import API from "../../../../../utils/api";
import { USER_PHOTO, USER_PROFILE } from "../../../../../utils/queryKeys";
import { useBoundStore } from "../../../../../store/store";

export function useMutateUserProfile() {
  const { setPending, setSuccess, setError, clearMutation } = useBoundStore();
  const showSnackbar = useSnackbarStore((state) => state.showSnackbar);
  const logout = useBoundStore((state) => state.logout);
  const updateUser = useBoundStore((state) => state.updateUser);
  const currentUser = useBoundStore((state) => state.user);

  const queryClient = useQueryClient();

  const logoutAllApi = async () => {
    const response = await API.post("api/auth/logout-all");
    return response.data;
  };
  const putProfile = async (data) => {
    const response = await handleRequest(() =>
      API.put(`/api/v1/users/profile`, data)
    );
    return response.data;
  };
  const uploadProfilePhoto = async ({ userId, file }) => {
    const formData = new FormData();
    formData.append("file", file);
    const { data } = await API.post(
      `/api/v1/users/profile/photo/${userId}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return data;
  };
  const deletePhoto = async () => {
    const userID = currentUser.id;
    const response = await handleRequest(() =>
      API.delete(`/api/v1/users/profile/photo/${userID}`)
    );
    return response.data;
  };

  const logoutAllMutation = useMutation({
    mutationFn: () => logoutAllApi,
    onSuccess: () => {
      logout();
    },
    onError: (error) => {
      console.error("Logout failed:", error.response?.data || error.message);
    },
  });
  const putProfileMutation = useMutation({
    mutationFn: putProfile,
    onSuccess: (data) => {
      updateUser(data);
      queryClient.invalidateQueries([USER_PROFILE]);
      setSuccess({ message: "Update successfully." });
    },
    onError: (error) => {
      setError(error.response.data);
    },
  });

  const uploadProfilePhotoMutation = useMutation({
    mutationFn: uploadProfilePhoto,
    onSuccess: (data) => {
      putProfileMutation.mutate({ img_path: data.path });
      queryClient.invalidateQueries([USER_PHOTO]);
      setSuccess({ message: "Profile photo successfully uploaded." });
    },
    onError: (error) => {
      console.log(error);
      setError(error.response.data);
    },
    onSettled: () => setPending(false),
  });
  const deleteProfilePhotoMutation = useMutation({
    mutationFn: deletePhoto,
    onSuccess: (data) => {
      updateUser({ img_path: null });
      queryClient.invalidateQueries([USER_PHOTO]);
      showSnackbar("success", "Login successful!");
    },
    onError: (error) => {
      // if (error.status === 422) {
      //   showSnackbar("error", error.response.data.message || "Login failed!");
      //   return;
      // }
      // showSnackbar("error", error.message || "Login failed!");
    },
  });

  return {
    logoutAllMutation,
    putProfileMutation,
    uploadProfilePhotoMutation,
    deleteProfilePhotoMutation,
  };
}
