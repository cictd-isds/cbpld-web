import { useMutation } from "@tanstack/react-query";
import { useSnackbarStore } from "../../../../../store/snackbarStore";
import { handleRequest } from "../../../../../utils/api/handleRequest";
import API from "../../../../../utils/api";

export function useUpdateUserProfile() {
  const showSnackbar = useSnackbarStore((state) => state.showSnackbar);
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

  const putProfileMutation = useMutation({
    mutationFn: putProfile,
    onSuccess: (data) => {
      showSnackbar("success", "Login successful!");
    },
    onError: (error) => {
      if (error.status === 422) {
        showSnackbar("error", error.response.data.message || "Login failed!");
        return;
      }
      showSnackbar("error", error.message || "Login failed!");
    },
  });

  const uploadProfilePhotoMutation = useMutation({
    mutationFn: uploadProfilePhoto,
    onSuccess: (data) => {
      showSnackbar("success", "Login successful!");
    },
    onError: (error) => {
      if (error.status === 422) {
        showSnackbar("error", error.response.data.message || "Login failed!");
        return;
      }
      showSnackbar("error", error.message || "Login failed!");
    },
  });

  return {
    putProfileMutation,
    uploadProfilePhotoMutation,
  };
}
