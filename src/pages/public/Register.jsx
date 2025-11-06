import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { registerSchema } from "../../utils/schemas/authSchema";
import useAuth from "./mutation/useAuth";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

const schema = registerSchema;

export default function Register({ onClose }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { registerMutation } = useAuth();

  const submit = handleSubmit((data) => {
    console.log(data);
    registerMutation.mutate(data, {
      onSuccess: () => onClose(),
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
        label="Name"
        {...register("name")}
        error={!!errors.name}
        helperText={errors.name?.message}
      />

      <TextField
        label="Email"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

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
        {...register("confirmPassword")}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
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
        loading={registerMutation?.isPending}
        sx={{ borderRadius: 25 }}
      >
        Register
      </Button>
    </form>
  );
}
