import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { allRoutes } from "../../routes/routeList";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

function CustomBreadCrumbs() {
  const location = useLocation();
  const tokenizedLocation = location.pathname.slice(1).split("/");
  // console.log("tokenizedLocation", tokenizedLocation);
  // console.log("allRoutes", allRoutes);
  const reducer2 = [];
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const contentRef = useRef(null);
  const [width, setWidth] = useState(0);

  tokenizedLocation.map((item, index) => {
    reducer2.push(tokenizedLocation.slice(0, index + 1));
  });

  const handleNavigate = (item) => {
    navigate("/home" + item);
  };

  const handleClick = (event) => {
    if (event) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const buildPathArray = (allRoutes, tokenizedLocation) => {
    const result = [];
    let currentLevel = allRoutes;
    let accumulatedPath = "";

    // Skip "home" if it's not part of your route tree
    const segments =
      tokenizedLocation[0] === "home"
        ? tokenizedLocation.slice(1)
        : tokenizedLocation;

    // Build the route objects first
    for (const segment of segments) {
      const found = currentLevel.find((r) => r.path === segment);

      if (found) {
        accumulatedPath += `/${found.path}`;

        result.push({
          path: accumulatedPath,
          name: found.name,
          icon: found.icon,
        });

        currentLevel = found.children || [];
      } else {
        break;
      }
    }

    // Add the "hide" property based on the rule
    if (segments.length >= 6) {
      const lastIndex = result.length - 1;
      const secondToLast = lastIndex - 1;

      result.forEach((item, index) => {
        if (
          index === 0 || // first
          index === 1 || // second
          index === secondToLast || // second to last
          index === lastIndex // last
        ) {
          item.hide = false;
        } else {
          item.hide = true;
        }
      });
    } else {
      // If fewer than 6, show all
      result.forEach((item) => (item.hide = false));
    }

    return result;
  };

  const breadcrumbs = buildPathArray(allRoutes, tokenizedLocation);
  console.log("breadcrumbs2", breadcrumbs);
  let showHidden = true;

  useEffect(() => {
    if (contentRef.current) {
      setWidth(contentRef.current.offsetWidth);
    }
  }, [tokenizedLocation]);

  if (breadcrumbs.length) {
    return (
      <>
        <Box sx={{ paddingY: 1 }}>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            aria-labelledby="with-menu-demo-breadcrumbs"
          >
            {breadcrumbs
              .filter((item) => item.hide)
              .map((item, index) => (
                <MenuItem
                  key={index}
                  onClick={() => handleNavigate(item.path)}
                  sx={{ color: breadStyle.passiveRoute }}
                >
                  <IconContainer icon={item.icon} />
                  <Typography>{item.name}</Typography>
                </MenuItem>
              ))}
          </Menu>
          <Paper
            sx={{
              transition: "width 0.3s ease",
              overflow: "hidden",
              whiteSpace: "nowrap",
              width: width ? `${width}px` : "auto",
            }}
          >
            <Box
              sx={{
                width: "max-content",
                padding: "0px 25px",
                display: "flex",
                alignItems: "center",
                gap: 2,
                my: 1,
                flexWrap: "wrap",
              }}
              ref={contentRef}
            >
              {breadcrumbs.map((item, index) => {
                if (item.hide === false) {
                  return (
                    <>
                      <Tooltip
                        title={
                          <Typography
                            sx={{ fontSize: ".8rem", fontWeight: 500 }}
                          >
                            {item.name}
                          </Typography>
                        }
                        placement="top"
                        arrow
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            color:
                              index === 0
                                ? breadStyle.firstRoute
                                : index === breadcrumbs.length - 1
                                ? breadStyle.lastRoute
                                : breadStyle.passiveRoute,
                            cursor: "pointer",
                            backgroundColor:
                              index === breadcrumbs.length - 1 && index > 0
                                ? blue[100]
                                : "transparent", // 👈 add bg color
                            borderRadius:
                              index === breadcrumbs.length - 1 ? "6px" : "0px",
                            padding: "10px 10px",
                          }}
                          onClick={() => handleNavigate(item.path)}
                        >
                          <IconContainer icon={item.icon} />
                          <Typography
                            sx={{
                              fontWeight:
                                index === breadcrumbs.length - 1 ? 500 : "",
                              maxWidth:
                                index === breadcrumbs.length - 1
                                  ? "none"
                                  : "120px", // 👈 allow full width for last
                              overflow:
                                index === breadcrumbs.length - 1
                                  ? "visible"
                                  : "hidden",
                              textOverflow:
                                index === breadcrumbs.length - 1
                                  ? "clip"
                                  : "ellipsis",
                              whiteSpace:
                                index === breadcrumbs.length - 1
                                  ? "normal"
                                  : "nowrap",
                            }}
                          >
                            {item.name}
                          </Typography>
                        </Box>
                      </Tooltip>
                      <Separator
                        currentIndex={index}
                        length={breadcrumbs.length - 1}
                      />
                    </>
                  );
                } else {
                  return (
                    <>
                      {showHidden && (
                        <>
                          <IconButton
                            color="primary"
                            size="small"
                            onClick={handleClick}
                          >
                            <MoreHorizIcon />
                          </IconButton>
                          <Separator
                            currentIndex={index}
                            length={breadcrumbs.length - 1}
                          />
                        </>
                      )}
                      {(showHidden = false)}
                    </>
                  );
                }
              })}
            </Box>
          </Paper>
        </Box>
      </>
    );
  }
}

const Separator = ({ currentIndex, length }) => {
  console.log("separator", currentIndex, length);
  return (
    currentIndex !== length && (
      <NavigateNextIcon
        fontSize="small"
        sx={{ color: breadStyle.passiveRoute }}
      />
    )
  );
};

const IconContainer = ({ icon }) => {
  {
    return (
      icon &&
      React.cloneElement(icon, {
        size: 0.8,
        style: {
          marginRight: "4px",
          verticalAlign: "middle",
        },
      })
    );
  }
};

const breadStyle = {
  firstRoute: blue[500],
  lastRoute: blue[700],
  passiveRoute: grey[600],
};
export default CustomBreadCrumbs;
