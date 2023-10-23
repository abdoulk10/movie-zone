import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Moviecard.css";
function MovieCard(props) {
    const [showOverview] = useState(false);
    const imageUrl = `https://image.tmdb.org/t/p/w500/${props.movie.poster_path}`;

    return (
        <div className="movie">
            <div className="hero">
                <Link to={`/movies/${props.movie.id}/detail`}>
                    <img className="poster" src={props.movie.poster_path ? imageUrl : "https://images.unsplash.com/photo-1540224871915-bc8ffb782bdf?auto=format&fit=crop&q=60&w=800&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjB8fGNpbmVtYXxlbnwwfHwwfHx8MA%3D%3D"} alt={props.movie.title} />
                </Link>
            </div>
            <div className="info">
                <h3 className="title">{props.movie.title}</h3>
                <div>
                    <h4 className="rating">{props.movie.vote_average.toFixed(1)}</h4>
                </div>
            </div>
            <div className="overview">
                <h5 className="title_overview">Overview:</h5>
                <h6 className="overview_info">{props.movie.overview}</h6>
            </div>
        </div>
    );
}

export default MovieCard;
