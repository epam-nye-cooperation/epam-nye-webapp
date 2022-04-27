import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  username: Yup.string().ensure()
    .required("Please enter your username")
    .max(100, "Too long username"),
  password: Yup.string().ensure()
    .required("Please enter your password")
    .min(10, "Your password is too short")
});
