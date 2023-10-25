import React, { createContext, useContext, useReducer } from "react";

const initialState = {
  watchlist: [],
};

export const Context = createContext(initialState);

const contextReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_WATCHLIST":
      return { ...state, watchlist: [...state.watchlist, action.payload] };
    default:
      return state;
  }
};

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(contextReducer, initialState);

  const addToWatchlist = (movie) => {
    dispatch({ type: "ADD_TO_WATCHLIST", payload: movie });
  };

  return (
    <Context.Provider value={{ watchlist: state.watchlist, addToWatchlist }}>
      {children}
    </Context.Provider>
  );
};
