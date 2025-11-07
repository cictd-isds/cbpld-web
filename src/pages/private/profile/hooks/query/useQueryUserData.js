import { useQuery } from "@tanstack/react-query";
import { USER_PHOTO, USER_PROFILE } from "../../../../../utils/queryKeys";
import API from "../../../../../utils/api";
import { useBoundStore } from "../../../../../store/store";

export default function useQueryUserData() {
  const fetchUsers = async () => {
    const response = await API.get(`/api/v1/users/profile`);
    return response.data;
  };

  const fetchPhoto = async () => {
    const userStore = useBoundStore.getState().user;
    if (!!userStore.img_path) {
      console.log("fetchPhoto", userStore.img_path);
      const response = await API.get(`/api/v1/users/profile/photo/inline`, {
        responseType: "blob",
        params: {
          img_path: userStore.img_path,
        },
      });
      const blobUrl = URL.createObjectURL(response.data);
      return blobUrl;
    } else {
      return false;
    }
  };

  const userPhotoQuery = useQuery({
    queryFn: fetchPhoto,
    queryKey: [USER_PHOTO],
    staleTime: Infinity, // Don’t refetch unless manually invalidated
    cacheTime: Infinity, // Keep cached blob for the session
  });
  const userDataQuery = useQuery({
    queryFn: fetchUsers,
    queryKey: [USER_PROFILE],
  });

  return {
    userDataQuery,
    userPhotoQuery,
  };
}
