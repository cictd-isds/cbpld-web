import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Box, TextField, Tooltip, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { loginSchema } from "../../utils/schemas/authSchema";
import useAuth from "./mutation/useAuth";
import { useEffect, useState } from "react";
import CustomAlert from "../../components/common/CustomAlert";

const schema = loginSchema;

export default function LoginForm() {
  const { loginMutation } = useAuth();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [alert, setAlert] = useState({
    open: false,
    severity: "",
    message: "",
  });
  const [countdown, setCountdown] = useState(0);

  // ⏳ Countdown effect
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const submit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSettled: (response) => {
        console.log("loginres", response);
      },
      onError: (response) => {
        const seconds = response?.response?.data?.errors?.seconds?.[0];
        if (seconds) {
          setCountdown(Number(seconds));
          setAlert({
            open: true,
            severity: "error",
          });
        } else {
          setCountdown(0);
          setAlert({
            open: false,
          });
        }
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
      <Typography textAlign="center" color="primary.main" variant="h6">
        Sign-in
      </Typography>
      {alert.open && countdown > 0 && (
        <Tooltip
          title={`This email has reached the maximum login attempts and is temporarily locked for ${countdown} ${
            countdown > 1 ? "seconds" : "second"
          }.`}
          arrow
          placement="top"
        >
          <Box mb={2}>
            <CustomAlert
              severity={alert.severity}
              title={alert.title}
              message={`Please try again in ${countdown} ${
                countdown > 1 ? "seconds" : "second"
              }`}
            />
          </Box>
        </Tooltip>
      )}

      <TextField
        label="Email"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        label="Password"
        {...register("password")}
        type="password"
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      <Button
        variant="contained"
        type="submit"
        size="large"
        loading={loginMutation?.isPending}
        sx={{ borderRadius: 25 }}
      >
        Login
      </Button>
    </form>
  );
}
