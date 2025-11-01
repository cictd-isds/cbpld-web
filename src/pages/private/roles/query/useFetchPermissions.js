import { useQuery } from "@tanstack/react-query";
import API from "../../../../utils/api/apiClient";
import { ROLES } from "../../../../utils/queryKeys";
import { PERMISSIONS } from "../../../../utils/queryKeys";

export function useFetcPermissions() {
  const fetchPermissions = async () => {
    const response = await API.get(`/api/v1/permissions`);
    return response.data;
  };
  return useQuery({
    queryFn: fetchPermissions,
    queryKey: [PERMISSIONS],
  });
}
