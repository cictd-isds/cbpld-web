import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Avatar, CircularProgress, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { userProfileSchema } from "../../../utils/schemas/authSchema";
import useAuth from "../../public/mutation/useAuth";
import { useUpdateUserProfile } from "./hooks/mutation/useUpdateUserProfile";
import useFetchUsersProfile from "./hooks/query/useFetchUsersProfile";

const schema = userProfileSchema;
export default function ProfileTab({ prevData }) {
  const {
    // handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // useEffect(() => {
  //   if (prevData) {
  //     reset(prevData); // 👈 prefill when edit data arrives
  //   }
  // }, [prevData, reset]);

  const { data: userData, isLoading: userLoading } = useFetchUsersProfile();

  const { putProfileMutation, uploadProfilePhotoMutation } =
    useUpdateUserProfile();
  const [form, setForm] = useState({
    name: "",
    email: "",
    birth_date: "",
    sex: "",
    cellphone_no: "",
  });

  useEffect(() => {
    if (userData) {
      setForm({
        name: userData.name || "",
        email: userData.email || "",
        birth_date: userData.birth_date || "",
        sex: userData.sex || "",
        cellphone_no: userData.cellphone_no || "",
      });
    }
  }, [userData]);

  // const submit = handleSubmit((data) => {
  //   // console.log("data");
  //   console.log(data);
  //   // putProfileMutation.mutate(data);
  //   putProfileMutation.mutate({
  //     name: form.name,
  //     email: form.email,
  //     profile: {
  //       birth_date: form.birth_date,
  //       sex: form.sex,
  //       cellphone_no: form.cellphone_no,
  //     },
  //   });
  //   // onClose();
  // });
  const handleSubmit = (e) => {
    e.preventDefault();
    putProfileMutation.mutate({
      name: form.name,
      email: form.email,
      profile: {
        birth_date: form.birth_date,
        sex: form.sex,
        cellphone_no: form.cellphone_no,
      },
    });
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && userData?.id) {
      uploadProfilePhotoMutation.mutate({ userId: userData.id, file });
    }
  };
  // if (!prevData) return null;
  if (userLoading)
    return <CircularProgress sx={{ display: "block", mx: "auto" }} />;
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 500,
        mx: "auto",
        mt: 4,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h5" fontWeight={600}>
        My Profile
      </Typography>

      <Avatar
        src={
          userData?.img_path
            ? `http://127.0.0.1:8000/api/v1/files/1/inline`
            : ""
        }
        alt={userData?.name}
        sx={{ width: 120, height: 120, mx: "auto" }}
      />

      <Button variant="contained" component="label" sx={{ mx: "auto" }}>
        Change Photo
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={handleFileChange}
        />
      </Button>

      <TextField
        label="Name"
        name="name"
        value={form.name}
        onChange={handleChange}
      />
      <TextField
        label="Email"
        name="email"
        value={form.email}
        onChange={handleChange}
      />
      <TextField
        label="Birth Date"
        name="birth_date"
        value={form.birth_date}
        onChange={handleChange}
      />
      <TextField
        label="Sex"
        name="sex"
        value={form.sex}
        onChange={handleChange}
      />
      <TextField
        label="Cellphone No"
        name="cellphone_no"
        value={form.cellphone_no}
        onChange={handleChange}
      />

      <Button
        type="submit"
        variant="contained"
        disabled={putProfileMutation.isPending}
      >
        {putProfileMutation.isPending ? "Saving..." : "Save Changes"}
      </Button>
    </Box>
  );
  // return (
  //   <form
  //     onSubmit={submit}
  //     style={{
  //       display: "flex",
  //       flexDirection: "column",
  //       gap: 30,
  //       padding: 5,
  //     }}
  //   >

  //     <TextField
  //       label="Name"
  //       {...register("name")}
  //       error={!!errors.name}
  //       helperText={errors.name?.message}
  //     />

  //     <TextField
  //       label="Email"
  //       {...register("email")}
  //       error={!!errors.email}
  //       helperText={errors.email?.message}
  //     />

  //     <Button
  //       variant="contained"
  //       type="submit"
  //       size="large"
  //       // loading={registerMutation?.isPending}
  //       sx={{ borderRadius: 25 }}
  //     >
  //       Save Changes
  //     </Button>
  //   </form>
  // );
}
