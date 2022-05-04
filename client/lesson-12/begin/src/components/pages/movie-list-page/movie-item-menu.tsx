import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  BoxProps,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuProps,
  useDisclosure,
  useMultiStyleConfig,
} from "@chakra-ui/react";
import React, { useCallback, VFC } from "react";

export interface MovieItemMenuProps
  extends BoxProps, Pick<MenuProps, "placement" | "offset"> {
  movieId: number;
}

export const MovieItemMenu: VFC<MovieItemMenuProps> = ({
  placement,
  offset = [0, -32],
  movieId,
  ...props
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const style = useMultiStyleConfig("MovieItemMenu", {});

  const onDelete = useCallback(() => {}, []);

  const onEdit = useCallback(() => {}, []);

  return (
    <Menu placement={placement} offset={offset} isOpen={isOpen} onOpen={onOpen} onClose={onClose} autoSelect={false}>
      <Box {...props}>
        <MenuButton
          as={IconButton}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          isRound={true}
          size="sm"
          sx={style.menuButton}
        />
        <MenuList onMouseLeave={onClose} sx={style.menuList}>
          <MenuItem
            onClick={onClose}
            sx={style.closeIcon}
          >
            <CloseIcon fontSize="sm" />
          </MenuItem>
          <MenuItem sx={style.menuItem} onClick={onEdit}>Edit</MenuItem>
          <MenuItem sx={style.menuItem} onClick={onDelete}>Delete</MenuItem>
        </MenuList>
      </Box>
    </Menu>
  );
};
