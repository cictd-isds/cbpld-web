import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Outlet, useNavigate } from "react-router";
import MuiSwitch from "../../components/common/MuiSwitch";
import { Badge, ListItemIcon } from "@mui/material";
import { allRoutes } from "../../routes/routeList";
import SideNavRecursive from "../../routes/SideNavRecursive";
import DeptLogo from "../../assets/department_logo.png";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import Icon from "@mdi/react";
import { mdiBell } from "@mdi/js";
import { useBoundStore } from "../../store/store";
import { yellow } from "@mui/material/colors";
import CustomBreadCrumbs from "../../components/common/CustomBreadCrumbs";
import useAuth from "../public/mutation/useAuth";
import CustomUserAvatar from "../../components/common/CustomUserAvatar";

const drawerWidth = 350;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    variants: [
      {
        props: ({ open }) => open,
        style: {
          transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: 0,
        },
      },
    ],
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Layout() {
  const { logoutMutation } = useAuth();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [anchorElAccount, setAnchorElAccount] = React.useState(null);
  const openAccount = Boolean(anchorElAccount);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClickAccount = (event) => {
    setAnchorElAccount(event.currentTarget);
  };
  const handleCloseAccount = () => {
    setAnchorElAccount(null);
  };

  const handleProfileNav = () => {
    navigate("/home/profile");
  };
  const mode = useBoundStore((state) => state.mode);

  const [openNodes, setOpenNodes] = useState({});

  useEffect(() => {
    if (!localStorage.getItem("app-storage")) {
      navigate("/");
    }
  });

  return (
    <Box sx={{ display: "flex", flexGrow: 1, width: "100dvw" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                mr: 2,
              },
              open && { display: "none" },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" flexGrow={1}>
            {import.meta.env.VITE_APP_DEPARTMENT}
          </Typography>
          <MuiSwitch />
          <IconButton size="small">
            <Badge badgeContent={4} color="secondary">
              <Icon
                path={mdiBell}
                color={mode === "dark" ? "#ffffff" : yellow[500]}
                size={1.2}
              />
            </Badge>
          </IconButton>
          <IconButton
            onClick={handleClickAccount}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <CustomUserAvatar size={32} />
          </IconButton>
          <Menu
            anchorEl={anchorElAccount}
            id="account-menu"
            open={openAccount}
            onClose={handleCloseAccount}
            onClick={handleCloseAccount}
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={() => handleProfileNav()}>
              <CustomUserAvatar size={32} />
              Profile
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleCloseAccount}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem
              onClick={() => {
                logoutMutation.mutate();
                navigate("/");
              }}
            >
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column", // 👈 make layout vertical
            justifyContent: "space-between", // 👈 top (nav) + bottom (user info)
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Box flexGrow={1} display="flex" alignItems="center">
            <Box
              sx={{
                height: 40,
                width: 40,
                borderRadius: "50%",
                overflow: "hidden",
              }}
            >
              <img src={DeptLogo} style={{ height: "100%", width: "auto" }} />
            </Box>
          </Box>

          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
          <List>
            <SideNavRecursive
              navs={allRoutes}
              parentPath=""
              openNodes={openNodes}
              setOpenNodes={setOpenNodes}
            />
          </List>
        </Box>
        <Box
          sx={{
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            borderTop: "1px solid rgba(0,0,0,0.12)",
          }}
        >
          <Box
            sx={{
              height: 40,
              width: 40,
              borderRadius: "50%",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <CustomUserAvatar size={40} />
          </Box>
          <Box sx={{ overflow: "hidden" }}>
            <Typography variant="body1" fontWeight="bold" noWrap>
              {"User Name"}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              {"user@example.com"}
            </Typography>
          </Box>

          <Box>
            <IconButton
              onClick={handleClickAccount}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <CustomUserAvatar size={32} />
            </IconButton>
            <Menu
              anchorEl={anchorElAccount}
              id="account-menu"
              open={openAccount}
              onClose={handleCloseAccount}
              onClick={handleCloseAccount}
              slotProps={{
                paper: {
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&::before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={() => handleProfileNav()}>
                <CustomUserAvatar size={32} />
                Profile
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleCloseAccount}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <MenuItem
                onClick={() => {
                  logoutMutation.mutate();
                  navigate("/");
                }}
              >
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Drawer>
      <Main
        open={open}
        sx={{
          p: 0,
          display: "flex",
          width: "100%",
          overflowX: "hidden",
          flex: 1,
          mt: "2rem",
        }}
      >
        <Box width="100dvw" height="calc(100dvh - 100px)" px={2}>
          <CustomBreadCrumbs />
          <Outlet />
        </Box>
      </Main>
    </Box>
  );
}
