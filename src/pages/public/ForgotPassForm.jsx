import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Box, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { forgotPassSchema } from "../../utils/schemas/authSchema";
import useAuth from "./mutation/useAuth";
import SmallModal from "../../components/common/modals/SmallModal";
import CustomAlert from "../../components/common/CustomAlert";
import { useState } from "react";

const schema = forgotPassSchema;
export default function ForgotPassForm() {
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

  const { forgotPassMutation } = useAuth();

  const submit = handleSubmit((data) => {
    forgotPassMutation.mutate(data, {
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
        label="Email"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        label="First Name"
        {...register("firstName")}
        error={!!errors.firstName}
        helperText={errors.firstName?.message}
      />
      <TextField
        label="Last Name"
        {...register("lastName")}
        error={!!errors.lastName}
        helperText={errors.lastName?.message}
      />
      <TextField
        label="Birthday (MM/DD/YYYY)"
        {...register("birthday")}
        error={!!errors.birthday}
        helperText={errors.birthday?.message}
      />

      <Button
        variant="contained"
        type="submit"
        size="large"
        loading={forgotPassMutation?.isPending}
        sx={{ borderRadius: 25 }}
      >
        Submit
      </Button>
    </form>
  );
}
