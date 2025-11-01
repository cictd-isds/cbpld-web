import React, { Fragment, useEffect, useMemo, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import BL from "../../assets/butuan_logo.jpg";
import { Grid, TextField, Box } from "@mui/material";
import LoginBackground from "../../assets/login_background.png";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import Home from "./Home";
import Faq from "./Faq";
import { useBoundStore } from "../../store/store";
import Register from "./Register";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router";
import ForgotPassForm from "./ForgotPassForm";
import CustomModal from "../../components/common/CustomModal";

const topNav = [
  {
    name: "HOME",
    component: <Home />,
  },
  {
    name: "FAQ",
    component: <Faq />,
  },
  {
    name: "ABOUT",
    component: "",
  },
  {
    name: "PARTNERS",
    component: "",
  },
];

function PublicLayout() {
  const navigate = useNavigate();
  const token = useBoundStore((state) => state.token);
  const [selectedNav, setSelectedNav] = useState(topNav[0]);
  const handleSelectedNav = (param) => setSelectedNav(param);

  const Component = useMemo(() => {
    return topNav?.find((a) => a.name === selectedNav?.name)?.component;
  }, [selectedNav]);
  const theme = useTheme();

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, []);

  return (
    <Box
      sx={{
        height: "100dvh",
        width: "100dvw",
        flexGrow: 1,
      }}
    >
      <Grid container>
        <Grid
          size={{ xs: 12, sm: 12, md: 8 }}
          sx={{
            backgroundColor: "#FFF",
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: {
              sm: "none",
              xs: "none",
              md: "flex",
              flexDirection: "column",
            },
          }}
        >
          <AppBarComponent
            handleSelectedNav={handleSelectedNav}
            selectedNav={selectedNav}
            nav={topNav}
          />
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedNav?.name} // 👈 important! tells Framer it's a new component
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                height: "calc(100dvh - 68px)",
                width: "100%",
                scrollbarWidth: "none",
                overflowY: "scroll",
                backgroundColor: theme.palette.background.default, // 👈 theme-aware
                color: theme.palette.text.primary,
              }}
            >
              {Component}
            </motion.div>
          </AnimatePresence>
        </Grid>
        <Grid
          size={{ xs: 12, sm: 12, md: 4 }}
          height="100dvh"
          sx={{
            backgroundColor: "background.dark",
            backgroundImage: `url(${LoginBackground})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LoginCard />
        </Grid>
      </Grid>
    </Box>
  );
}

export default PublicLayout;

function LoginCard() {
  const [isOpenRegister, setIsOpenRegister] = useState(false);
  const [isOpenForgotPass, setIsOpenForgotPass] = useState(false);

  return (
    <Card
      elavation={5}
      sx={{
        maxWidth: 600,
        minWidth: 400,
        borderRadius: 4,
        // background: "rgba(255, 255, 255, 0.1)", // translucent background
        // border: "1px solid rgba(255, 255, 255, 0.3)",
        // boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        // backdropFilter: "blur(10px) saturate(120%)",
        // WebkitBackdropFilter: "blur(10px) saturate(120%)", // Safari support
        // backgroundColor: "#FFF",
      }}
    >
      <CustomModal
        open={isOpenRegister}
        onClose={() => setIsOpenRegister(false)}
        title="Register"
        size="small"
      >
        <Register onClose={() => setIsOpenRegister(false)} />
      </CustomModal>
      <CardMedia
        sx={{
          height: 140,
          width: 140,
          my: 2,
          mx: "auto",
          borderRadius: "50%",
        }}
        image={BL}
        title="green iguana"
      />
      <CardContent sx={{ px: 3 }}>
        <LoginForm />
      </CardContent>
      <CardActions
        sx={{ display: "flex", justifyContent: "space-between", px: 5, py: 2 }}
      >
        <Typography
          color="primary.main"
          sx={{ cursor: "pointer" }}
          onClick={() => setIsOpenRegister(true)}
        >
          Register
        </Typography>
        <Typography
          color="error.main"
          sx={{ cursor: "pointer" }}
          onClick={() => setIsOpenForgotPass(true)}
        >
          Forgot Password?
        </Typography>
      </CardActions>
      <Fragment>
        <CustomModal
          open={isOpenForgotPass}
          onClose={() => setIsOpenForgotPass(false)}
          title="Forgot Password"
          size="small"
        >
          <ForgotPassForm />
        </CustomModal>
      </Fragment>
    </Card>
  );
}

function AppBarComponent({ handleSelectedNav, nav, selectedNav }) {
  const mode = useBoundStore((state) => state.mode);
  return (
    <Box sx={{ width: "100%" }}>
      <AppBar
        position="static"
        sx={{ bgcolor: mode === "light" ? "#424650" : "" }}
      >
        <Toolbar sx={{ display: "flex" }}>
          {nav.map((item) => (
            <Box display="flex" key={item.name} flexDirection="column" gap={1}>
              <Typography
                sx={{ minWidth: 80, cursor: "pointer" }}
                textAlign="center"
                onClick={() => handleSelectedNav(item)}
              >
                {item.name}
              </Typography>
              <Box
                sx={{
                  // marginTop: 1,
                  height: 3,
                  width: "100%",
                  bgcolor:
                    selectedNav.name === item.name ? "#FFF" : "transparent",
                  borderRadius: 100,
                }}
              ></Box>
            </Box>
          ))}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
