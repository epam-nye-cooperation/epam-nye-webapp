import React, { VFC, useMemo, useState } from "react";
import { Box, Divider, Flex } from "@chakra-ui/react";

import { Movie, MovieSortType, RawMovie } from "../../../model";
import { movieFactory } from "../../../utils/movie-factory";
import allMovies from "../../../data/movies.json";
import { GenreList } from "./genre-list";
import { MovieCounter } from "./movie-counter";
import { MovieList } from "./movie-list";
import { SortMovies } from "./sort-movies";

export const MovieListPage: VFC = () => {

  const [sorting, setSorting] = useState(MovieSortType.RELEASE_DATE);
  const movieList: Movie[] = useMemo(
    () => allMovies.map((movie) => movieFactory(movie as RawMovie)),
    []
  );

  const movies: Movie[] = useMemo(() => {
    const sorted = movieList.sort(
      (a: Movie, b: Movie) => {
        if (sorting === MovieSortType.RELEASE_DATE) {
          return b.release_date.getTime() - a.release_date.getTime();
        } else if (sorting === MovieSortType.RATING) {
          return (b.vote_average ?? 0) - (a.vote_average ?? 0);
        }
        return a.title.localeCompare(b.title);
      }
    );
    return sorted.slice(0, 6);
  }, [movieList, sorting]);

  return (
    <Box width="full" marginTop={3} paddingX={12} paddingBottom={20} backgroundColor="background.dark">
      <Flex
        as="nav"
        sx={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: "-3px",
          paddingTop: 1,
          position: "relative",
          zIndex: 2,
        }}
      >
        <GenreList />
        <SortMovies onChange={setSorting} sortType={sorting} />
      </Flex>
      <Divider height="2px" bgColor="gray.600" borderBottomColor="gray.1000" zIndex={1} position="relative" />
      <MovieCounter moviesFound={movieList.length} />
      <MovieList movies={movies} />
    </Box>
  );
};
