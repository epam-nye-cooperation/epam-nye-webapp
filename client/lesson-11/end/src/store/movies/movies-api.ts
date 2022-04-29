import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Genre, RawMovie } from "../../model";

export interface GetMoviesResponse {
  data: RawMovie[];
  limit: number;
  offset: number;
  totalAmount: number;
}

export interface GetMoviesQueryParams {
  sortBy?: string;
  sortOrder?: string;
  search?: string;
  searchBy?: "title" | "genre";
  filter?: Genre[];
  offset?: number;
  limit?: number;
}

export const moviesApi = createApi({
  reducerPath: "moviesPath",
  baseQuery: fetchBaseQuery({ baseUrl: "/movies" }),
  endpoints: (builder) => ({
    getMovies: builder.query<GetMoviesResponse, GetMoviesQueryParams | undefined>({
      query: (filter: GetMoviesQueryParams) => {
        const queryParams = filter && (Object.keys(filter) as Array<keyof GetMoviesQueryParams>)
          .filter((key) => !!filter[key])
          .map((key) => {
            if (Array.isArray(filter[key])) {
              return `${key}=${(filter[key] as Genre[]).join(",")}`;
            }
            return `${key}=${encodeURIComponent(filter[key] as string)}`;
          });
        return {
          url: queryParams?.length ? `?${queryParams.join("&")}` : "/",
        };
      },
    }),
    getMovie: builder.query<RawMovie, RawMovie["id"]>({
      query: (movieId: RawMovie["id"]) => ({
        url: `/${movieId}`
      })
    }),
  })
});

export const useGetMoviesQuery = moviesApi.endpoints.getMovies.useQuery;
export const useGetMovieQuery = moviesApi.endpoints.getMovie.useQuery;

export const moviesReducer = moviesApi.reducer;
export const moviesPath = moviesApi.reducerPath;
export const moviesMiddleware = moviesApi.middleware;
