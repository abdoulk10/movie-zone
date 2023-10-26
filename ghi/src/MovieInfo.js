import { useGetTmdbMovieQuery, useGetAllWatchlistQuery } from "./app/apiSlice";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import CreateMovieButton from "./watchlist_functions/CreateMovie.js";
import { useParams } from "react-router-dom";

const MovieInfo = () => {
  const { id } = useParams();
  const { data: movie, isLoading } = useGetTmdbMovieQuery(id);
  const { data: watchlists } = useGetAllWatchlistQuery();
  const [selectedWatchlist, setSelectedWatchlist] = useState("");
  const [selectedWatchlistName, setSelectedWatchlistName] =
    useState("watchlist");

  const handleSubmit = (e, id, name) => {
    e.preventDefault();
    setSelectedWatchlist(id);
    setSelectedWatchlistName(name);
  };

  const params = {
    watchlist_id: selectedWatchlist,
    movie_number: movie && movie[0]["movie_info"]["movie_number"],
    name: movie && movie[0]["movie_info"]["name"],
    tmdb_id: movie && movie[0]["movie_info"]["id"],
    artist: movie && movie[0]["movie_info"]["artist_name"],
  };

  if (isLoading) {
    return <progress className="progress is-primary" max="100"></progress>;
  }

  return (
    movie && (
      <div className="row mt-3">
        <h1>
          <img src={movie[0]["image"]} width="200px" height="200px"></img>
        </h1>
        <h1></h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Artist</th>
              <th>Length</th>
              <th>Select Watchlist</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{movie[0]["movie_info"]["movie_number"]}</td>
              <td>{movie[0]["movie_info"]["name"]}</td>
              <td>
                <div>
                  {movie[0]["movie_info"]["artist_name"]?.map((artist) => (
                    <React.Fragment key={artist.id}>
                      <Link
                        className="link-primary text-decoration-none"
                        to={`/tmdb/artists/${artist.id}`}
                      >
                        {artist.artist_name}
                      </Link>
                      <br />
                    </React.Fragment>
                  ))}
                </div>
              </td>
              <td>
                <div className="dropdown">
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="secondary"
                      id="dropdownMenuButton"
                    >
                      {selectedWatchlistName}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {watchlists &&
                        watchlists?.watchlists.map((watchlist) => (
                          <Dropdown.Item
                            value={selectedWatchlist}
                            key={watchlist.id}
                            onClick={(e) =>
                              handleSubmit(e, watchlist.id, watchlist.name)
                            }
                          >
                            {watchlist.name}
                          </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </td>
              <td>
                <CreateMovieButton data={params} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  );
};
export default MovieInfo;
