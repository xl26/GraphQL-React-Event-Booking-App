import * as yup from "yup";

const regexPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
export const signUpSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  name: yup.string().required("Name is required"),
  password: yup
    .string()
    .min(5)
    .matches(regexPassword, {
      message: "Password needs to have 1 uppercase letter, 1 lowercase letter and 1 numerical digit",
    })
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords don't match")
    .required("Required"),
});
