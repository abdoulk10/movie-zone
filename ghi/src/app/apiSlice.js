import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const moviezoneApi = createApi({
  reducerPath: "watchlistApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_HOST,
  }),
  tagTypes: ["watchlist", "movies"],
  endpoints: (builder) => ({
    getAllPlaylist: builder.query({
      query: () => ({
        url: "/api/watchlist",
        credentials: "include",
      }),
      providesTags: ["watchlist"],
    }),
    createWatchlist: builder.mutation({
      query: (data) => ({
        url: "/api/watchlist/",
        body: data,
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["watchlist"],
    }),
    getSpecificPlaylist: builder.query({
      query: (watchlist_id) => ({
        url: `/api/watchlist/${watchlist_id}`,
        credentials: "include",
      }),
      providesTags: ["watchlist"],
    }),
    deleteWatchlist: builder.mutation({
      query: (watchlist_id) => ({
        url: `/api/watchlist/${watchlist_id}`,
        method: "delete",
        credentials: "include",
      }),
      invalidatesTags: ["watchlist"],
    }),
    updateWatchlist: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/watchlist/${id}`,
        body: data,
        method: "PUT",
        credentials: "include",
      }),
      invalidatesTags: ["watchlist", "movies"],
    }),
    deleteMovie: builder.mutation({
      query: ({ sId, pId }) => ({
        url: `/api/watchlist/${pId}/movies/${sId}`,
        method: "delete",
        credentials: "include",
      }),
      invalidatesTags: ["movies"],
    }),
    getAllMoviesInPlaylist: builder.query({
      query: (id) => ({
        url: `/api/watchlist/${id}/movies`,
        credentials: "include",
      }),
      providesTags: ["movies"],
    }),
    createMoviesInPlaylist: builder.mutation({
      query: (data) => ({
        url: `/api/watchlist/${data.watchlist_id}/movies`,
        body: data,
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["movies", "watchlist"],
    }),
    searchTmdb: builder.query({
      query: (search) => ({
        url: `/api/tmdb`,
        params: search,
        method: "GET",
      }),
    }),
    searchTmdbGenre: builder.query({
      query: (data) => ({
        url: `/api/tmdb/genres`,
        params: data,
        method: "GET",
      }),
    }),
    getAllGenre: builder.query({
      query: () => `/api/tmdb/allgenres`,
    }),
    getTmdbArtist: builder.query({
      query: (id) => ({
        url: `/api/tmdb/artists/${id}`,
        method: "GET",
      }),
    }),
    getTmdbMovie: builder.query({
      query: (data) => ({
        url: `/api/tmdb/movie/${data}`,
        method: "GET",
      }),
    }),
    getTmdbRecommendations: builder.query({
      query: (data) => ({
        url: `/api/tmdb/recommendations/`,
        params: data,
        method: "GET",
      }),
    }),
    refetchOnMountOrArgChange: 30,
    endpoints: (builder) => ({
      getPosts: builder.query({
        query: () => `posts`,
      }),
    }),
    getToken: builder.query({
      query: () => ({
        url: `/token`,
        credentials: "include",
      }),
      transformResponse: (response) => response?.account || null,
      providesTags: ["Account"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: `/token`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Account"],
    }),
    login: builder.mutation({
      query: (info) => {
        const formData = new FormData();
        formData.append("username", info.username);
        formData.append("password", info.password);
        return {
          url: "/token",
          method: "POST",
          body: formData,
          credentials: "include",
        };
      },
      invalidatesTags: ["Account"],
    }),
    signup: builder.mutation({
      query: (data) => ({
        url: `/api/accounts`,
        body: data,
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["Account"],
    }),
  }),
});

export const {
  useGetTokenQuery,
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetAllWatchlistQuery,
  useCreateWatchlistMutation,
  useGetSpecificWatchlistQuery,
  useDeleteWatchlistMutation,
  useUpdateWathclistMutation,
  useDeleteMovieMutation,
  useGetAllMoviesInWatchlistQuery,
  useCreateMovieInWatchlistMutation,

  useSearchTmdbQuery,
  useLazySearchTmdbQuery,
  useSearchTmdbGenreQuery,
  useGetAllGenreQuery,

  useGetTmdbArtistQuery,
  useGetTmdbAlbumQuery,
  useGetTmdbTrackQuery,
  useLazyGetTmdbRecommendationsQuery,
} = moviezoneApi;
