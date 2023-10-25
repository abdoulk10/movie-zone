import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import "../styles/Homepage.css";
import "../App.css";

function HomePage() {
    const API_URL="https://api.themoviedb.org/3/movie/popular?api_key=ade9ac2663bdc8bc0eae7b07d7787d12"
    const API_SEARCH="https://api.themoviedb.org/3/search/movie?api_key=ade9ac2663bdc8bc0eae7b07d7787d12&query="
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState("");
    const [term, setTerm] = useState("");

    useEffect(() =>{
        fetch(API_URL)
            .then(response => response.json())
            .then(data => setMovies(data.results))
    },[])
    console.log(movies)

    const handleSearch = (e) => {
        e.preventDefault()

        fetch(API_SEARCH + search)
            .then(response => response.json())
            .then(data => setMovies(data.results));

        setTerm("");
    }


return (
        <div className="home-page">
            <div className="search_nav">
                <div className="title">
                    <h1>Movies</h1>
                </div>
                <div className="search_box">
                    <form onSubmit={handleSearch}>
                        <input value={term} onChange={(e) => setTerm(e.target.value)}/>
                        <button>Search</button>
                    </form>
                </div>
            </div>
            <div className="movies">
                {movies?.map((movie) => (
                    <MovieCard key={movie.id} movie={movie}/>
                ))}
            </div>
        </div>
    );
}

export default HomePage;
