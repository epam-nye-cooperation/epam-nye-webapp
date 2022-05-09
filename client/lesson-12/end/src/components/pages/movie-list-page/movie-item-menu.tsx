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
import { useDispatch } from "react-redux";
import { useMovieChanges } from "../../../store/hooks/use-movie-changes";
import { showEditor } from "../../../store/movies/editor.slice";

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
  const { deleteMovie } = useMovieChanges();

  const dispatch = useDispatch();

  const onDelete = useCallback(async () => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      await deleteMovie(movieId);
    }
  }, [deleteMovie, movieId]);

  const onEdit = useCallback(
    () => dispatch(showEditor(movieId)),
    [dispatch, movieId]
  );

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
