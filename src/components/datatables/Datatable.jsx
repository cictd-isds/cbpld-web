/* Datatable.jsx — server-side DataGrid + React Query */

import {
  Badge,
  Box,
  Divider,
  Menu,
  MenuItem,
  SvgIcon,
  TextField,
  Tooltip,
  Typography,
  InputAdornment,
  Pagination,
  FormControl,
  Select,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import API from "../../utils/api/apiClient";
import {
  ColumnsPanelTrigger,
  DataGrid,
  ExportCsv,
  ExportPrint,
  FilterPanelTrigger,
  QuickFilter,
  QuickFilterControl,
  QuickFilterTrigger,
  Toolbar,
  ToolbarButton,
  QuickFilterClear,
  useGridApiContext,
  useGridSelector,
  gridPageSelector,
  gridPageCountSelector,
  gridPageSizeSelector,
} from "@mui/x-data-grid";
import styled from "@emotion/styled";
import {
  mdiCancel,
  mdiDownload,
  mdiFilter,
  mdiMagnify,
  mdiViewColumn,
} from "@mdi/js";
import useDebounced from "../common/CustomDebounce";

const dataGridHeaders = {
  // height: "auto",
  height: "80vh",
  width: "100%",
  "& .MuiDataGrid-columnHeader": {
    backgroundColor: "#1565c0 !important",
  },
  "& .MuiDataGrid-columnHeaders": {
    color: "#fff",
  },
  "& .MuiDataGrid-columnHeaderTitle": { fontWeight: 600 },
};

const StyledQuickFilter = styled(QuickFilter)({
  display: "grid",
  alignItems: "center",
});

const StyledToolbarButton = styled(ToolbarButton)(({ theme, ownerState }) => ({
  gridArea: "1 / 1",
  width: "min-content",
  height: "min-content",
  zIndex: 1,
  opacity: ownerState.expanded ? 0 : 1,
  pointerEvents: ownerState.expanded ? "none" : "auto",
  transition: theme.transitions.create(["opacity"]),
}));

const StyledTextField = styled(TextField)(({ theme, ownerState }) => ({
  gridArea: "1 / 1",
  overflowX: "clip",
  width: ownerState.expanded ? 260 : "var(--trigger-width)",
  opacity: ownerState.expanded ? 1 : 0,
  transition: theme.transitions.create(["width", "opacity"]),
}));

const MdiIcon = ({ path, size = 1, ...props }) => (
  <SvgIcon fontSize="small" sx={{ fontSize: size * 24 }} {...props}>
    <path d={path} />
  </SvgIcon>
);

const CustomFooterPagination = () => {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  const pageSize = useGridSelector(apiRef, gridPageSizeSelector);

  return (
    <Box
      sx={{
        backgroundColor: "#1565c0",
        px: 2,
        display: "flex",
        gap: 2,
        alignItems: "center",
        flexWrap: "wrap",
        // justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          flexWrap: "wrap",
        }}
      >
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          Rows per page:
        </Typography>
        <FormControl size="small">
          <Select
            sx={{
              py: 0,
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "transparent !important",
                //   color: (theme) => theme.palette.primary.main,
              },
              // "&:hover .MuiOutlinedInput-notchedOutline": {
              //   borderColor: "transparent",
              // },
              // "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              //   borderColor: "transparent",
              // },
            }}
            value={pageSize}
            onChange={(e) => apiRef.current.setPageSize(Number(e.target.value))}
          >
            {[10, 25, 50, 100].map((n) => (
              <MenuItem key={n} value={n}>
                {n}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ flexGrow: 1 }} />

      <Typography variant="body2" sx={{ color: "text.primary" }}>
        Page {page + 1} of {pageCount}
      </Typography>

      <Pagination
        sx={(theme) => ({ padding: theme.spacing(1.5, 0) })}
        color="primary"
        count={pageCount}
        page={page + 1}
        onChange={(event, value) => apiRef.current.setPage(value - 1)}
        showFirstButton
        showLastButton
        size="small"
        variant="outlined"
        shape="rounded"
        //   boundaryCount={1}
        //   hidePrevButton
        //   hideNextButton
      />
    </Box>
  );
};

const CustomGridToolbar = (props) => {
  const [exportMenuOpen, setExportMenuOpen] = useState(false);
  const exportMenuTriggerRef = useRef(null);
  const { csvFileName } = props || {};

  // const apiRef = useGridApiContext();
  // const page = useGridSelector(apiRef, gridPageSelector);
  // const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  // const pageSize = useGridSelector(apiRef, gridPageSizeSelector);

  //   console.log(page, pageCount);
  //   console.log(apiRef);

  return (
    <Box>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {/* <Typography fontWeight="medium" sx={{ flex: 1, mx: 0.5 }}>
        Toolbar
      </Typography> */}

        {/* <StyledTextField
          // {...controlProps}
          // ownerState={{ expanded: state.expanded }}
          // inputRef={ref}
          aria-label="Search"
          placeholder="Search..."
          size="small"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <MdiIcon path={mdiMagnify} />
                </InputAdornment>
              ),
              endAdornment: (
                // state.value ? (
                <InputAdornment position="end">
                  <QuickFilterClear
                    edge="end"
                    size="small"
                    aria-label="Clear search"
                    material={{ sx: { marginRight: -0.75 } }}
                  >
                    <MdiIcon path={mdiCancel} />
                  </QuickFilterClear>
                </InputAdornment>
              ),
              // ) : null,
              // ...controlProps.slotProps?.input,
            },
            // ...controlProps.slotProps,
          }}
        /> */}

        <QuickFilter>
          <QuickFilterControl
            render={({ ref, ...controlProps }, state) => (
              <TextField
                {...controlProps}
                inputRef={ref}
                aria-label="Search"
                placeholder="Search..."
                size="small"
                sx={{ ml: 1, width: 260 }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <MdiIcon path={mdiMagnify} />
                      </InputAdornment>
                    ),
                    endAdornment: state.value ? (
                      <InputAdornment position="end">
                        <QuickFilterClear
                          edge="end"
                          size="small"
                          material={{ sx: { marginRight: -0.75 } }}
                        >
                          <MdiIcon path={mdiCancel} />
                        </QuickFilterClear>
                      </InputAdornment>
                    ) : null,
                    ...controlProps.slotProps?.input,
                  },
                  ...controlProps.slotProps,
                }}
              />
            )}
          />
        </QuickFilter>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Tooltip title="Columns">
            <ColumnsPanelTrigger render={<ToolbarButton />}>
              <MdiIcon path={mdiViewColumn} />
            </ColumnsPanelTrigger>
          </Tooltip>

          <Tooltip title="Filters">
            <FilterPanelTrigger
              render={(props, state) => (
                <ToolbarButton {...props} color="default">
                  <Badge
                    badgeContent={state.filterCount}
                    color="primary"
                    variant="dot"
                  >
                    <MdiIcon path={mdiFilter} />
                  </Badge>
                </ToolbarButton>
              )}
            />
          </Tooltip>

          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            sx={{ mx: 0.5 }}
          />

          <Tooltip title="Export">
            <ToolbarButton
              ref={exportMenuTriggerRef}
              id="export-menu-trigger"
              aria-controls="export-menu"
              aria-haspopup="true"
              aria-expanded={exportMenuOpen ? "true" : undefined}
              onClick={() => setExportMenuOpen(true)}
            >
              <MdiIcon path={mdiDownload} />
            </ToolbarButton>
          </Tooltip>

          <Menu
            id="export-menu"
            anchorEl={exportMenuTriggerRef.current}
            open={exportMenuOpen}
            onClose={() => setExportMenuOpen(false)}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            slotProps={{ list: { "aria-labelledby": "export-menu-trigger" } }}
          >
            {/* <ExportPrint
              render={<MenuItem />}
              onClick={() => setExportMenuOpen(false)}
            >
              Print
            </ExportPrint> */}
            <ExportCsv
              render={<MenuItem />}
              onClick={() => setExportMenuOpen(false)}
              fileName={csvFileName}
            >
              Download as CSV
            </ExportCsv>
          </Menu>
        </Box>

        {/* Quick Filter UI controlling the grid's quick search */}
        {/* <StyledQuickFilter>
          <QuickFilterTrigger
            render={(triggerProps, state) => (
              <Tooltip title="Search" enterDelay={0}>
                <StyledToolbarButton
                  {...triggerProps}
                  ownerState={{ expanded: state.expanded }}
                  color="default"
                  aria-disabled={state.expanded}
                >
                  <MdiIcon path={mdiMagnify} />
                </StyledToolbarButton>
              </Tooltip>
            )}
          />
          <QuickFilterControl
            render={({ ref, ...controlProps }, state) => (
              <StyledTextField
                {...controlProps}
                ownerState={{ expanded: state.expanded }}
                inputRef={ref}
                aria-label="Search"
                placeholder="Search..."
                size="small"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <MdiIcon path={mdiMagnify} />
                      </InputAdornment>
                    ),
                    endAdornment: state.value ? (
                      <InputAdornment position="end">
                        <QuickFilterClear
                          edge="end"
                          size="small"
                          aria-label="Clear search"
                          material={{ sx: { marginRight: -0.75 } }}
                        >
                          <MdiIcon path={mdiCancel} />
                        </QuickFilterClear>
                      </InputAdornment>
                    ) : null,
                    ...controlProps.slotProps?.input,
                  },
                  ...controlProps.slotProps,
                }}
              />
            )}
          />
        </StyledQuickFilter> */}
      </Toolbar>
    </Box>
  );
};

// function useDebouncedValue(value, delay = 500) {
//   const [debounced, setDebounced] = useState(value);
//   useEffect(() => {
//     const t = setTimeout(() => setDebounced(value), delay);
//     return () => clearTimeout(t);
//   }, [value, delay]);
//   return debounced;
// }

function Datatable({
  apiLink,
  customColumns = [],
  columnGroupingModel = [],
  exportFileName,
}) {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 25,
  });

  const [sortModel, setSortModel] = useState([]);
  const [filterModel, setFilterModel] = useState({
    items: [],
    logicOperator: "and",
    quickFilterValues: [],
    quickFilterLogicOperator: "and",
  });

  const debouncedQuick = useDebounced(filterModel.quickFilterValues, 450);

  const defaultFileName = useMemo(() => {
    const last = (apiLink || "").split("/").filter(Boolean).pop() || "export";
    const date = new Date().toISOString().slice(0, 10);
    return `${last}-${date}`;
  }, [apiLink]);

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: [
      "table",
      apiLink,
      paginationModel.page,
      paginationModel.pageSize,
      sortModel,
      { items: filterModel.items, qf: debouncedQuick },
    ],
    queryFn: async () => {
      // Build query params supporting common backends (Laravel, json-server, custom)
      const params = new URLSearchParams();

      // Pagination (DataGrid is 0-based; servers are commonly 1-based)
      const page1 = (paginationModel.page + 1).toString();
      const limit = paginationModel.pageSize.toString();
      // Standard names
      params.set("page", page1);
      params.set("per_page", limit);
      //   // json-server compatibility
      //   params.set("_page", page1);
      //   params.set("_limit", limit);

      // Sorting (single sort; extend for multi-sort if needed)
      const s = sortModel?.[0];
      if (s?.field) {
        params.set("sort_by", s.field);
        params.set("sort_dir", s.sort || "asc");
      }

      // Quick search
      if (debouncedQuick?.length) {
        params.set("global_search", debouncedQuick.join(" "));
        // json-server q parameter
        params.set("q", debouncedQuick.join(" "));
      }

      // Column filters
      if (filterModel.items?.length) {
        params.set("filters", JSON.stringify(filterModel.items));
      }

      if (!apiLink) {
        return { data: [], total: 0, page: 1, pageSize: 25 };
      }

      const url = `${apiLink}?${params.toString()}`;
      const res = await API.get(url);

      // Normalize various response shapes to { data, total, page, pageSize }
      const body = res.data;

      // json-server: body is array, total in header 'x-total-count'
      if (Array.isArray(body)) {
        const totalHeader =
          res.headers?.["x-total-count"] ?? res.headers?.["X-Total-Count"];
        const total = totalHeader ? parseInt(totalHeader, 10) : body.length;
        return {
          data: body,
          total,
          page: parseInt(page1, 10),
          pageSize: parseInt(limit, 10),
        };
      }

      // Laravel paginator shape
      if (
        body &&
        typeof body === "object" &&
        "current_page" in body &&
        "data" in body
      ) {
        return {
          data: body.data ?? [],
          total: body.total ?? body.data?.length ?? 0,
          page: body.current_page ?? parseInt(page1, 10),
          pageSize: body.per_page ?? parseInt(limit, 10),
        };
      }

      // Already normalized or custom shape { data: [], total, page?, pageSize? }
      if (body && typeof body === "object") {
        return {
          data: body.data ?? [],
          total: body.total ?? body.data?.length ?? 0,
          page: body.page ?? parseInt(page1, 10),
          pageSize: body.pageSize ?? parseInt(limit, 10),
        };
      }

      return {
        data: [],
        total: 0,
        page: parseInt(page1, 10),
        pageSize: parseInt(limit, 10),
      };
    },
    keepPreviousData: true,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });

  const rows = useMemo(() => {
    const list = data?.data ?? [];
    const page = data?.page ?? paginationModel.page + 1;
    return list.map((r, i) => ({
      id: `${page}-${r.id ?? i}`,
      ...r,
    }));
  }, [data]);

  //   const rows = useMemo(() => {
  //     const list = data?.data ?? [];
  //     return list.map((r, i) => ({
  //       id: r.id ?? r.uuid ?? r.rowNo ?? `${i}-${r?.email ?? ""}`,
  //       ...r,
  //     }));
  //   }, [data]);

  const [rowCountState, setRowCountState] = useState(0);
  useEffect(() => {
    if (typeof data?.total === "number") {
      setRowCountState(data.total);
    }
  }, [data?.total]);

  // // inspect what we send/receive
  // useEffect(() => {
  //   console.log({ paginationModel, sortModel, filterModel, data });
  // }, [paginationModel, sortModel, filterModel, data]);

  useEffect(() => {
    if (data?.page && data?.pageSize) {
      const next = { page: data.page - 1, pageSize: data.pageSize };
      setPaginationModel((prev) =>
        prev.page === next.page && prev.pageSize === next.pageSize ? prev : next
      );
    }
  }, [data?.page, data?.pageSize]);

  if (isError) return <p>Error: {error?.message ?? "Failed to fetch"}</p>;

  //   const toGridRows = (list) =>
  //     (list || []).map((item, index) => ({ ...item, rowNo: index + 1 }));

  return (
    <Fragment>
      <Box>
        <DataGrid
          sx={{ ...dataGridHeaders }}
          columnHeaderHeight={40}
          //   rows={toGridRows(rows)}
          rows={rows}
          columns={customColumns}
          columnGroupingModel={columnGroupingModel}
          loading={isLoading || isFetching}
          rowCount={rowCountState}
          getRowId={(opt) => opt.id}
          // --- server modes ---
          paginationMode="server"
          sortingMode="server"
          filterMode="server"
          // --- pagination ---
          paginationModel={paginationModel}
          onPaginationModelChange={(model) => {
            setPaginationModel((prev) =>
              prev.page === model.page && prev.pageSize === model.pageSize
                ? prev
                : model
            );
          }}
          pageSizeOptions={[10, 25, 50, 100]}
          // --- sorting ---
          sortModel={sortModel}
          onSortModelChange={setSortModel}
          // --- filtering (column + quick filter via toolbar) ---
          filterModel={filterModel}
          onFilterModelChange={setFilterModel}
          // custom toolbar preserved
          hideFooter={false}
          slots={{
            toolbar: CustomGridToolbar,
            footer: CustomFooterPagination,
          }}
          slotProps={{
            toolbar: {
              csvFileName: exportFileName || defaultFileName,
            },
          }}
          showToolbar
        />
      </Box>
    </Fragment>
  );
}

export default Datatable;
