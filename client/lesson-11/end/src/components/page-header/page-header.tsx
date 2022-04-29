import React, { VFC } from "react";
import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Spacer, useMultiStyleConfig } from "@chakra-ui/react";

import { NetflixRouletteLogo } from "../../atoms";
import { HeaderSearch } from "../search/header-search";

export const PageHeader: VFC = () => {
  const style = useMultiStyleConfig("PageHeader", {});

  return (
    <Box as="header" sx={style.container}>
      <Box sx={style.background} />
      <Box position="relative" zIndex={1}>
        <Flex justifyContent="space-between" paddingX={16}>
          <NetflixRouletteLogo />
          <Button
            leftIcon={<AddIcon fontSize="xl" />}
            size="lg"
            sx={style.addButton}
          >
              Add Movie
          </Button>
        </Flex>
        <HeaderSearch />
        <Spacer paddingBottom="10%" />
      </Box>
    </Box>
  );
};
