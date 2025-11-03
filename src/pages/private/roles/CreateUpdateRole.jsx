import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { TextField, Box } from "@mui/material";
import Button from "@mui/material/Button";
import { roleSchema } from "../../../utils/schemas/roles/rolesSchema";
import { useEffect } from "react";
import useRolesMutation from "./mutation/useRolesMutation";

function CreateUpdateRole({ data, handleCloseModal }) {
  const { createRoleMutation, updateRoleMutation } = useRolesMutation();
  const methods = useForm({
    resolver: yupResolver(roleSchema),
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (data?.id) {
      reset(data);
    }
  }, [data, reset]);

  const onSubmit = (values) => {
    const { permissions, ...rest } = values; // remove permissions property
    const payload = {
      ...rest,
    };
    if (data?.id) {
      updateRoleMutation.mutate(payload, {
        onSuccess: () => handleCloseModal(),
      });
    } else {
      createRoleMutation.mutate(values, {
        onSuccess: () => handleCloseModal(),
      });
    }
  };
  return (
    <>
      <Box width={{ md: 600, sm: 300, lg: 800 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button
              type="submit"
              variant="contained"
              color={data?.id ? "warning" : "primary"}
              loading={
                createRoleMutation.isPending || updateRoleMutation.isPending
              }
            >
              {data?.id ? "Update" : "Add role"}
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
}

export default CreateUpdateRole;
