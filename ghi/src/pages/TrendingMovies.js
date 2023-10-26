import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "./MovieCard";import { useAuthContext } from "./Authentication";

const TrendingMovies = () => {
  const { token } = useAuthContext();

  const TRENDING_URL = "https://api.themoviedb.org/3/trending/movie/day?api_key=ade9ac2663bdc8bc0eae7b07d7787d12";
  const API_SEARCH="https://api.themoviedb.org/3/search/movie?api_key=ade9ac2663bdc8bc0eae7b07d7787d12&query="

  const [trendingMovies, setTrendingMovies] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
        navigate("/login");
    } else {
        fetch(TRENDING_URL)
            .then((response) => response.json())
            .then((data) => {
                setTrendingMovies(data.results);
            })
            .catch((error) => {
                console.error("Error fetching trending movies: ", error);
        });
    }
  }, [token, TRENDING_URL, navigate]);

  const handleSearch = (e) => {
        e.preventDefault()

        fetch(API_SEARCH + search)
            .then(response => response.json())
            .then(data => setTrendingMovies(data.results))
    }

  return (
    <div className="home-page">
        <div className="search_nav">
            <div className="title">
                <h1>Trending Movies</h1>
            </div>
        <div className="search_box">
            <form onSubmit={handleSearch}>
                <input onChange={(e) => setSearch(e.target.value)}/>
                <button>Search</button>
            </form>
        </div>
    </div>
      <div className="movies">
        {trendingMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default TrendingMovies;
