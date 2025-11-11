import { useQuery } from "@tanstack/react-query";
import { handleRequest } from "../../../../utils/api/handleRequest";
import API from "../../../../utils/api/apiClient";
import { ROLES } from "../../../../utils/queryKeys";

function useFetchRoles() {
  const fetchRolesFn = async () => {
    const response = await handleRequest(() => API.get(`/api/v1/roles`));
    return response.data;
  };
  return useQuery({
    queryFn: fetchRolesFn,
    queryKey: [ROLES],
  });
}

export default useFetchRoles;
