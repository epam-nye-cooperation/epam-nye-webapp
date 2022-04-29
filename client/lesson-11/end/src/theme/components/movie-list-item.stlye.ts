import { ComponentMultiStyleConfig } from "@chakra-ui/react";

export const MovieListItem: ComponentMultiStyleConfig = {
  parts: ["description", "header", "releaseDate"],
  baseStyle: {
    description: {
      justifyContent: "space-between",
      opacity: 0.5,
    },
    header: {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      gap: 2,
    },
    releaseDate: {
      alignSelf: "flex-start",
      border: "solid 1px",
      borderColor: "border.default",
      borderRadius: 4,
      fontSize: "sm",
      paddingX: 2,
      paddingY: 1,
    },
  },
};
