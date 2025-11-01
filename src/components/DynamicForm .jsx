import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, MenuItem, Grid, Button, Box, Paper } from "@mui/material";
import * as yup from "yup";
import { formFields, formLayout, formLayout2 } from "../utils/userInputField";
import { formatDateToYMD } from "../utils/convertFunctions";

const validationSchema = yup.object(
  Object.fromEntries(
    Object.entries(formFields).map(([key, value]) => [key, value.schema])
  )
);

const DynamicForm = ({ editData }) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (editData) {
      reset(editData); // 👈 prefill when edit data arrives
    }
  }, [editData, reset]);

  const onSubmit = (data) => {
    console.log("✅ Submitted:", {
      ...data,
      birthdate: formatDateToYMD(data.birthdate),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Paper sx={{ display: "flex", gap: 2, padding: 2 }}>
        <Box sx={{ flex: 1 }}>
          {formLayout.map((row, rowIndex) => (
            <Grid container spacing={2} key={rowIndex}>
              {row.map((fieldKey) => {
                const field = formFields[fieldKey];
                if (!field) return null;

                return (
                  <Grid
                    item
                    // xs={12}
                    // sm={row.length > 1 ? 6 : 12}
                    size={12 / row.length}
                    key={fieldKey}
                  >
                    <Controller
                      name={fieldKey}
                      control={control}
                      defaultValue=""
                      render={({ field: controllerField }) =>
                        field.component === "Select" ? (
                          <TextField
                            margin="dense"
                            select
                            fullWidth
                            label={field.label}
                            {...controllerField}
                            error={!!errors[fieldKey]}
                            helperText={errors[fieldKey]?.message}
                          >
                            {field.options.map((opt) => (
                              <MenuItem key={opt} value={opt}>
                                {opt}
                              </MenuItem>
                            ))}
                          </TextField>
                        ) : (
                          <TextField
                            margin="dense"
                            fullWidth
                            type={field.type}
                            label={field.label}
                            {...controllerField}
                            error={!!errors[fieldKey]}
                            helperText={errors[fieldKey]?.message}
                          />
                        )
                      }
                    />
                  </Grid>
                );
              })}
            </Grid>
          ))}
        </Box>
        <Box sx={{ flex: 1 }}>
          {formLayout2.map((row, rowIndex) => (
            <Grid container spacing={2} key={rowIndex}>
              {row.map((fieldKey) => {
                const field = formFields[fieldKey];
                if (!field) return null;

                return (
                  <Grid
                    item
                    // xs={12}
                    // sm={row.length > 1 ? 6 : 12}
                    size={12 / row.length}
                    key={fieldKey}
                  >
                    <Controller
                      name={fieldKey}
                      control={control}
                      defaultValue=""
                      render={({ field: controllerField }) =>
                        field.component === "Select" ? (
                          <TextField
                            margin="dense"
                            select
                            fullWidth
                            label={field.label}
                            {...controllerField}
                            error={!!errors[fieldKey]}
                            helperText={errors[fieldKey]?.message}
                          >
                            {field.options.map((opt) => (
                              <MenuItem key={opt} value={opt}>
                                {opt}
                              </MenuItem>
                            ))}
                          </TextField>
                        ) : (
                          <TextField
                            margin="dense"
                            fullWidth
                            type={field.type}
                            label={field.label}
                            {...controllerField}
                            error={!!errors[fieldKey]}
                            helperText={errors[fieldKey]?.message}
                          />
                        )
                      }
                    />
                  </Grid>
                );
              })}
            </Grid>
          ))}
        </Box>
      </Paper>

      <Button variant="contained" color="primary" type="submit" sx={{ mt: 3 }}>
        Save Changes
      </Button>
    </form>
  );
};

export default DynamicForm;
