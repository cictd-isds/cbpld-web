import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Box, CircularProgress, MenuItem, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { userProfileSchema } from "../../../utils/schemas/authSchema";
import useQueryUserData from "./hooks/query/useQueryUserData";
import { useMutateUserProfile } from "./hooks/mutation/useMutateUserProfile";
import { formatDateToYMD } from "../../../utils/convertFunctions";

const schema = userProfileSchema;
export default function ProfileTab() {
  const [editMode, setEditMode] = useState(false);
  const { userDataQuery } = useQueryUserData();
  const userData = userDataQuery.data;
  const userLoading = userDataQuery.isLoading;
  // console.log("userDataprofiletab", userData);
  const { putProfileMutation } = useMutateUserProfile();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (userData) {
      reset(userData);
    }
  }, [userData, reset]);

  const submit = handleSubmit((data) => {
    console.log(data);
    putProfileMutation.mutate(
      {
        name: data.name,
        email: data.email,
        profile: {
          birth_date: formatDateToYMD(data.birth_date),
          sex: data.sex,
          cellphone_no: data.cellphone_no,
        },
      },
      {
        onSuccess: () => {
          setEditMode(false);
        },
      }
    );
  });
  if (userLoading && !userData)
    return <CircularProgress sx={{ display: "block", mx: "auto" }} />;
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
        disabled={!editMode}
        label="Name"
        {...register("name")}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <TextField
        disabled={!editMode}
        label="Email"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        disabled={!editMode}
        label="Birth Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        {...register("birth_date")}
        error={!!errors.birth_date}
        helperText={errors.birth_date?.message}
      />
      <TextField
        disabled={!editMode}
        select
        label="Sex"
        {...register("sex")}
        defaultValue={userData.sex}
        error={!!errors.sex}
        helperText={errors.sex?.message}
      >
        <MenuItem value="MALE">Male</MenuItem>
        <MenuItem value="FEMALE">Female</MenuItem>
      </TextField>
      <TextField
        disabled={!editMode}
        label="Cellphone No."
        {...register("cellphone_no")}
        error={!!errors.cellphone_no}
        helperText={errors.cellphone_no?.message}
      />
      <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
        {editMode && (
          <Button
            variant="contained"
            type="submit"
            size="large"
            loading={putProfileMutation?.isPending}
            sx={{ borderRadius: 25 }}
          >
            Save Changes
          </Button>
        )}
        <Button
          variant={editMode ? "outlined" : "contained"}
          size="large"
          onClick={() => {
            if (editMode) {
              reset(userData);
            }
            setEditMode((prev) => !prev);
          }}
          sx={{ borderRadius: 25 }}
        >
          {editMode ? "Cancel Edit" : "Edit Profile"}
        </Button>
      </Box>
    </form>
  );
}
