export const inspectionTrend = {
  series: [
    { name: "Completed", data: [10, 20, 30, 40, 35, 50, 60] },
    { name: "Pending", data: [15, 25, 20, 30, 25, 40, 45] },
  ],
  options: {
    chart: { type: "line", height: 350, toolbar: { show: false } },
    xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    stroke: { curve: "smooth" },
    colors: ["#00E396", "#FEB019"],
  },
};

export const recentInspections = [
  {
    id: 1,
    building: "Sunrise Tower",
    inspector: "John Santos",
    date: "2025-11-10",
    status: "Completed",
    issues: "2 Minor",
  },
  {
    id: 2,
    building: "Oceanview Residences",
    inspector: "Maria Lopez",
    date: "2025-11-11",
    status: "Pending",
    issues: "-",
  },
  {
    id: 3,
    building: "Central Mall",
    inspector: "Alex Cruz",
    date: "2025-11-09",
    status: "In Progress",
    issues: "3 Major",
  },
  {
    id: 4,
    building: "Greenfield Apartments",
    inspector: "Sarah Lim",
    date: "2025-11-08",
    status: "Completed",
    issues: "1 Critical",
  },
  {
    id: 5,
    building: "TechPark Building A",
    inspector: "Michael Tan",
    date: "2025-11-07",
    status: "Completed",
    issues: "None",
  },
  {
    id: 6,
    building: "Metro City Hall",
    inspector: "Angela Torres",
    date: "2025-11-06",
    status: "Pending",
    issues: "-",
  },
  {
    id: 7,
    building: "Skyline Offices",
    inspector: "Patrick Dela Cruz",
    date: "2025-11-05",
    status: "Completed",
    issues: "4 Minor",
  },
];

// --- Chart 1: Inspection Status Pie ---
export const statusChart = {
  series: [12, 22, 66],
  options: {
    chart: { type: "pie" },
    labels: ["Pending", "Ongoing", "Completed"],
    colors: ["#FFB547", "#007BFF", "#00C49F"],
    legend: { position: "bottom" },
  },
};

// --- Chart 3: Issue Breakdown by Type ---
export const issueChart = {
  series: [21, 15, 12, 8, 5],
  options: {
    chart: { type: "donut" },
    labels: ["Structural", "Fire Safety", "Electrical", "Plumbing", "Others"],
    colors: ["#FF6384", "#FFB547", "#36A2EB", "#4BC0C0", "#9966FF"],
    legend: { position: "bottom" },
  },
};

export const summaryCards = [
  { label: "Total Buildings", value: 128 },
  { label: "Pending Inspections", value: 12 },
  { label: "Completed", value: 104 },
  { label: "Issues Found", value: 37 },
];
