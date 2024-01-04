import * as yup from "yup";

export const eventSchema = yup.object().shape({
  title: yup
    .string()
    .max(20)
    .required("Title is required"),
  description: yup.string(),
  price: yup
    .number()
    .required("Price is required"),
  date: yup
    .string()
    .required("Date is required"),
});
