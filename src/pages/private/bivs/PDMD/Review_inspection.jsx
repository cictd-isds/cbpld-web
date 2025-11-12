import { useParams } from "react-router";
import useQueryPDMD from "./hooks/query/useQueryPDMD";
import InspectionSummary from "./InspectionSummary";

function Review_inspection() {
  const { transactionId, inspectorName, violationStatus, inspectDate } =
    useParams();
  const { useInspectListQuery } = useQueryPDMD(transactionId);

  const { data, isLoading, error } = useInspectListQuery;

  if (isLoading) return <div>Loading inspection...</div>;
  if (error) return <div>Error loading inspection: {error.message}</div>;

  return (
    <div>
      {data && (
        <InspectionSummary
          data={data.data}
          inspectDetails={{
            transactionId,
            inspectorName,
            violationStatus,
            inspectDate,
          }}
        />
      )}
    </div>
  );
}

export default Review_inspection;
