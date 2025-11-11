import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { TextField, Box, InputAdornment, IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import { updateUserSchema } from "../../../../utils/schemas/authSchema";
import useUserManagement from "../mutation/useUserManagement";

const schema = updateUserSchema;

function UpdateUser({ data, handleCloseModal }) {
  const { userUpdateMutation } = useUserManagement();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);

  const submit = handleSubmit((data) => {
    console.log(data);
    userUpdateMutation.mutate(data, {
      onSuccess: () => handleCloseModal(),
    });
  });
  return (
    <>
      <Box width={{ md: 600, sm: 300, lg: 800 }}>
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

          <Button
            variant="contained"
            type="submit"
            size="large"
            loading={userUpdateMutation?.isPending}
            sx={{ borderRadius: 25 }}
          >
            Update
          </Button>
        </form>
      </Box>
    </>
  );
}

export default UpdateUser;
