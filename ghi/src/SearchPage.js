import React from "react";
import Search from "./Search";
import SearchArtist from "./SearchArtist";
import SearchMovies from "./SearchMovies";


function SearchPage() {
  return (
    <>
      <Search />
      <SearchArtist />
      <SearchMovies />
    </>
  );
}

export default SearchPage;
