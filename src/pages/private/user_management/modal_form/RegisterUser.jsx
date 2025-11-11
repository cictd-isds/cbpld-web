import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { TextField, Box, InputAdornment, IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";
import { registerSchema } from "../../../../utils/schemas/authSchema";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useUserManagement from "../mutation/useUserManagement";

const schema = registerSchema;

function RegisterUser({ handleCloseModal }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { userRegisterMutation } = useUserManagement();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submit = handleSubmit((data) => {
    console.log(data);
    userRegisterMutation.mutate(data, {
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

          <TextField
            type={showPassword ? "text" : "password"}
            label="New Password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            type={showConfirm ? "text" : "password"}
            label="Confirm New Password"
            {...register("confirmPassword")}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirm((prev) => !prev)}
                    edge="end"
                  >
                    {showConfirm ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            type="submit"
            size="large"
            loading={userRegisterMutation?.isPending}
            sx={{ borderRadius: 25 }}
          >
            Register
          </Button>
        </form>
      </Box>
    </>
  );
}

export default RegisterUser;
