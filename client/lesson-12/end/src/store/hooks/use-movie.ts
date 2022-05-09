import { useMemo } from "react";
import { useSelector } from "react-redux";
import { movieFactory } from "../../utils/movie-factory";
import { moviesApi, useGetMovieQuery } from "../movies/movies-api";

export const useMovie = (movieId?: number) => {
  const { isLoading, isFetching, error } = useGetMovieQuery(movieId, { skip: !movieId });
  const select = moviesApi.endpoints.getMovie.select(movieId);
  const { data } = useSelector(select);

  const movie = useMemo(
    () => data && movieFactory(data),
    [data]
  );

  return {
    isLoading: isLoading || (!data && isFetching),
    error,
    movie,
  };
};
