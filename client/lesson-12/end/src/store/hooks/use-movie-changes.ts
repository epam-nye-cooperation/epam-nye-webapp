import { useCallback } from "react";
import { Movie } from "../../model";
import { movieFactory, serializeMovie } from "../../utils/movie-factory";
import { useCreateMovieMutation, useDeleteMovieMutation, useUpdateMovieMutation } from "../movies/movies-api";

export const useMovieChanges = () =>{
  const [createMovie] = useCreateMovieMutation();
  const [deleteMovie] = useDeleteMovieMutation();
  const [updateMovie] = useUpdateMovieMutation();

  const save = useCallback(
    async (movie: Movie) => {
      const mutation = movie.id ? updateMovie : createMovie;
      const rawMovie = serializeMovie(movie);
      const result = await mutation(rawMovie);
      if ("error" in result) {
        throw result.error;
      }
      return movieFactory(result.data);
    },
    [updateMovie, createMovie]
  );

  return {
    deleteMovie,
    save,
  };
};
