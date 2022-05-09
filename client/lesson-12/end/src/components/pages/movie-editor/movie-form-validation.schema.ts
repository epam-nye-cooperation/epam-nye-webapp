import * as Yup from "yup";

export const movieFormValidationSchema = Yup.object({
  title: Yup.string().required("Please insert title"),
  vote_average: Yup.number()
    .min(0, "Must be at least 0")
    .max(10, "Must be at max 10"),
  poster_path: Yup.string()
    .required("Please add a poster path")
    .url("Invalid path"),
  overview: Yup.string().required("Please define movie overview"),
  genres: Yup.array().ensure()
    .typeError("Select at least one genre to proceed")
    .required("Select at least one genre to proceed")
    .min(1, "Select at least one genre to proceed"),
  runtime: Yup.number()
    .integer()
    .typeError("Set the length of the movie")
    .required("Set the length of the movie")
    .min(0, "Must be a positive value"),
  release_date: Yup.date().typeError("Please define the release date")
});
