import * as yup from "yup";

export const bookingSchema = yup.object().shape({
  numberofSeats: yup
    .number()
    .required("Required feild."),
});
