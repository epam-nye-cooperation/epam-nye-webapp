import { Genre, Movie, RawMovie } from "../model";

export const movieFactory = (rawMovieData: RawMovie) => {
  const [year, month, day] = rawMovieData.release_date.split("-");
      const releaseDate = new Date();
      releaseDate.setFullYear(Number(year));
      releaseDate.setMonth(Number(month) - 1);
      releaseDate.setDate(Number(day));
      return {
        ...rawMovieData,
        release_date: releaseDate,
        genres: rawMovieData.genres && (rawMovieData.genres as unknown as Genre[]),
      } as Movie;
};
