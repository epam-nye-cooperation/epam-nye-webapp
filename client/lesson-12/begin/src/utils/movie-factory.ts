import { Genre, Movie, RawMovie } from "../model";

export const movieFactory = (rawMovieData: RawMovie) => {
  const releaseDate = new Date(Date.now());
  if (rawMovieData.release_date) {
    const [year, month, day] = rawMovieData.release_date.split("-");
    releaseDate.setFullYear(Number(year));
    releaseDate.setMonth(Number(month) - 1);
    releaseDate.setDate(Number(day));
  }
  
  return {
    ...rawMovieData,
    release_date: releaseDate,
    genres: rawMovieData.genres && (rawMovieData.genres as unknown as Genre[]),
  } as Movie;
};

export const serializeMovie = (movie: Movie): RawMovie => {
  return {
    ...movie,
    release_date: movie.release_date.toISOString().split("T")[0],
  }
};
