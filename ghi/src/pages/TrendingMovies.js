import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "./MovieCard";

const TrendingMovies = () => {

  const TRENDING_URL = "https://api.themoviedb.org/3/trending/movie/day?api_key=ade9ac2663bdc8bc0eae7b07d7787d12";

  const [trendingMovies, setTrendingMovies] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(TRENDING_URL)
      .then((response) => response.json())
      .then((data) => {
        setTrendingMovies(data.results);
      })
      .catch((error) => {
        console.error("Error fetching trending movies: ", error);
      });
  }, [TRENDING_URL, navigate]);


  return (
    <div className="home-page">
        <div className="search_nav">
            <div className="page-title">
                <h1>Trending Movies</h1>
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
