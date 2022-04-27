import React, { FC } from "react";
import { Box, Flex } from "@chakra-ui/react";

import { PageFooter } from "./page-footer";

export const NetflixRoulettePage: FC = ({ children }) => {
  return (
    <Flex marginX="auto" maxWidth="7xl" flexDir="column" height="full">
      <Box flexGrow={1}>
        {children}
      </Box>
      <PageFooter />
    </Flex>
  );
};
