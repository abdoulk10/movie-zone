import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import "../App.css";

function Search() {
    const API_URL = "https://api.themoviedb.org/3/movie/popular?api_key=ade9ac2663bdc8bc0eae7b07d7787d12";
    const API_SEARCH = "https://api.themoviedb.org/3/search/movie?api_key=ade9ac2663bdc8bc0eae7b07d7787d12&query=";
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState("");
    const [term, setTerm] = useState("");
    const [matchCount, setMatchCount] = useState(0);

    useEffect(() => {
        fetch(API_URL)
            .then(response => response.json())
            .then(data => setMovies(data.results));
    }, []);

    useEffect(() => {
        if (term) {
            fetch(API_SEARCH + term)
                .then(response => response.json())
                .then(data => {
                    setMovies(data.results);
                    setMatchCount(data.total_results);
                });
        }
    }, [term]);

    const handleSearch = (e) => {
        e.preventDefault();
        setTerm(search);
    };

    return (
        <div className="search-page">
            <div className="search-box">
                <form onSubmit={handleSearch}>
                    <input
                        placeholder="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button>Search</button>
                </form>
                {matchCount > 0 && (
                    <div className="match-count">
                        {matchCount} movies matched "{term}"
                    </div>
                )}
            </div>
            <div className="movies">
                {movies?.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
}

export default Search;
