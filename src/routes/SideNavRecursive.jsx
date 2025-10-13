import React, { useCallback, useMemo } from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Link, useLocation } from "react-router";
import { useTheme } from "@mui/material/styles";
import { useBoundStore } from "../store/store";

const SideNavRecursive = ({
  navs,
  parentPath = "",
  openNodes,
  setOpenNodes,
}) => {
  // const [selectedPath, setSelectedPath] = useState("");
  const mode = useBoundStore((state) => state.mode);
  const handleClick = useCallback(
    (path) => {
      setOpenNodes((prev) => ({
        ...prev,
        [path]: !prev[path],
      }));
    },
    [setOpenNodes]
  );
  const location = useLocation();
  console.log("selected", location.pathname);

  const theme = useTheme();

  const renderedNavs = useMemo(() => {
    return navs?.map((nav) => {
      const fullPath = parentPath ? `${parentPath}/${nav.path}` : nav.path;
      console.log("full", fullPath);
      if (nav.index) {
        return;
      }
      if (nav.children?.length) {
        return (
          <React.Fragment key={fullPath}>
            <ListItemButton onClick={() => handleClick(fullPath)}>
              <ListItemIcon>{nav.icon}</ListItemIcon>
              <ListItemText primary={nav.name} />
              {openNodes[fullPath] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openNodes[fullPath]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ pl: 7 }}>
                <SideNavRecursive
                  navs={nav.children}
                  parentPath={fullPath}
                  openNodes={openNodes}
                  setOpenNodes={setOpenNodes}
                />
              </List>
            </Collapse>
          </React.Fragment>
        );
      }

      return (
        <Link
          to={fullPath}
          style={{
            textDecoration: "none",
            color: mode === "light" ? "#333333" : "#ffffff",
          }}
        >
          <ListItemButton
            sx={{
              bgcolor:
                location.pathname === `/home/${fullPath}`
                  ? "nav.highlight"
                  : "transparent",
              "&:hover": {
                bgcolor:
                  location.pathname === `/home/${fullPath}`
                    ? "nav.highlight"
                    : theme.palette.action.hover,
              },
            }}
            key={fullPath}
          >
            <ListItemIcon>{nav.icon}</ListItemIcon>
            <ListItemText primary={nav.name} />
          </ListItemButton>
        </Link>
      );
    });
  }, [navs, parentPath, openNodes, handleClick, location.pathname, mode]);

  return <>{renderedNavs}</>;
};

export default React.memo(SideNavRecursive);
