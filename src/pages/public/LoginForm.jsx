import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { loginSchema } from "../../utils/schemas/authSchema";
import useAuth from "./mutation/useAuth";

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

  const submit = handleSubmit((data) => {
    loginMutation.mutate(data);
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
      <TextField
        variant="outlined"
        placeholder="Email"
        label="Email"
        {...register("email")}
      />
      {errors?.username && <p>{errors.username.message}</p>}
      <TextField
        variant="outlined"
        label="Password"
        placeholder="Password"
        {...register("password")}
        type="password"
      />
      {errors?.password && <p>{errors.password.message}</p>}
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
