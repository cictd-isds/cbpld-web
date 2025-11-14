import { useQuery } from "@tanstack/react-query";
import { BIVS_PDMD_INSPECT_LIST } from "../../../../../../utils/queryKeys";
import API from "../../../../../../utils/api/apiClient";

export default function useQueryPDMD(transactionID) {
  console.log("transactionID", transactionID);
  const fetchInspection = async ({ queryKey }) => {
    const [, id] = queryKey; // ✅ destructure transactionID from queryKey
    const response = await API.get(`/api/v1/bivs/inspections/${id}`);
    return response.data;
  };

  const useInspectListQuery = useQuery({
    queryKey: [BIVS_PDMD_INSPECT_LIST, transactionID], // ✅ include ID
    queryFn: fetchInspection,
    enabled: !!transactionID, // ✅ only run when ID exists
  });

  return {
    useInspectListQuery,
  };
}
