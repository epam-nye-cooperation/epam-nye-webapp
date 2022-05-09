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

const MovieTag: string = "MOVIES";

export const moviesApi = createApi({
  reducerPath: "moviesPath",
  baseQuery: fetchBaseQuery({ baseUrl: "/movies" }),
  tagTypes: [MovieTag],
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
      providesTags: (result?: GetMoviesResponse) => {
        return result?.data && Array.isArray(result.data)
          ?
            [
              ...(result.data as RawMovie[]).map(
                ({ id }) => ({ type: MovieTag, id })
              ),
              { type: MovieTag, id: "LIST" }
            ]
          : [{ type: MovieTag, id: "LIST" }]
      },
    }),
    getMovie: builder.query<RawMovie, RawMovie["id"]>({
      query: (movieId: RawMovie["id"]) => ({
        url: `/${movieId}`
      }),
      providesTags: (_result, _error, id) => ([{ type: MovieTag, id }]),
    }),
    createMovie: builder.mutation<RawMovie, RawMovie>({
      query: (movie: RawMovie) => ({
        url: "",
        method: "POST",
        body: movie,
      }),
      invalidatesTags: [{ type: MovieTag, id: "LIST" }],
    }),
    updateMovie: builder.mutation<RawMovie, RawMovie>({
      query: (movie: RawMovie) => ({
        url: "",
        method: "PUT",
        body: movie,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: MovieTag, id },
        { type: MovieTag, id: "LIST" },
      ],
    }),
    deleteMovie: builder.mutation<void, number>({
      query: (movieId: number) => ({
        url: `/${movieId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, error, id) => {
        const tags = [];
        if (!error) {
          tags.push({ type: MovieTag, id });
        }
        tags.push({ type: MovieTag, id: "LIST" });
        return tags;
      },
    }),
  })
});

export const useGetMoviesQuery = moviesApi.endpoints.getMovies.useQuery;
export const useGetMovieQuery = moviesApi.endpoints.getMovie.useQuery;
export const useCreateMovieMutation = moviesApi.endpoints.createMovie.useMutation;
export const useUpdateMovieMutation = moviesApi.endpoints.updateMovie.useMutation;
export const useDeleteMovieMutation = moviesApi.endpoints.deleteMovie.useMutation;

export const moviesReducer = moviesApi.reducer;
export const moviesPath = moviesApi.reducerPath;
export const moviesMiddleware = moviesApi.middleware;
