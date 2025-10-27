import { Box } from "@mui/material";
import { useBoundStore } from "../store/store";
import { useNavigate } from "react-router";

function PrivateRoute({ children }) {
  const navigate = useNavigate();
  const token = useBoundStore((state) => state.token);
  if (!token) {
    navigate("/");
  }
  return <Box>{children}</Box>;
}

export default PrivateRoute;
