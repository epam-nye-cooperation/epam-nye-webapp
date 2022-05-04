import React, { VFC } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  NumberInput,
  NumberInputField,
  Textarea,
  VStack,
  useMultiStyleConfig,
  ButtonGroup,
} from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";

import { Movie } from "../../../model";
import { GenreSelector } from "./genre-selector";

export interface MovieFormProps {
  movie: Movie;
  onSubmit: (movie: Movie) => Promise<void>;
}

export const MovieForm: VFC<MovieFormProps> = ({
  movie,
}) => {
  const style = useMultiStyleConfig("MovieForm", {});

  return (
    <VStack spacing={8} as="form">
      <Flex gap={8} width="full">
        <FormControl>
          <FormLabel color="text.highlighted" textTransform="uppercase">Title</FormLabel>
          <Input
            value={movie.title}
            onChange={(event) => console.log("title", event.target.value)}
            sx={style.inputField}
          />
        </FormControl>

        <FormControl flexBasis="35%" flexShrink={0}>
          <FormLabel>Release date</FormLabel>
          <InputGroup>
            <Input
              type="date"
              placeholder="Select Date"
              value={movie.release_date.toISOString().split("T")[0]}
              onChange={(event) => {
                const dateString = event.target.value;
                console.log("release_date", new Date(dateString))
              }}
              sx={style.inputField}
            />
            <InputRightElement>
              <CalendarIcon color="text.highlighted" />
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </Flex>

      <Flex gap={8} width="full">
        <FormControl>
          <FormLabel>Poster</FormLabel>
          <Input
            type="url"
            placeholder="https://"
            value={movie.poster_path}
            onChange={(event) => console.log("poster_path", event.target.value)}
            sx={style.inputField}
          />
        </FormControl>

        <FormControl flexBasis="35%" flexShrink={0}>
          <FormLabel>Rating</FormLabel>
          <NumberInput
            min={0}
            max={10}
            precision={1}
            step={0.1}
            value={movie.vote_average || ""}
            onChange={(_, rating) => console.log("vote_average", rating)}
            sx={style.inputField}
          >
            <NumberInputField />
          </NumberInput>
        </FormControl>
      </Flex>

      <Flex gap={8} width="full">
        <FormControl width="calc(65% - var(--chakra-sizes-8))">
          <FormLabel as="legend" cursor="default">Genre</FormLabel>
          <GenreSelector />
        </FormControl>

        <FormControl flexBasis="35%" flexShrink={0}>
          <FormLabel>Runtime</FormLabel>
          <NumberInput
            min={0}
            value={movie.runtime || ""}
            onChange={(_, runtime) => console.log("runtime", runtime)}
            sx={style.inputField}
          >
            <NumberInputField placeholder="minutes" />
          </NumberInput>
        </FormControl>
      </Flex>

      <FormControl>
        <FormLabel>Overview</FormLabel>
        <Textarea
          value={movie.overview}
          onChange={(event) => console.log("overview", event.target.value)}
          placeholder="Movie description"
          resize="none"
          rows={8}
          sx={style.inputField}
        />
      </FormControl>

      <ButtonGroup
        colorScheme="red"
        size="lg"
        justifyContent="flex-end"
        width="full"
      >
        <Button type="reset" variant="outline" textTransform="uppercase">
          Reset
        </Button>
        <Button type="submit" textTransform="uppercase">
          Submit
        </Button>
      </ButtonGroup>
    </VStack>
  );
};
