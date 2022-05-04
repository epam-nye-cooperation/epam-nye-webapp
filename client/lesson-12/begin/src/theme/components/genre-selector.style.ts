import { ComponentMultiStyleConfig } from "@chakra-ui/react";

export const GenreSelector: ComponentMultiStyleConfig = {
  parts: ["button", "checkboxList", "checkboxRoot", "itemsList", "menuItem", "placeholder"],
  baseStyle: {
    button: {
      background: "interactive.input.background.default",
      border: "none",
      borderRadius: "4px",
      height: "auto",
      minHeight: 10,
      paddingY: 1.5,
      width: "full",

      _active: {
        background: "interactive.input.background.default",
        boxShadow: "0 0 0 1px #3182ce",
      },
      _hover: {
        background: "interactive.input.background.default",
      },
      _focus: {
        boxShadow: "0 0 0 1px #3182ce",
      },
    },
    itemsList: {
      maxWidth: "100%",
      overflow: "hidden",
      textAlign: "left",
      textOverflow: "ellipsis",
    },
    checkboxRoot: {
      width: "calc(100% - 6px)",
    },
    checkboxList: {
      backgroundColor: "interactive.input.dropdown",
      border: "none",
      maxHeight: "sm",
      overflowY: "scroll",
      width: "full",
    },
    menuItem: {
      _hover: {
        backgroundColor: "transparent",
      },
      _focus: {
        backgroundColor: "transparent",
      },
      "input:not(:checked) + .chakra-checkbox__control": {
        backgroundColor: "white",
        borderColor: "white",
      },
      ".chakra-checkbox__label": {
        opacity: 0.8,
      },
    },
    placeholder: {
      color: "interactive.input.placeholder",
      fontWeight: "normal",
      textAlign: "left",
    },
  },
};
