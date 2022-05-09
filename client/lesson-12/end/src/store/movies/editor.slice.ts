import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie, RawMovie } from "../../model";
import { createRawMovie } from "../../utils/create-movie";
import { RootState } from "../store";

interface MovieEditorState {
  movie: RawMovie | null;
  movieId: Movie["id"];
  showEditor: boolean;
}

const initialState: MovieEditorState = {
  movie: null,
  movieId: undefined,
  showEditor: false,
};

export const movieEditorSlice = createSlice({
  name: "movieEditor",
  initialState,
  reducers: {
    showEditor: (
      state: MovieEditorState,
      action: PayloadAction<Movie["id"]>
    ) => {
      state.showEditor = true;
      state.movieId = action.payload;
      if (!action.payload) {
        state.movie = createRawMovie();
      }
    },
    setMovie: (
      state: MovieEditorState,
      action: PayloadAction<RawMovie>
    ) => {
      state.movie = {...action.payload};
    },
    closeEditor: (
      state: MovieEditorState
    ) => {
      state.movie = null;
      state.showEditor = false;
      state.movieId = undefined;
    },
  },
});

export const { showEditor, setMovie, closeEditor } = movieEditorSlice.actions;
export const movieEditorReducer = movieEditorSlice.reducer;
export const movieEditorPath = movieEditorSlice.name;

export const selectShowEditor = (state: RootState) => state.movieEditor.showEditor;
export const selectMovieId = (state: RootState) => state.movieEditor.movieId;
export const selectMovie = (state: RootState) => state.movieEditor.movie;
export const selectEditor = (state: RootState) => state.movieEditor;
