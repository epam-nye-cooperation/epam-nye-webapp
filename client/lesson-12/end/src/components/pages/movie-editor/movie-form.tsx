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
  FormErrorMessage,
} from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";
import { useFormik } from "formik";

import { Movie } from "../../../model";
import { GenreSelector } from "./genre-selector";
import { movieFormValidationSchema } from "./movie-form-validation.schema";

export interface MovieFormProps {
  movie: Movie;
  onSubmit: (movie: Movie) => Promise<void>;
}

export const MovieForm: VFC<MovieFormProps> = ({
  movie,
  onSubmit,
}) => {
  const style = useMultiStyleConfig("MovieForm", {});
  const { errors, values, isSubmitting, isValid, isValidating, setFieldValue, handleSubmit, handleReset } = useFormik({
    initialValues: movie,
    onSubmit: async (values: Movie, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const validatedMovie = {
          ...values,
          tagline: values.tagline || undefined,
        };
        await onSubmit(validatedMovie);
      } catch (e) {
        console.error(e);
      }
      setSubmitting(false);
    },
    validationSchema: movieFormValidationSchema,
  });

  return (
    //@ts-ignore
    <VStack spacing={8} as="form" onSubmit={handleSubmit}>
      <Flex gap={8} width="full">
        <FormControl isInvalid={!!errors.title}>
          <FormLabel color="text.highlighted" textTransform="uppercase">Title</FormLabel>
          <Input
            value={values.title}
            onChange={(event) => setFieldValue("title", event.target.value)}
            sx={style.inputField}
          />
          <FormErrorMessage>{errors.title}</FormErrorMessage>
        </FormControl>

        <FormControl flexBasis="35%" flexShrink={0} isInvalid={!!errors.release_date}>
          <FormLabel>Release date</FormLabel>
          <InputGroup>
            <Input
              type="date"
              placeholder="Select Date"
              value={values.release_date.toISOString().split("T")[0]}
              onChange={(event) => {
                const dateString = event.target.value;
                setFieldValue("release_date", new Date(dateString))
              }}
              sx={style.inputField}
            />
            <InputRightElement>
              <CalendarIcon color="text.highlighted" />
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{errors.release_date}</FormErrorMessage>
        </FormControl>
      </Flex>

      <Flex gap={8} width="full">
        <FormControl isInvalid={!!errors.poster_path}>
          <FormLabel>Poster</FormLabel>
          <Input
            type="url"
            placeholder="https://"
            value={values.poster_path}
            onChange={(event) => setFieldValue("poster_path", event.target.value)}
            sx={style.inputField}
          />
          <FormErrorMessage>{errors.poster_path}</FormErrorMessage>
        </FormControl>

        <FormControl flexBasis="35%" flexShrink={0} isInvalid={!!errors.vote_average}>
          <FormLabel>Rating</FormLabel>
          <NumberInput
            min={0}
            max={10}
            precision={1}
            step={0.1}
            value={values.vote_average || ""}
            onChange={(_, rating) => setFieldValue("vote_average", rating)}
            sx={style.inputField}
          >
            <NumberInputField />
          </NumberInput>
          <FormErrorMessage>{errors.vote_average}</FormErrorMessage>
        </FormControl>
      </Flex>

      <Flex gap={8} width="full">
        <FormControl width="calc(65% - var(--chakra-sizes-8))" isInvalid={!!errors.genres}>
          <FormLabel as="legend" cursor="default">Genre</FormLabel>
          <GenreSelector
            value={values.genres}
            onChange={(genres) => setFieldValue("genres", genres)}
          />
          <FormErrorMessage>{errors.genres}</FormErrorMessage>
        </FormControl>

        <FormControl flexBasis="35%" flexShrink={0} isInvalid={!!errors.runtime}>
          <FormLabel>Runtime</FormLabel>
          <NumberInput
            min={0}
            value={values.runtime || ""}
            onChange={(_, runtime) => setFieldValue("runtime", runtime)}
            sx={style.inputField}
          >
            <NumberInputField placeholder="minutes" />
          </NumberInput>
          <FormErrorMessage>{errors.runtime}</FormErrorMessage>
        </FormControl>
      </Flex>

      <FormControl isInvalid={!!errors.overview}>
        <FormLabel>Overview</FormLabel>
        <Textarea
          value={values.overview}
          onChange={(event) => setFieldValue("overview", event.target.value)}
          placeholder="Movie description"
          resize="none"
          rows={8}
          sx={style.inputField}
        />
        <FormErrorMessage>{errors.overview}</FormErrorMessage>
      </FormControl>

      <ButtonGroup
        colorScheme="red"
        size="lg"
        justifyContent="flex-end"
        width="full"
        isDisabled={isSubmitting}
      >
        <Button
          type="reset"
          variant="outline"
          textTransform="uppercase"
          onClick={handleReset}
        >
          Reset
        </Button>
        <Button
          type="submit"
          textTransform="uppercase"
          isDisabled={isSubmitting || !isValid || isValidating}
        >
          Submit
        </Button>
      </ButtonGroup>
    </VStack>
  );
};
