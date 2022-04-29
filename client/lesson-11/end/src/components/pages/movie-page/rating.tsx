import React, { VFC } from "react";
import { Box } from "@chakra-ui/react";

export interface RatingProps {
  rate?: number;
}

const RatingStyle = {
  border: "solid 1px",
  borderRadius: "50%",
  borderColor: "white",
  flexShrink: 0,
  fontSize: "xl",
  fontWeight: 300,
  lineHeight: "3em",
  height: "3em",
  textAlign: "center",
  width: "3em",
};

export const Rating: VFC<RatingProps> = ({ rate }) => (
  <Box sx={RatingStyle}>
    {rate || "?"}
  </Box>
);
