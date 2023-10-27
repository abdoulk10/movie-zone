import { useSelector } from "react-redux";
import {
  useLazySearchTmdbQuery,
  useGetAllWatchlistQuery,
} from "../app/apiSlice";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import CreateMovieButton from "../watchlist_functions/CreateMovie";

function SearchMovies() {
  const sTmdb = useSelector((state) => state.search.value);
  const { data: watchlists } = useGetAllWatchlistQuery();
  const [selectedWatchlists, setSelectedWatchlists] = useState([]);
  const handleWatchlistChange = (index, watchlistId, watchlistName) => {
    const updatedWatchlists = [...selectedWatchlists];
    updatedWatchlists[index] = { id: watchlistId, name: watchlistName };
    setSelectedWatchlists(updatedWatchlists);
  };

  const params = {
    search: sTmdb,
    type: "artist,movie",
    limit: 4,
    offset: 0,
  };
  const [trigger, { data, isLoading }] = useLazySearchTmdbQuery();

  useEffect(() => {
    if (sTmdb) {
      trigger(params);
    }
  }, [sTmdb]);
  if (isLoading) {
    return <progress className="progress is-primary" max="100"></progress>;
  }

  return (
    data && (
      <div className="row mt-3">
        <h1>Related Tracks</h1>
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Artist</th>
              <th>Length</th>
              <th>Watchlists</th>
              <th>Add</th>
            </tr>
          </thead>
          <tbody>
            {data[0][1]?.movies_info.map((movie, index) => {
              const artistLinks = movie.artist_name.map((artist, index) => (
                <Link
                  className="link-primary text-decoration-none"
                  key={index}
                  to={`/tmdb/artists/${artist["id"]}`}
                >
                  {artist.artist_name}
                  <br />
                </Link>
              ));

              return (
                <tr key={movie.id}>
                  <td>
                    <Link
                      className="link-primary text-decoration-none"
                      to={`/tmdb/tracks/${movie.id}`}
                    >
                      <img
                        src={movie.album_image}
                        width="90px"
                        height="90px"
                      ></img>
                    </Link>
                  </td>
                  <td>
                    <Link
                      className="link-primary text-decoration-none"
                      to={`/tmdb/tracks/${movie.id}`}
                    >
                      {movie.name}
                    </Link>
                  </td>
                  <td>{artistLinks}</td>
                  <td>
                    {Math.floor(movie.duration_ms / 60000)}:
                    {((movie.duration_ms / 1000) % 60)
                      .toFixed()
                      .padStart(2, "0")}
                  </td>
                  <td>
                    <div className="dropdown">
                      <Dropdown>
                        <Dropdown.Toggle
                          variant="secondary"
                          id={`dropdownMenuButton_${index}`}
                        >
                          {selectedWatchlists[index]
                            ? selectedWatchlists[index].name
                            : "Select Watchlist"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          {watchlists &&
                            watchlists?.watchlists.map((watchlist) => (
                              <Dropdown.Item
                                key={watchlist.id}
                                onClick={() =>
                                  handleWatchlistChange(
                                    index,
                                    watchlist.id,
                                    watchlist.name
                                  )
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
                    <CreateMovieButton
                      data={{
                        watchlist_id:
                          selectedWatchlists[index] &&
                          selectedWatchlists[index].id,
                        movie_number: movie && movie["movie_number"],
                        name: movie && movie["name"],
                        album: movie && movie["album_name"],
                        album_id: movie && movie["album_id"],
                        album_image: movie && movie["album_image"],
                        duration: movie && movie["duration_ms"],
                        spotify_id: movie && movie["id"],
                        artist: movie && movie["artist_name"],
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    )
  );
}
export default SearchMovies;
