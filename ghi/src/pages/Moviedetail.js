import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/Moviedetail.css";
import { useAuthContext } from "./Authentication";

function MovieDetail(props) {
    const [videos, setVideos] = useState([]);
    const [watchProviders, setWatchProviders] = useState([]);
    const { id } = useParams();
    const [reviews, setReviews] = useState([]);
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
    const { token } = useAuthContext();
    useEffect(() => {
        async function fetchMovieDetails() {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_HOST}/movies/${id}/detail`
            );
            const data = await response.json();
            setMovie(data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchMovieDetails();
    }, [id]);
    useEffect(() => {
        async function fetchVideos() {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_HOST}/movies/${id}/videos`
            );
            const data = await response.json();
            setVideos(data.results?.slice(0, 2) || []);
        } catch (error) {
            console.error(error);
            }
        }
        fetchVideos();
    }, [id]);
    useEffect(() => {
        async function fetchWatchProviders() {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_HOST}/movies/${id}/watch-providers`
            );
            const data = await response.json();
            setWatchProviders(data.results.US?.flatrate?.slice(0, 5) || []);
        } catch (error) {
            console.error(error);
            }
        }
        fetchWatchProviders();
    }, [id]);
    useEffect(() => {
        async function fetchReviews() {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_HOST}/movies/${id}/reviews`
            );
            const data = await response.json();
            setReviews(data.results?.slice(0, 2) || []);
        } catch (error) {
            console.error(error);
            }
        }
        fetchReviews();
    }, [id]);

    const handleBookmark = async (token) => {
        if (!token) {
            alert("Please log in to bookmark a movie.");
        return;
        }
        const bookmarkData = {
            movie_id: id,
            user_id: token.user.id,
        };
        const url = `${process.env.REACT_APP_API_HOST}/movies/bookmarks/${token.user.id}`;
        if (!token.user.id) {
            alert("User ID is undefined.");
            return;
        }
        const fetchConfig = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.access_token}`,
            },
            body: JSON.stringify(bookmarkData),
        };
        await fetch(url, fetchConfig);
    };
    return (
        <div className="movie-detail-container">
            <div className="movie-detail-info">
                <div className="poster">
                    {movie.poster_path && (
                        <img
                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                            alt={movie.title}
                        />
                    )}
                </div>
                <div className="movie-detail-content">
                    <h2>{movie.title}</h2>
                    <p className="description">{movie.overview} </p>
                    <p>Release date: {movie.release_date}</p>
                    <div className="videos">
                        <h3>Trailers</h3>
                            {videos.map((video) => (
                                <div key={video.id}>
                                    <p>{video.name}</p>
                                    <iframe
                                        src={`https://www.youtube.com/embed/${video.key}`}
                                        title={video.name}
                                        width="560"
                                        height="315"
                                        allowFullScreen
                                    >
                                    </iframe>
                                </div>
                            ))}
                    </div>
                <div>
                <h3>Where to Watch</h3>
                    {watchProviders.length > 0 ? (
                        <ul>
                            {watchProviders.map((provider) => (
                                <li key={provider.provider_id}>{provider.provider_name}</li>
                            ))}
                        </ul>
                        ) : (
                            <p>Watch providers not available</p>
                        )}
                </div>
                <div className="bookmark">
                    {reviews.length > 0 && (
                        <div>
                            <h3>Reviews</h3>
                            <ul>
                                {reviews.slice(0, 3).map((review) => (
                                    <li key={review.id}>
                                        <p>Author: {review.author}</p>
                                        <p>Content: {review.content}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {token && (
                        <svg
                            width="120"
                            height="120"
                            onClick={() => handleBookmark(token)}
                        >
                            <a href="#">
                                <path
                                    d="M   0   0
                                            L 120   0
                                            L 120 120
                                            L  60  80
                                            L   0 120
                                            Z"
                                    fill="#007BFF"
                                />
                                <text
                                    x="60"
                                    y="50"
                                    fill="#FFFFFF"
                                    textAnchor="middle"
                                    alignmentBaseline="middle"
                                >
                                    Bookmark
                                </text>
                            </a>
                        </svg>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieDetail;
