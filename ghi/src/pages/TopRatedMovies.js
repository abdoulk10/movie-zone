import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "./MovieCard";
import "../styles/Homepage.css";

const TopRatedMovies = () => {

  const TOP_RATED_URL = "https://api.themoviedb.org/3/movie/top_rated?api_key=ade9ac2663bdc8bc0eae7b07d7787d12";

  const [topRatedMovies, setTopRatedMovies] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(TOP_RATED_URL)
      .then((response) => response.json())
      .then((data) => {
        setTopRatedMovies(data.results);
      })
      .catch((error) => {
          console.error("Error fetching top-rated movies: ", error);
      });
  }, [TOP_RATED_URL, navigate]);


  return (
    <div className="home-page">
        <div className="search_nav">
            <div className="page-title">
                <h1>Top Rated Movies</h1>
            </div>
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
