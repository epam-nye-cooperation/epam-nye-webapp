import React, { useCallback, VFC } from "react";
import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Spacer, useMultiStyleConfig } from "@chakra-ui/react";

import { NetflixRouletteLogo } from "../../atoms";
import { HeaderSearch } from "../search/header-search";
import { useDispatch } from "react-redux";
import { showEditor } from "../../store/movies/editor.slice";

export const PageHeader: VFC = () => {
  const style = useMultiStyleConfig("PageHeader", {});

  const dispatch = useDispatch();
  const openEditor = useCallback(
    () => {
      dispatch(showEditor())
    },
    [dispatch]
  );

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
            onClick={openEditor}
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
