import React, { VFC } from "react";

import movies from "../../../data/movies.json";
import { Movie, RawMovie } from "../../../model";
import { movieFactory } from "../../../utils/movie-factory";
import { MovieDescription } from "./movie-description";

const movieId = "330459";

export const MoviePage: VFC = () => {
  const movieData = movies.find((rawMovie) => rawMovie.id === Number(movieId));

  if (!movieData) {
    return <></>
  }

  const movie: Movie = movieFactory(movieData as RawMovie);

  return (
    <MovieDescription movie={movie} />
  );
};
