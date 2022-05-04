import React, { VFC, useState } from "react";
import { Box, Divider, Flex, Skeleton } from "@chakra-ui/react";

import { MovieSortType } from "../../../model";
import { GenreList } from "./genre-list";
import { MovieCounter } from "./movie-counter";
import { MovieList } from "./movie-list";
import { SortMovies } from "./sort-movies";
import { useMovies } from "../../../store/hooks/use-movies";

const getSortingParams = (sorting: MovieSortType) => {
  if (sorting === MovieSortType.RELEASE_DATE) {
    return {
      sortOrder: "desc",
      sortBy: "release_date",
    };
  } else if (sorting === MovieSortType.RATING) {
    return {
      sortOrder: "desc",
      sortBy: "vote_average",
    }
  }
  return {
    sortOrder: "asc",
    sortBy: "title",
  };
};

export const MovieListPage: VFC = () => {

  const [sorting, setSorting] = useState(MovieSortType.RELEASE_DATE);
  const { isLoading, movies, totalAmount } = useMovies({
    ...getSortingParams(sorting),
    limit: 6,
  });

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
      <Skeleton isLoaded={!isLoading}>
        <MovieCounter moviesFound={totalAmount} />
        <MovieList movies={movies} />
      </Skeleton>
    </Box>
  );
};
