import React, { VFC } from "react";
import { Box, Button, Flex, Heading, Input } from "@chakra-ui/react";
import { useHeaderSearch } from "./use-header-search";

export const HeaderSearch: VFC = () => {
  const {searchQuery, onChange, onSubmit} = useHeaderSearch();

  return (
    <Box width="80%" marginX="auto">
      <Heading
        as="h2"
        sx={{
          textTransform: "uppercase",
          fontSize: "4xl",
          marginBottom: 10,
        }}>
        Find your movie
      </Heading>
      <Flex as="form" gap={4} onSubmit={onSubmit}>
        <Input
          placeholder="What do you want to watch?"
          sx={{
            backgroundColor: "interactive.input.background.default",
            borderColor: "transparent",
            borderRadius: 4,
          }}
          size="lg"
          value={searchQuery}
          onChange={onChange}
        />
        <Button
          type="submit"
          size="lg"
          sx={{
            background: "interactive.button.background.default",
            borderRadius: 4,
            fontWeight: "medium",
            paddingX: 20,
            textTransform: "uppercase",
            _hover: {
              background: undefined,
            },
            _active: {
              background: undefined,
            },
          }}
        >Search</Button>
      </Flex>
    </Box>
  );
};
