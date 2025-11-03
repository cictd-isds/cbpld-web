import React, { useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { userProfileSchema } from "../../../utils/schemas/authSchema";
import useAuth from "../../public/mutation/useAuth";
import { useUpdateUserProfile } from "./hooks/mutation/useUpdateUserProfile";

const schema = userProfileSchema;
export default function ProfileTab({ prevData }) {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (prevData) {
      reset(prevData); // 👈 prefill when edit data arrives
    }
  }, [prevData, reset]);

  const { putProfileMutation } = useUpdateUserProfile();

  const submit = handleSubmit((data) => {
    // console.log("data");
    console.log(data);
    putProfileMutation.mutate(data);
    // onClose();
  });
  if (!prevData) return null;
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

      <Button
        variant="contained"
        type="submit"
        size="large"
        // loading={registerMutation?.isPending}
        sx={{ borderRadius: 25 }}
      >
        Save Changes
      </Button>
    </form>
  );
}
