import * as Yup from "yup";

export const RegisterSchema = Yup.object().shape({
  email: Yup.string().ensure()
    .required("Please enter your email address")
    .email("Invalid email address"),
  password: Yup.string().ensure().trim()
    .required("Please enter a password")
    .min(10, "Your password must be at least 10 characters"),
  firstName: Yup.string().ensure().trim()
    .required("Please enter your first name"),
  lastName: Yup.string().ensure().trim()
    .required("Please enter your last name")
});
