import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSearchText, setSearchText } from "../../store/movies/search.slice";

export const useHeaderSearch = () =>{
  const stateSearch = useSelector(selectSearchText);
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState(stateSearch);
  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      setSearchQuery(event.target.value),
    []
  );

  const onSubmit = useCallback(
    (event: FormEvent<HTMLDivElement>) => {
      event.preventDefault();
      dispatch(setSearchText(searchQuery));
    },
    [dispatch, searchQuery]
  );

  return {
    searchQuery,
    onChange,
    onSubmit,
  };
};
