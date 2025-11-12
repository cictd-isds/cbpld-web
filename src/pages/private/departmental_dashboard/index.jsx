import {
  Box,
  Button,
  Card,
  Chip,
  Grid,
  MenuItem,
  Paper,
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
import {
  activeInactive,
  recentUsers,
  summaryCards,
  userGrowth,
  usersByRole,
} from "./dummydata";

export default function Departmental_dashboard() {
  return (
    <Box sx={{ p: 3 }}>
      {/* Summary Cards */}
      <Grid container spacing={2} mb={3}>
        {summaryCards.map((card) => (
          <Grid item size={2.4} key={card.title}>
            <Paper
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
                {card.title}
              </Typography>
              <Typography variant="h4" fontWeight="bold" color="primary">
                {card.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Charts */}
      <Grid
        container
        spacing={3}
        direction="row"
        sx={{
          justifyContent: "center",
          alignItems: "stretch",
        }}
      >
        <Grid item size={4}>
          <Paper sx={{ p: 2, height: "100%" }}>
            <Typography variant="h6" mb={2}>
              Users by Role
            </Typography>
            <Chart
              options={usersByRole.options}
              series={usersByRole.series}
              type="donut"
              height={300}
            />
          </Paper>
        </Grid>
        <Grid item size={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" mb={2}>
              New Users Over Time
            </Typography>
            <Chart
              options={userGrowth.options}
              series={userGrowth.series}
              type="line"
              height={300}
            />
          </Paper>
        </Grid>
        <Grid item size={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" mb={2}>
              Active vs Inactive Users
            </Typography>
            <Chart
              options={activeInactive.options}
              series={activeInactive.series}
              type="bar"
              height={300}
            />
          </Paper>
        </Grid>
      </Grid>

      {/* Recent Users Table */}
      <Paper sx={{ p: 2, marginTop: 2 }}>
        <Typography variant="h6" mb={2}>
          Recent Users
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Joined</TableCell>
              <TableCell>Last Login</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recentUsers.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell>
                  <Chip
                    label={row.status}
                    color={row.status === "Active" ? "success" : "default"}
                    size="small"
                  />
                </TableCell>
                <TableCell>{row.joined}</TableCell>
                <TableCell>{row.lastLogin}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
