import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "./MovieCard";
import "../styles/RandomMovie.css";
import "../App.css";

function RandomMoviePage() {
  const API_URL = "https://api.themoviedb.org/3";
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const genreButtons = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 53, name: "Thriller" },
  { id: 10770, name: "TV Movie" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

  useEffect(() => {
    if (selectedGenre) {
      setLoading(true);
      setError(null);

      fetch(`${API_URL}/discover/movie?api_key=ade9ac2663bdc8bc0eae7b07d7787d12&with_genres=${selectedGenre}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          if (data.results && data.results.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.results.length);
            const randomMovie = data.results[randomIndex];
            setMovies([randomMovie]);
          } else {
            setError("No movies found for the selected genre.");
          }
        })
        .catch((error) => {
          setError(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [API_URL, selectedGenre]);

  const handleGenreSelection = (genreId) => {
  setLoading(true);
  setError(null);
  setMovies([]);

  fetch(`${API_URL}/discover/movie?api_key=ade9ac2663bdc8bc0eae7b07d7787d12&with_genres=${genreId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      if (data.results && data.results.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.results.length);
        const randomMovie = data.results[randomIndex];
        setMovies([randomMovie]);
      } else {
        setError("No movies found for the selected genre.");
      }
    })
    .catch((error) => {
      setError(error.message);
    })
    .finally(() => {
      setLoading(false);
    });
};


  return (
    <div className="home-page">
      <div className="search_nav">
        <div className="page-title">
          <h1>Choose a genre!</h1>
        </div>
        <div className="genre">
          {genreButtons.map((genre) => (
            <button className="genre-button" key={genre.id} onClick={() => handleGenreSelection(genre.id)}>
              {genre.name}
            </button>
          ))}
        </div>
      </div>
      <div className="movies">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && movies.length > 0 && (
          <MovieCard key={movies[0].id} movie={movies[0]} />
        )}
      </div>
    </div>
  );
}

export default RandomMoviePage;
