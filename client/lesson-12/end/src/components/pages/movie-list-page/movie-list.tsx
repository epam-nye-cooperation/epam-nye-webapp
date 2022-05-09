import React, { VFC } from "react";
import { Grid, GridItem, ListItem, OrderedList } from "@chakra-ui/react";

import { Movie } from "../../../model";
import { MovieListItem } from "./movie-list-item";

export interface MovieListProps {
  movies: Movie[];
}

export const MovieList: VFC<MovieListProps> = ({
  movies
}) => {
  return (
    <Grid
      as={OrderedList}
      templateColumns="repeat(3, 1fr)"
      sx={{
        gap: 12,
        listStyleType: "none",
        padding: 0,
        margin: 0,
      }}
    >
      {movies.map((movie) => (
        <GridItem as={ListItem} key={movie.id}>
          <MovieListItem movie={movie} />
        </GridItem>
      ))}
    </Grid>
  );
};
