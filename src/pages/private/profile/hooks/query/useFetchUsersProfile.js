import { useQuery } from "@tanstack/react-query";
import { USER_PROFILE } from "../../../../../utils/queryKeys";
import API from "../../../../../utils/api";

function useFetchUsersProfile() {
  const fetchUsers = async () => {
    const response = await API.get(`/api/v1/users/profile`);
    console.log(response.data);
    return response.data;
  };
  return useQuery({
    queryFn: fetchUsers,
    queryKey: [USER_PROFILE],
  });
}
export default useFetchUsersProfile;
