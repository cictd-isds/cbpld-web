import { Fragment } from "react";
import Datatable from "../../../../components/datatables/Datatable";
import { Box, Chip, IconButton, Tooltip, Typography } from "@mui/material";
import { BIVS_PDMD_INSPECT_LIST } from "../../../../utils/queryKeys";
import { mdiClipboardSearchOutline, mdiEye } from "@mdi/js";
import Icon from "@mdi/react";
import { useNavigate } from "react-router";
import ProgressWithLabel from "../../../../components/common/ProgressWithLabel";

export default function PDMD() {
  const navigate = useNavigate();

  const handleRedirect = (
    transactionId,
    inspectorName,
    violationStatus,
    inspectDate
  ) => {
    navigate(
      `/home/bivs/pdmd/${transactionId}/${inspectorName}/${violationStatus}/${inspectDate}`
    );
  };

  const columnHeader = [
    {
      field: "transaction_id",
      headerName: "Transaction ID",
      flex: 1,
    },
    {
      // field: "inspector_name",
      headerName: "Title",
      flex: 1,
      renderCell: (params) => {
        const row = params.row;
        return (
          <Box
            sx={{
              height: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography sx={{ fontSize: 13, fontWeight: "600" }}>
                {row.title}
              </Typography>
              <Typography sx={{ fontSize: 11, color: "gray" }}>
                {row.inspector_name}
              </Typography>
            </Box>
          </Box>
        );
      },
    },
    {
      field: "inspected_at",
      headerName: " Date",
      flex: 1,
      renderCell: (params) => {
        const rawDate = params.value; // e.g. '2025-11-12 08:17:53'
        if (!rawDate) return "";

        const date = new Date(rawDate);
        const formattedDate = date.toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }); // e.g. '12 Nov, 2025'

        return formattedDate;
      },
    },
    {
      field: "status_of_violations",
      headerName: " Status",
      flex: 1,
      renderCell: (params) => {
        const value = params.value;

        let color = "default";
        let label = value;

        switch (value) {
          case "Without Violation":
            color = "success";
            break;
          case "With Violation":
            color = "error";
            break;
          case "Non-Business Related":
            color = "warning";
            break;
          default:
            color = "default";
        }

        return (
          <Box
            sx={{
              height: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Chip
              label={label}
              color={color}
              sx={{
                fontWeight: 600,
                borderRadius: "8px",
                textTransform: "capitalize",
                fontSize: "0.85rem",
              }}
            />
          </Box>
        );
      },
    },
    {
      field: "status_of_compliance",
      headerName: "Review Progress",
      flex: 1,
      renderCell: (params) => {
        const value = params.value;

        return (
          <Box
            sx={{
              height: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ProgressWithLabel value={value ?? 0} />
          </Box>
        );
      },
    },

    {
      field: "actions",
      headerName: "Actions",
      minWidth: 100,
      flex: 0,
      headerAlign: "center",
      align: "center",
      sortable: false,
      renderCell: (params) => {
        const row = params?.row;
        return (
          <Box
            sx={{
              display: "flex",
              gap: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Tooltip title="View User Role">
              <IconButton
                color="primary"
                onClick={() =>
                  handleRedirect(
                    row.transaction_id,
                    row.inspector_name,
                    row.status_of_violations,
                    row.inspected_at
                  )
                }
              >
                <Icon path={mdiClipboardSearchOutline} size={1} />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
  ];
  return (
    <Fragment>
      <Box>
        <Datatable
          apiLink="/api/v1/bivs/inspections/"
          customColumns={columnHeader}
          exportFileName=""
          queryKey={BIVS_PDMD_INSPECT_LIST}
        />
      </Box>
    </Fragment>
  );
}
