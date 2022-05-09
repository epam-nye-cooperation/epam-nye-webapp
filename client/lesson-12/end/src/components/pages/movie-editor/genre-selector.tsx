import { TriangleDownIcon } from "@chakra-ui/icons";
import {
  Box,
  BoxProps,
  Button,
  Checkbox,
  CheckboxGroup,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useMultiStyleConfig,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState, VFC } from "react";

import { Genre } from "../../../model";

const genreList = Object.values(Genre);

export interface GenreSelectorProps {
  genres?: Genre[];
  value?: Genre[];
  onChange?: (genres: Genre[] | null) => void;
}

export const GenreSelector: VFC<GenreSelectorProps> = ({
  genres = genreList,
  value,
  onChange,
}) => {
  const styles = useMultiStyleConfig("GenreSelector", {});
  const [selectedItems, setSelectedItems] = useState(value || []);

  const onChangeHandler = useCallback(
    (values: string[] | number[]) => {
      setSelectedItems(values as Genre[]);
      onChange?.(values as Genre[]);
    },
    [onChange]
  );

  useEffect(() => {
    Array.isArray(value) && setSelectedItems(value);
  }, [value]);

  return (
    <Menu
      placement="bottom-start"
      autoSelect={false}
      isLazy={true}
      lazyBehavior="unmount"
      offset={[3, 3]}
    >
      <MenuButton
        as={Button}
        rightIcon={<TriangleDownIcon color="text.highlighted" />}
        sx={styles.button}
      >
        {selectedItems.length > 0 ? (
          <Box sx={styles.itemsList}>{selectedItems.join(", ")}</Box>
        ) : (
          <Text sx={styles.placeholder}>Select Genre</Text>
        )}
      </MenuButton>
      <CheckboxGroup value={value} onChange={onChangeHandler}>
        <MenuList
          rootProps={styles.checkboxRoot as BoxProps}
          sx={styles.checkboxList}
        >
          {genres.map((genre) => (
            <MenuItem
              as={Checkbox}
              value={genre}
              closeOnSelect={false}
              key={genre}
              colorScheme="red"
              sx={styles.menuItem}
            >
              {genre}
            </MenuItem>
          ))}
        </MenuList>
      </CheckboxGroup>
    </Menu>
  );
};
