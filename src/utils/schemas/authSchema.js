import * as Yup from "yup";

const PASSWORD_CHAR = 8;

export const loginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(PASSWORD_CHAR, `Password must be at least ${PASSWORD_CHAR} characters`)
    .required("Password is required"),
});

export const registerSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),

  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  password: Yup.string()
    .min(PASSWORD_CHAR, `Password must be at least ${PASSWORD_CHAR} characters`)
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export const userProfileSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),

  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  birth_date: Yup.date()
    .nullable()
    .typeError("Invalid date format")
    .required("Birth date is required"),

  sex: Yup.string()
    .oneOf(["MALE", "FEMALE"], "Please select your sex")
    .required("Sex is required"),

  cellphone_no: Yup.string()
    .matches(
      /^09\d{9}$/,
      "Cellphone number must start with 09 and be 11 digits"
    )
    .required("Cellphone number is required"),
});
export const changePassSchema = Yup.object({
  password: Yup.string()
    .min(PASSWORD_CHAR, `Password must be at least ${PASSWORD_CHAR} characters`)
    .required("Password is required"),

  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export const forgotPassSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  // firstName: Yup.string().required("First name is required"),
  // lastName: Yup.string().required("Last name is required"),
  // birthday: Yup.string().required("Birthday is required"),
});
export const resetPassSchema = Yup.object({
  // email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(PASSWORD_CHAR, `Password must be at least ${PASSWORD_CHAR} characters`)
    .required("Password is required"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});
