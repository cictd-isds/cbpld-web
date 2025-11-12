import {
  Box,
  Button,
  Card,
  Chip,
  Grid,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Chart from "react-apexcharts";
import React, { Fragment } from "react";
import {
  inspectionTrend,
  issueChart,
  recentInspections,
  statusChart,
  summaryCards,
} from "./dummydata";

export default function Dashboard() {
  return (
    <Fragment>
      <Box p={3}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h5" fontWeight="bold">
            Building Inspection Dashboard
          </Typography>
          <Box display="flex" gap={2}>
            <Select size="small" value={"month"}>
              <MenuItem value="month">This Month</MenuItem>
              <MenuItem value="week">This Week</MenuItem>
              <MenuItem value="year">This Year</MenuItem>
            </Select>
            <Button variant="contained" color="primary">
              Export Report
            </Button>
          </Box>
        </Box>

        {/* --- Summary Cards --- */}
        <Grid
          container
          spacing={2}
          mb={4}
          direction="row"
          sx={{
            justifyContent: "center",
            alignItems: "stretch",
          }}
        >
          {summaryCards.map((card) => (
            <Grid item size={3} key={card.label}>
              <Box
                sx={{
                  bgcolor: "white",
                  p: 3,
                  borderRadius: 2,
                  textAlign: "center",
                  boxShadow: 1,
                  transition: "0.3s",
                  "&:hover": { boxShadow: 3, transform: "translateY(-3px)" },
                  height: "100%",
                }}
              >
                <Typography variant="h6" color="text.secondary">
                  {card.label}
                </Typography>
                <Typography variant="h4" fontWeight="bold" color="primary">
                  {card.value}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* --- Charts Section --- */}
        <Grid container spacing={3}>
          {/* Pie Chart - Inspection Status */}
          <Grid item size={4}>
            <Box
              sx={{
                bgcolor: "white",
                p: 2,
                borderRadius: 2,
                boxShadow: 1,
                height: "100%",
              }}
            >
              <Typography variant="h6" mb={2}>
                Inspection Status
              </Typography>
              <Chart
                options={statusChart.options}
                series={statusChart.series}
                type="pie"
                height={300}
              />
            </Box>
          </Grid>

          {/* Line Chart - Monthly Trends */}
          <Grid item size={8}>
            <Box
              sx={{
                bgcolor: "white",
                p: 2,
                borderRadius: 2,
                boxShadow: 1,
                height: "100%",
              }}
            >
              <Typography variant="h6" mb={2}>
                Monthly Inspection Trends
              </Typography>
              <Chart
                options={inspectionTrend.options}
                series={inspectionTrend.series}
                type="line"
                height={300}
              />
            </Box>
          </Grid>

          {/* Donut Chart - Issue Breakdown */}
        </Grid>
        <Grid
          container
          spacing={2}
          mb={4}
          direction="row"
          sx={{
            justifyContent: "center",
            alignItems: "stretch",
            marginTop: 2,
          }}
        >
          <Grid item xs={12} size={6}>
            <Box
              sx={{
                bgcolor: "white",
                p: 2,
                borderRadius: 2,
                boxShadow: 1,
                height: "100%",
              }}
            >
              <Typography variant="h6" mb={2}>
                Issue Breakdown by Type
              </Typography>
              <Chart
                options={issueChart.options}
                series={issueChart.series}
                type="donut"
                height={"90%"}
              />
            </Box>
          </Grid>

          {/* Table Placeholder */}

          <Grid item size={6}>
            <Box
              sx={{
                bgcolor: "white",
                p: 2,
                borderRadius: 2,
                boxShadow: 1,
              }}
            >
              <Typography variant="h6" mb={2}>
                Recent Inspections
              </Typography>
              <Box
                sx={{
                  fontSize: 16,
                  color: "gray",
                }}
              >
                <TableContainer sx={{ maxHeight: 440 }}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell>Building</TableCell>
                        <TableCell>Inspector</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Issues</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {recentInspections.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell>{row.building}</TableCell>
                          <TableCell>{row.inspector}</TableCell>
                          <TableCell>{row.date}</TableCell>
                          <TableCell>
                            <Chip
                              label={row.status}
                              color={
                                row.status === "Completed"
                                  ? "success"
                                  : row.status === "Pending"
                                  ? "warning"
                                  : "info"
                              }
                              size="small"
                            />
                          </TableCell>
                          <TableCell>{row.issues}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
}
