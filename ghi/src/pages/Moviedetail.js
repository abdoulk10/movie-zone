import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/Moviedetail.css";
import { useAuthContext } from "./Authentication";

function MovieDetail() {
  const { id } = useParams();
  const { token } = useAuthContext();

  const [movie, setMovie] = useState({
    title: "",
    overview: "",
    release_date: "",
    poster_path: "",
    backdrop_path: "",
    vote_average: 0,
    runtime: 0,
    genres: [],
  });

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=ade9ac2663bdc8bc0eae7b07d7787d12`
    )
      .then((response) => response.json())
      .then((data) => setMovie(data))
      .catch((error) => console.error("Error fetching movie details: ", error));
  }, [id]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=ade9ac2663bdc8bc0eae7b07d7787d12`
    )
      .then((response) => response.json())
      .then((data) => setReviews(data.results))
      .catch((error) => console.error("Error fetching reviews: ", error));
  }, [id]);

  const firstReviews = reviews.slice(0, 8);

  return (
    <div className="movie-detail">
      <h2 className="title">Title: {movie.title}</h2>
      <h3 className="release_date">Release Date: {movie.release_date}</h3>
      <h4 className="runtime">Runtime: {movie.runtime} min</h4>
      <h5 className="rating">Rating: {movie.vote_average.toFixed(1)}/10</h5>
      <h6 className="details_overview">Overview: {movie.overview}</h6>
      <p className="review_header">Reviews: </p>
      <div className="reviews-container">
        {firstReviews.length > 0 ? (
          <ul>
            {firstReviews.map((review) => (
              <li key={review.id} className="review">
                {review.content}
              </li>
            ))}
          </ul>
        ) : (
          <p className="no_reviews">No reviews yet :(</p>
        )}
      </div>
    </div>
  );
}

export default MovieDetail;
