import React, { VFC } from "react";

import { Text } from "@chakra-ui/react";

export interface MovieCounterProps {
  moviesFound: number;
}

export const MovieCounter: VFC<MovieCounterProps> = ({ moviesFound }) => {
  return (
    <Text fontSize="xl" paddingY={6}>
      <Text as="strong" fontWeight="semibold">{moviesFound}</Text> movies found
    </Text>
  );
};
