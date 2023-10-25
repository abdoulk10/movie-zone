import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import "../styles/Homepage.css";

const TopRatedMovies = () => {
  const TOP_RATED_URL = "https://api.themoviedb.org/3/movie/top_rated?api_key=ade9ac2663bdc8bc0eae7b07d7787d12";
  const API_SEARCH="https://api.themoviedb.org/3/search/movie?api_key=ade9ac2663bdc8bc0eae7b07d7787d12&query="
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(TOP_RATED_URL)
      .then((response) => response.json())
      .then((data) => {
        setTopRatedMovies(data.results);
      })
      .catch((error) => {
        console.error("Error fetching top-rated movies: ", error);
      });
  }, []);

  const handleSearch = (e) => {
        e.preventDefault()

        fetch(API_SEARCH + search)
            .then(response => response.json())
            .then(data => setTopRatedMovies(data.results))
    }

  return (
    <div className="home-page">
        <div className="search_nav">
            <div className="title">
                <h1>Top Rated Movies</h1>
            </div>
        <div className="search_box">
            <form onSubmit={handleSearch}>
                <input onChange={(e) => setSearch(e.target.value)}/>
                <button>Search</button>
            </form>
        </div>
        </div>
      <div className="movies">
        {topRatedMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default TopRatedMovies;
