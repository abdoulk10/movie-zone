import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import "../styles/Homepage.css";
import "../App.css";


function HomePage() {
    const [movieName, setmovieName] = useState("");
    const [movies, setMovies] = useState([]);
    const searchMovies = async (e) => {
        e.preventDefault();
        try {
            await fetch(
                `${process.env.REACT_APP_API_HOST}/movies/${movieName}`
            )
                .then((response) => response.json())
                .then((data) => {
                    setMovies(data);
                },);
        } catch (error) {
            setMovies([]);
        }
    };
    useEffect(() => {
        const getPopularMovies = async () => {
            try {
                await fetch(`${process.env.REACT_APP_API_HOST}/popular/`)
                    .then((response) => response.json())
                    .then((data) => {
                        setMovies(data);
                    });
                } catch (error) {
                    setMovies([]);
                }
            };
            getPopularMovies();
    }, []);
    return (
        <div className="home-page">
            <form className="form" onSubmit={searchMovies}>
                <input
                    className="input"
                    type="text"
                    name="query"
                    placeholder="i.e. Star Wars"
                    value={movieName}
                    onChange={(e) => setmovieName(e.target.value)}
                />
                <button className="button" type="submit">
                    Search
                </button>
            </form>
            <div className="card-list">
                {movies?.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
}

export default HomePage;
