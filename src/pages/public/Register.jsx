import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { registerSchema } from "../../utils/schemas/authSchema";
import useAuth from "./mutation/useAuth";

const schema = registerSchema;
export default function Register({ onClose }) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { registerMutation } = useAuth();

  const submit = handleSubmit((data) => {
    // console.log("data");
    console.log(data);
    registerMutation.mutate(data);
    onClose();
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
        Register
      </Typography>
      <TextField
        variant="outlined"
        placeholder="Name"
        label="Name"
        {...register("name")}
      />
      {errors?.name && <p>{errors.name.message}</p>}
      <TextField
        variant="outlined"
        placeholder="Email"
        label="Email"
        {...register("email")}
      />
      {errors?.email && <p>{errors.email.message}</p>}
      <TextField
        variant="outlined"
        label="Password"
        placeholder="Password"
        {...register("password")}
        type="password"
      />
      {errors?.password && <p>{errors.password.message}</p>}
      <TextField
        variant="outlined"
        label="Confirm Password"
        placeholder="Confirm Password"
        {...register("confirmPassword")}
        type="password"
      />
      {errors?.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      <Button
        variant="contained"
        type="submit"
        size="large"
        sx={{ borderRadius: 25 }}
      >
        Login
      </Button>
    </form>
  );
}
