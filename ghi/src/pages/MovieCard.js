import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../styles/Moviecard.css";
function MovieCard({ movie }) {
  const FALLBACK_IMAGE_URL = "https://images.unsplash.com/photo-1540224871915-bc8ffb782bdf?auto=format&fit=crop&q=60&w=800&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjB8fGNpbmVtYXxlbnwwfHwwfHx8MA%3D%3D";
  const imageUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

  const handleImageError = (event) => {
    event.target.src = FALLBACK_IMAGE_URL;
  };

  return (
    <div className="movie">
      <div className="hero">
        <Link to={`/movies/${movie.id}/detail`}>
          <img
            className="poster"
            src={imageUrl}
            onError={handleImageError}
            alt={movie.title}
          />
        </Link>
      </div>
      <div className="info">
        <h3 className="title">{movie.title}</h3>
        <div>
          <h4 className="rating">{movie.vote_average && typeof movie.vote_average === 'number' ? movie.vote_average.toFixed(1) : ''}</h4>
        </div>
      </div>
      <div className="overview">
        <h5 className="title_overview">Overview:</h5>
        <h6 className="overview_info">{movie.overview}</h6>
      </div>
    </div>
  );
}




export default MovieCard;
