import React, { VFC } from "react";
import { Heading, HeadingProps, Link, Text } from "@chakra-ui/react";
import { Link as NavLink } from "react-router-dom";

export const NetflixRouletteLogo: VFC<HeadingProps> = (props) => (
  <Link
    as={NavLink}
    to="/"
    _hover={{
      textDecoration: "none"
    }}
  >
    <Heading fontSize="xl" color="text.highlighted" {...props}>
      <Text as="span" fontWeight="900">netflix</Text>
      <Text as="span" fontWeight="500">roulette</Text>
    </Heading>
  </Link>
);
