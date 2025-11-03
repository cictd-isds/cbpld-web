import DynamicForm from "../../../components/DynamicForm ";
import {
  Grid,
  Box,
  Typography,
  Avatar,
  useMediaQuery,
  Paper,
  Button,
} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import useFetchUsersProfile from "./hooks/query/useFetchUsersProfile";
import ProfileTab from "./ProfileTab";

const userToEdit = {
  firstName: "Maria",
  lastName: "Santos",
  gender: "Female",
  department: "HR",
  position: "Manager",
  // etc...
};

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
function Profile() {
  const { data: userData, isLoading: userLoading } = useFetchUsersProfile();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    console.log("userData", userData);
    setProfileData(userData);
  }, [userData]);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // Example user data
  const user = {
    name: "Juan Dela Cruz",
    position: "Software Engineer",
    department: "IT Department",
    email: "juan.delacruz@example.com",
    contact: "09123456789",
    image: "https://via.placeholder.com/200x200.png?text=Profile+Image",
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        p: { xs: 2, sm: 4 },
      }}
    >
      <Grid
        container
        spacing={4}
        sx={{
          // bgcolor: "blue",
          justifyContent: "center",
          alignItems: "flex-start",
          p: { xs: 2, sm: 3 },
        }}
      >
        {/* Left Section - Profile Image */}
        <Grid
          item
          size={{ xs: 12, sm: 12, md: 2 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            // borderRight: {
            //   sm: "1px solid #e0e0e0",
            //   xs: "none",
            // },
            mb: { xs: 2, sm: 0 },
          }}
        >
          <Paper
            sx={{
              padding: 2,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              src={user.image}
              alt={profileData?.name}
              sx={{
                width: "80%", // 👈 scales to 50% of the container width
                height: "auto", // maintain aspect ratio (optional)
                aspectRatio: "1 / 1", // ensures it stays a circle
                mb: 2,
              }}
            />
            <Typography variant="h6">{profileData?.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {user.position}
            </Typography>
          </Paper>
        </Grid>

        {/* Right Section - User Info */}
        <Grid
          item
          size="grow"
          // sx={{
          //   pl: { sm: 3, xs: 0 },
          // }}
        >
          <Paper sx={{ padding: 2 }}>
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  sx={{
                    "& .MuiTab-root": {
                      "&:focus": { outline: "none" },
                      "&:focus-visible": { outline: "none" },
                    },
                  }}
                >
                  <Tab label="Edit profile" {...a11yProps(0)} />
                  <Tab label="Account settings" {...a11yProps(1)} />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                {/* <DynamicForm editData={userToEdit} /> */}
                <ProfileTab prevData={profileData} />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <Button variant="contained">Logout all devices</Button>
              </CustomTabPanel>
            </Box>
            {/* <Box
              sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}
            >
              <InfoItem label="Department" value={user.department} />
              <InfoItem label="Email" value={user.email} />
              <InfoItem label="Contact Number" value={user.contact} />
              <InfoItem label="Country" value="Philippines" />
            </Box> */}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

// Reusable Info display component
const InfoItem = ({ label, value }) => (
  <Box>
    <Typography variant="body2" color="text.secondary">
      {label}
    </Typography>
    <Typography variant="body1" sx={{ fontWeight: 500 }}>
      {value || "-"}
    </Typography>
  </Box>
);

export default Profile;
