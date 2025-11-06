import { useQuery } from "@tanstack/react-query";
import { USER_PHOTO, USER_PROFILE } from "../../../../../utils/queryKeys";
import API from "../../../../../utils/api";

export default function useQueryUserData() {
  const fetchUsers = async () => {
    const response = await API.get(`/api/v1/users/profile`);
    return response.data;
  };

  const fetchPhoto = async () => {
    // const userData = await API.get(`/api/v1/users/profile`);
    // if (!!userData.data.img_id) {
    const response = await API.get(`/api/v1/users/profile/photo/inline`, {
      responseType: "blob",
    });
    console.log("fetchphotoresponse", response);
    // const blobUrl = URL.createObjectURL(response.data);
    // return blobUrl;
    // } else {
    //   return false;
    // }
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
