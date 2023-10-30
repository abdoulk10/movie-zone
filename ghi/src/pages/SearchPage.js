import React from "react";
import Search from "./Search";
import SearchMovies from "./SearchMovies";
import SearchActors from "./SearchActors";


function SearchPage() {
  return (
    <>
      <Search />
      <SearchActors />
      <SearchMovies />
    </>
  );
}

export default SearchPage;
