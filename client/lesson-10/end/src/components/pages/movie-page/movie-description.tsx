import React, { VFC } from "react";
import {
  AspectRatio,
  Box,
  Flex,
  Heading,
  HStack,
  Image,
  Link,
  Text,
  useMultiStyleConfig,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

import { NetflixRouletteLogo } from "../../../atoms";
import { Movie } from "../../../model";
import { Rating } from "./rating";

export interface MovieDescriptionProps {
  movie: Movie;
}

const formatRuntime = (runtime: number | null): string => {
  if (!runtime) {
    return "";
  }
  const runtimeMins = runtime % 60;
  const runtimeHours = Math.round((runtime - runtimeMins) / 60);
  return `${runtimeHours}h ${runtimeMins}min`;
};

export const MovieDescription: VFC<MovieDescriptionProps> = ({ movie }) => {
  const style = useMultiStyleConfig("MovieDescription", {});
  return (
    <Box
      as="article"
      sx={style.container}
    >
      <Flex justifyContent="space-between" marginBottom={8}>
        <NetflixRouletteLogo />
        <Link href="/" sx={style.homeLink}>
          <SearchIcon />
        </Link>
      </Flex>
      <Flex justifyContent="space-between" gap={10}>
        <AspectRatio ratio={323 / 486} flexBasis="30%" flexShrink={0}>
          <Image src={movie.poster_path} />
        </AspectRatio>
        <Box flexGrow={1}>
          <Box as="header" marginBottom={8}>
            <HStack spacing={6}>
              <Heading sx={style.title}>{movie.title}</Heading>
              <Rating rate={movie.vote_average} />
            </HStack>
            {movie.tagLine && <Text>{movie.tagLine}</Text>}
          </Box>
          <HStack
            as="time"
            spacing={12}
            sx={style.timeStamp}
          >
            <Text as="span">{movie.release_date.getFullYear()}</Text>
            <Text as="span">{formatRuntime(movie.runtime)}</Text>
          </HStack>
          <Text sx={style.description}>{movie.overview}</Text>
        </Box>
      </Flex>
    </Box>
  );
};
