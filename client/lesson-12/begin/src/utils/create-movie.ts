import { RawMovie } from "../model";

export const createRawMovie = (): RawMovie => ({
  title: "",
  release_date: new Date().toISOString().split("T")[0],
  poster_path: "",
  overview: "",
  runtime: 0,
});
