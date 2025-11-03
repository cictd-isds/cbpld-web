import * as Yup from "yup";

export const roleSchema = Yup.object({
  id: Yup.number().optional(),
  name: Yup.string()
    .min(1, `Role name must be at least 1 character`)
    .required("Role name is required"),
});
