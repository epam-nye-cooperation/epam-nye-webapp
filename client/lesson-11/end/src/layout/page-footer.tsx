import React, { VFC } from "react";
import { Box } from "@chakra-ui/react";

import { NetflixRouletteLogo } from "../atoms";

export const PageFooter: VFC = () => (
  <Box as="footer" paddingY="6" textAlign="center" bgColor="background.medium">
    <NetflixRouletteLogo />
  </Box>
);
