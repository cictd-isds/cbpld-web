import { Button } from "@mui/material";
import { useMutateUserProfile } from "./hooks/mutation/useMutateUserProfile";

export default function LogoutAll() {
  const { logoutAllMutation } = useMutateUserProfile();
  return (
    <Button
      variant="contained"
      color="error"
      onClick={() => {
        logoutAllMutation.mutate();
        navigate("/");
      }}
    >
      Logout all devices
    </Button>
  );
}
