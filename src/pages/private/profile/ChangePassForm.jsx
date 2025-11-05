import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useMutateUserProfile } from "./hooks/mutation/useMutateUserProfile";
import { changePassSchema } from "../../../utils/schemas/authSchema";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const schema = changePassSchema;
export default function ChangePassForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { putProfileMutation } = useMutateUserProfile();
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submit = handleSubmit((data) => {
    console.log(data);
    putProfileMutation.mutate(data, {
      onSuccess: () => {
        reset();
      },
    });
  });
  return (
    <form
      onSubmit={submit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 30,
        padding: 5,
      }}
    >
      <TextField
        type={showPassword ? "text" : "password"}
        label="New Password"
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword((prev) => !prev)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <TextField
        type={showConfirm ? "text" : "password"}
        label="Confirm New Password"
        {...register("password_confirmation")}
        error={!!errors.password_confirmation}
        helperText={errors.password_confirmation?.message}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowConfirm((prev) => !prev)}
                edge="end"
              >
                {showConfirm ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button
        variant="contained"
        type="submit"
        size="large"
        loading={putProfileMutation?.isPending}
        sx={{ borderRadius: 25 }}
      >
        Change Password
      </Button>
    </form>
  );
}
