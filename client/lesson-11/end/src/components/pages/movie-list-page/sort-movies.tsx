import React, { VFC, useCallback, useState } from "react";
import {
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { UpDownIcon } from "@chakra-ui/icons";

import { MovieSortType } from "../../../model";

export interface SortMoviesProps {
  sortType: MovieSortType;
  onChange: (sortType: MovieSortType) => void;
}

export const SortMovies: VFC<SortMoviesProps> = ({sortType, onChange}) => {
  const menuItemStyle = {
    _focus: {
      backgroundColor: "background.default",
    },
  };
  const [isOpened, setIsOpened] = useState(false);
  const openMenu = useCallback(() => {
    setIsOpened(true);
  }, []);
  const closeMenu = useCallback(() => {
    setIsOpened(false);
  }, []);

  return (
    <Flex alignItems="center" gap="8">
      <Text
        as="label"
        sx={{
          fontSize: "md",
          letterSpacing: "0.888889px",
          textTransform: "uppercase",
          opacity: 0.6,
        }}
        onClick={openMenu}
      >
        Sort by
      </Text>
      <Menu placement="bottom-end" onClose={closeMenu} onOpen={openMenu} isOpen={isOpened}>
        <MenuButton>
          {sortType}
          <UpDownIcon color="text.highlighted" marginLeft={3} />
        </MenuButton>
        <MenuList bgColor="background.dark">
          <MenuItem onClick={() => onChange(MovieSortType.RELEASE_DATE)} sx={menuItemStyle}>
            {MovieSortType.RELEASE_DATE}
          </MenuItem>
          <MenuItem onClick={() => onChange(MovieSortType.TITLE)} sx={menuItemStyle}>
            {MovieSortType.TITLE}
          </MenuItem>
          <MenuItem onClick={() => onChange(MovieSortType.RATING)} sx={menuItemStyle}>
            {MovieSortType.RATING}
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};
