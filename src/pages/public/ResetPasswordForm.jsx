import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import useAuth from "./mutation/useAuth";
import CustomAlert from "../../components/common/CustomAlert";
import { useState } from "react";
import { resetPassSchema } from "../../utils/schemas/authSchema";
import { useSearchParams } from "react-router";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const schema = resetPassSchema;
export default function ResetPasswordForm({ token, email }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [alert, setAlert] = useState({
    open: false,
    severity: "",
    message: "",
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { resetPassMutation } = useAuth();

  const submit = handleSubmit((data) => {
    console.log(data);
    resetPassMutation.mutate(
      { ...data, token, email },
      {
        onSuccess: (response) => {
          setAlert({
            open: true,
            severity: "success",
            message: response.message, // from your fake request
          });
        },
        onError: (error) => {
          setAlert({
            open: true,
            severity: "error",
            message: error.message, // from reject(new Error(...))
          });
        },
      }
    );
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
      {alert.message && (
        <Box mb={2}>
          <CustomAlert
            severity={alert.severity}
            title={alert.title}
            message={alert.message}
          />
        </Box>
      )}
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
        loading={resetPassMutation?.isPending}
        sx={{ borderRadius: 25 }}
      >
        Submit
      </Button>
    </form>
  );
}
