import {
  Grid,
  Box,
  Typography,
  Paper,
  Button,
  Badge,
  Menu,
  MenuItem,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useEffect, useState } from "react";
import ProfileTab from "./ProfileTab";
import useQueryUserData from "./hooks/query/useQueryUserData";
import { useMutateUserProfile } from "./hooks/mutation/useMutateUserProfile";
import CustomUserAvatar from "../../../components/common/CustomUserAvatar";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ChangePassForm from "./ChangePassForm";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LogoutAll from "./LogoutAll";

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
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { userDataQuery, userPhotoQuery } = useQueryUserData();
  useMutateUserProfile();
  const { uploadProfilePhotoMutation, deleteProfilePhotoMutation } =
    useMutateUserProfile();
  const photoLoading = userPhotoQuery.isFetching;
  const isUploading = uploadProfilePhotoMutation.isPending;
  const [profileData, setProfileData] = useState(null);
  const userData = userDataQuery.data;

  useEffect(() => {
    // console.log("userData", userData);
    setProfileData(userData);
  }, [userData]);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && userData?.id) {
      uploadProfilePhotoMutation.mutate({ userId: userData.id, file });
    }
    handleClose();
  };

  const handleDeletePhoto = () => {
    deleteProfilePhotoMutation.mutate();

    handleClose();
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
          minWidth={"300px"}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",

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
            <Badge
              color="primary"
              overlap="circular"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              badgeContent={
                <>
                  <Button
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    sx={{ borderRadius: "50%", width: 40, height: 40 }}
                    loading={photoLoading || isUploading}
                    loadingIndicator={
                      <CircularProgress size={20} sx={{ color: "white" }} /> // 👈 custom color
                    }
                  >
                    {photoLoading || isUploading ? (
                      ""
                    ) : (
                      <MoreHorizIcon sx={{ color: "white" }} />
                    )}
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    slotProps={{
                      list: {
                        "aria-labelledby": "basic-button",
                      },
                    }}
                  >
                    <MenuItem component="label">
                      Upload Photo
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </MenuItem>
                    <MenuItem onClick={handleDeletePhoto}>
                      Remove Photo
                    </MenuItem>
                  </Menu>
                </>
              }
              sx={{
                "& .MuiBadge-badge": {
                  color: "#fff",
                  borderRadius: "50%",
                  border: "2px solid #fff",
                  width: 40,
                  height: 40,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  boxShadow: 2,
                  overflow: "hidden",
                },
              }}
            >
              <CustomUserAvatar size={150} />
            </Badge>
            <Typography variant="h6">{profileData?.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {profileData?.email}
            </Typography>
          </Paper>
        </Grid>

        {/* Right Section - User Info */}
        <Grid item size="grow">
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
                <ProfileTab />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <Typography component="span">Account Management</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <LogoutAll />
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <Typography component="span">
                      Password Management
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ChangePassForm />
                  </AccordionDetails>
                </Accordion>
              </CustomTabPanel>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Profile;
