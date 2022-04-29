import { useSelector } from "react-redux";
import { movieFactory } from "../../utils/movie-factory";
import { moviesApi, useGetMovieQuery } from "../movies/movies-api";

export const useMovie = (movieId: number) => {
  const { isLoading, isFetching, error } = useGetMovieQuery(movieId);
  const select = moviesApi.endpoints.getMovie.select(movieId);
  const { data } = useSelector(select);

  return {
    isLoading: isLoading || (!data && isFetching),
    error,
    movie: data && movieFactory(data),
  };
};
