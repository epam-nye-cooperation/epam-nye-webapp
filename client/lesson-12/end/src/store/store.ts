import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { movieEditorPath, movieEditorReducer } from "./movies/editor.slice";
import { moviesMiddleware, moviesPath, moviesReducer } from "./movies/movies-api";
import { searchPath, searchReducer } from "./movies/search.slice";

const appReducer = combineReducers({
  [moviesPath]: moviesReducer,
  [searchPath]: searchReducer,
  [movieEditorPath]: movieEditorReducer,
});

export const store = configureStore({
  reducer: appReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat([moviesMiddleware])
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
