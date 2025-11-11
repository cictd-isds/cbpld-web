import * as yup from "yup";

export const formFields = {
  firstName: {
    label: "First Name",
    type: "text",
    component: "TextField",
    schema: yup.string().required("First Name is required"),
  },
  middleName: {
    label: "Middle Name",
    type: "text",
    component: "TextField",
    schema: yup.string().nullable(),
  },
  lastName: {
    label: "Last Name",
    type: "text",
    component: "TextField",
    schema: yup.string().required("Last Name is required"),
  },
  suffix: {
    label: "Suffix",
    type: "text",
    component: "TextField",
    schema: yup.string().nullable(),
  },
  title: {
    label: "Title (e.g. CPA, ATTY, PhD)",
    type: "text",
    component: "TextField",
    schema: yup.string().nullable(),
  },
  contactNumber: {
    label: "Contact Number",
    type: "tel",
    component: "TextField",
    schema: yup
      .string()
      .matches(/^[0-9]+$/, "Must be a valid number")
      .required("Contact Number is required"),
  },
  gender: {
    label: "Gender",
    type: "select",
    component: "Select",
    options: ["Male", "Female", "Other"],
    schema: yup.string().required("Gender is required"),
  },
  birthdate: {
    label: "Birthdate",
    type: "date",
    component: "TextField",
    schema: yup.date().required("Birthdate is required"),
  },
  civilStatus: {
    label: "Civil Status",
    type: "select",
    component: "Select",
    options: ["Single", "Married", "Widowed", "Divorced"],
    schema: yup.string().required("Civil Status is required"),
  },
  nationality: {
    label: "Nationality",
    type: "text",
    component: "TextField",
    schema: yup.string().required("Nationality is required"),
  },
  country: {
    label: "Country",
    type: "text",
    component: "TextField",
    schema: yup.string().required("Country is required"),
  },
  province: {
    label: "Province",
    type: "text",
    component: "TextField",
    schema: yup.string().required("Province is required"),
  },
  city: {
    label: "City/Municipality",
    type: "text",
    component: "TextField",
    schema: yup.string().required("City/Municipality is required"),
  },
  barangay: {
    label: "Barangay",
    type: "text",
    component: "TextField",
    schema: yup.string().required("Barangay is required"),
  },
  streetAddress: {
    label: "Street Address",
    type: "text",
    component: "TextField",
    schema: yup.string().required("Street Address is required"),
  },
  department: {
    label: "Department",
    type: "text",
    component: "TextField",
    schema: yup.string().required("Department is required"),
  },
  position: {
    label: "Position",
    type: "text",
    component: "TextField",
    schema: yup.string().required("Position is required"),
  },
};

// Layout configuration
export const formLayout = [
  ["firstName", "lastName"],
  ["middleName", "suffix", "title"],
  ["contactNumber", "gender"],
];
export const formLayout2 = [
  ["birthdate", "civilStatus"],
  ["nationality", "country"],
  ["province", "city"],
  ["barangay", "streetAddress"],
  ["department", "position"],
];
