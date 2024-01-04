import * as yup from "yup";

const regexPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required"),
});
