import { configureStore } from "@reduxjs/toolkit";
import { moviezoneApi } from "./apiSlice";
import searchReducer from "./searchSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    [moviezoneApi.reducerPath]: moviezoneApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(moviezoneApi.middleware),
});

setupListeners(store.dispatch);
