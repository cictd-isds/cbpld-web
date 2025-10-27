import { useQuery } from "@tanstack/react-query";
import { USERS } from "../../../../../utils/queryKeys";
import API from "../../../../../utils/api";

function useFetchUsers() {
  const fetchUsers = async () => {
    const response = await API.get(`/todos/1`);
    console.log(response.data);
    return response.data;
  };
  return useQuery({
    queryFn: fetchUsers,
    queryKey: [USERS],
  });
}
export default useFetchUsers;
