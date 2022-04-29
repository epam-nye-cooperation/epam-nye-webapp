import React, { VFC } from "react";
import { useParams } from "react-router-dom";

import { Movie } from "../../../model";
import { useMovie } from "../../../store/hooks/use-movie";
import { MovieDescription } from "./movie-description";

export const MoviePage: VFC = () => {
  const { movieId } = useParams<"movieId">();
  const { movie } = useMovie(Number(movieId));

  if (!movie) {
    return <></>
  }

  return (
    <MovieDescription movie={movie as Movie} />
  );
};
