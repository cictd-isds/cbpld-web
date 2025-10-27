import { useEffect, useState } from "react";
import API from "../../utils/api/apiClient";
import { useLocation } from "react-router";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

export default function Verify() {
  const location = useLocation();
  const [status, setStatus] = useState("pending");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const url = queryParams.get("url");
    if (url) {
      API.get(url) // if Sanctum
        .then((res) => {
          setStatus("success");
          setMessage(res.data.message);
        })
        .catch((err) => {
          setStatus("error");
          setMessage(
            err.response?.data?.message || err.message || "An error occurred"
          );
        });
    } else {
      setStatus("Invalid verification link");
    }
  }, [location]);

  return (
    <Container>
      <Box>
        {status === "pending" ? (
          <Box display="flex" alignItems={"center"} gap={2}>
            <CircularProgress size={24} />
            <Typography color="primary" fontSize={18}>
              Verifying
            </Typography>
          </Box>
        ) : status === "success" ? (
          <Box color="green">{message}</Box>
        ) : status === "error" ? (
          <Box color="red">{message}</Box>
        ) : (
          <Box color="green">{message}</Box>
        )}
      </Box>
    </Container>
  );
}
