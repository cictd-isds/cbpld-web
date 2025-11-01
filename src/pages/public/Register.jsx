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
    // onClose();
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
      {/* <Typography textAlign="center" color="primary.main" variant="h6">
        Register
      </Typography> */}
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
        label="Password"
        {...register("password")}
        type="password"
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      <TextField
        label="Confirm Password"
        {...register("confirmPassword")}
        type="password"
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
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
