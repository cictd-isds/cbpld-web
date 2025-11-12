import { Fragment } from "react";
import Datatable from "../../../../components/datatables/Datatable";
import { Box, Chip, IconButton, Tooltip } from "@mui/material";
import { BIVS_PDMD_INSPECT_LIST } from "../../../../utils/queryKeys";
import { mdiClipboardSearchOutline, mdiEye } from "@mdi/js";
import Icon from "@mdi/react";
import { useNavigate } from "react-router";

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
      field: "inspector_name",
      headerName: "Inspector Name",
      flex: 1,
    },
    {
      field: "status_of_violation",
      headerName: "Violation Status",
      flex: 1,
      //   renderCell: (params) => {
      //   const value = params.value;

      //   let color = "default";
      //   let label = value;

      //   switch (value) {
      //     case "Without Violation":
      //       color = "success";
      //       break;
      //     case "With Violation":
      //       color = "error";
      //       break;
      //     case "Non-Business Related":
      //       color = "warning";
      //       break;
      //     default:
      //       color = "default";
      //   }

      //   return (
      //     <Chip
      //       label={label}
      //       color={color}
      //       variant="outlined"
      //       sx={{
      //         fontWeight: 600,
      //         borderRadius: "8px",
      //         textTransform: "capitalize",
      //         fontSize: "0.85rem",
      //       }}
      //     />
      //   );
      // },
      renderCell: (params) => {
        const value = params.value;
        let bg = "";
        let color = "";

        switch (value) {
          case "Without Violation":
            bg = "#E8F5E9"; // light green
            color = "#2E7D32"; // dark green
            break;
          case "With Violation":
            bg = "#FFEBEE"; // light red
            color = "#C62828"; // dark red
            break;
          case "Non-Business Related":
            bg = "#FFF8E1"; // light yellow
            color = "#F9A825"; // dark yellow
            break;
          default:
            bg = "#ECEFF1";
            color = "#37474F";
        }

        return (
          <Box
            sx={{
              px: 1.5,
              py: 0.5,
              borderRadius: "8px",
              bgcolor: bg,
              color: color,
              fontWeight: 600,
              textAlign: "center",
              fontSize: "0.85rem",
              minWidth: "fit-content",
            }}
          >
            {value}
          </Box>
        );
      },
    },
    {
      field: "status_of_compliance",
      headerName: "Compliance Status",
      flex: 1,
    },
    {
      field: "inspected_at",
      headerName: "Inscpection Date",
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
      field: "actions",
      headerName: "Actions",
      minWidth: 220,
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
                    row.status_of_violation,
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
          apiLink="/api/v1/bivs/transactions/list"
          customColumns={columnHeader}
          exportFileName=""
          queryKey={BIVS_PDMD_INSPECT_LIST}
        />
      </Box>
    </Fragment>
  );
}
