import { Avatar, CircularProgress } from "@mui/material";
import useQueryUserData from "../../pages/private/profile/hooks/query/useQueryUserData";
import { useMutateUserProfile } from "../../pages/private/profile/hooks/mutation/useMutateUserProfile";

export default function CustomUserAvatar({ size = 120 }) {
  const { userPhotoQuery } = useQueryUserData();
  const { uploadProfilePhotoMutation } = useMutateUserProfile();

  const photoUrl = userPhotoQuery.data;
  const photoLoading = userPhotoQuery.isFetching;
  const isUploading = uploadProfilePhotoMutation.isPending;
  return (
    <Avatar
      src={isUploading || photoLoading ? "" : photoUrl}
      sx={{ width: `${size}px`, height: `${size}px`, mx: "auto" }}
    >
      {(isUploading || photoLoading) && (
        <CircularProgress size={`${size - 10}px`} sx={{ color: "white" }} />
      )}
    </Avatar>
  );
}
