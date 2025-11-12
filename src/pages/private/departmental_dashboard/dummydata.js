export const summaryCards = [
  { title: "Total Users", value: 120 },
  { title: "Active Users", value: 110 },
  { title: "Inactive Users", value: 10 },
  { title: "Roles", value: 5 },
  { title: "Permissions", value: 28 },
];
export const usersByRole = {
  series: [50, 30, 20, 10],
  options: {
    labels: ["Admin", "Editor", "Inspector", "Viewer"],
    colors: ["#00E396", "#FEB019", "#008FFB", "#FF4560"],
    legend: { position: "bottom" },
  },
};
export const userGrowth = {
  series: [{ name: "New Users", data: [5, 10, 8, 12, 20, 15, 25] }],
  options: {
    chart: { type: "line", toolbar: { show: false } },
    xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    colors: ["#008FFB"],
    stroke: { curve: "smooth" },
  },
};
export const activeInactive = {
  series: [{ name: "Users", data: [110, 10] }],
  options: {
    chart: { type: "bar", toolbar: { show: false } },
    xaxis: { categories: ["Active", "Inactive"] },
    colors: ["#00E396", "#FF4560"],
    plotOptions: { bar: { borderRadius: 4 } },
  },
};
export const recentUsers = [
  {
    id: 1,
    name: "John Santos",
    email: "john.santos@example.com",
    role: "Admin",
    status: "Active",
    joined: "2025-10-22",
    lastLogin: "2025-11-11",
  },
  {
    id: 2,
    name: "Maria Lopez",
    email: "maria.lopez@example.com",
    role: "Editor",
    status: "Active",
    joined: "2025-10-25",
    lastLogin: "2025-11-09",
  },
  {
    id: 3,
    name: "Alex Cruz",
    email: "alex.cruz@example.com",
    role: "Viewer",
    status: "Inactive",
    joined: "2025-09-15",
    lastLogin: "2025-10-02",
  },
  {
    id: 4,
    name: "Sarah Lim",
    email: "sarah.lim@example.com",
    role: "Inspector",
    status: "Active",
    joined: "2025-11-05",
    lastLogin: "2025-11-11",
  },
  {
    id: 5,
    name: "Michael Tan",
    email: "michael.tan@example.com",
    role: "Admin",
    status: "Active",
    joined: "2025-11-01",
    lastLogin: "2025-11-12",
  },
];
