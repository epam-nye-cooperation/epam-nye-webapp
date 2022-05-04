import React, { VFC } from "react";
import { HStack, Link, Text, useMultiStyleConfig } from "@chakra-ui/react";

import { Genre } from "../../../model";

const highlighted: Genre[] = [
  Genre.DOCUMENTARY,
  Genre.COMEDY,
  Genre.HORROR,
  Genre.CRIME,
];

export const GenreList: VFC = () => {
  const style = useMultiStyleConfig("GenreList", {});

  return (
    <HStack as="ol" sx={style.list} spacing={8}>
      <Text as="li" aria-selected={true} sx={style.listItem}>
        <Link href="#">All</Link>
      </Text>
      {highlighted.map((genre, index) => (
        <Text as="li" key={index} sx={style.listItem}>
          <Link href="#">{genre}</Link>
        </Text>
      ))}
    </HStack>
  );
};
