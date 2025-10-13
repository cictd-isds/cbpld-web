import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import useAuth from "./mutation/useAuth";
import { Box } from "@mui/material";

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

export default function Register() {
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
    registerMutation.mutate(data);
  });

  return (
    <form
      onSubmit={submit}
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box flex={1} display="flex" flexDirection="column" gap={3} pt={2}>
        <TextField
          variant="outlined"
          {...register("name")}
          placeholder="name"
          fullWidth
        />
        <TextField
          fullWidth
          variant="outlined"
          {...register("email")}
          placeholder="email"
          type="email"
        />
        <TextField
          fullWidth
          variant="outlined"
          {...register("password")}
          placeholder="password"
        />
      </Box>
      <Button variant="contained" type="submit">
        Register
      </Button>
    </form>
  );
}
