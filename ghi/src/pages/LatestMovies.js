import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "./MovieCard";
import "../styles/Homepage.css";

const LatestMovies = () => {

  const UPCOMING_URL = "https://api.themoviedb.org/3/movie/upcoming?api_key=ade9ac2663bdc8bc0eae7b07d7787d12";
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
      fetch(UPCOMING_URL)
        .then((response) => response.json())
        .then((data) => {
          setUpcomingMovies(data.results);
        })
        .catch((error) => {
          console.error("Error fetching upcoming movies: ", error);
        });
    }, [ UPCOMING_URL, navigate]);

  return (
    <div className="home-page">
        <div className="search_nav">
            <div className="page-title">
                <h1>Latest Movies</h1>
            </div>
        </div>
      <div className="movies">
        {upcomingMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default LatestMovies;
