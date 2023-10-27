import {
  useGetAllMoviesInWatchlistQuery,
  useGetSpecificWatchlistQuery,
} from "./app/apiSlice";
import DeleteMovieButton from "./watchlist_functions/DeleteMovie.js";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import UpdateButton from "./watchlist_functions/UpdateWatchlist.js";
import { useParams } from "react-router-dom";

function SpecificWatchlist() {
  const location = useLocation();
  const { data } = location.state;
  const { id } = useParams();
  const {
    data: watchlistData,
    error,
    isLoading,
  } = useGetAllMoviesInWatchlistQuery(id);

  const { data: watchlistName } = useGetSpecificWatchlistQuery(
    data.watchlist.id
  );

  if (isLoading) {
    return <progress className="progress is-primary" max="100"></progress>;
  }
  return (
    <div className="row mt-3">
      <h1>{watchlistName && watchlistName["name"]}</h1>
      <h3>
        <UpdateButton watchlist_data={data.watchlist} />
      </h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Title</th>
            <th>Artist</th>
            <th>Duration</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {watchlistData?.movies.map((movie, index) => {
            const artistLinks = movie.artist.map((artist) => (
              <Link
                className="link-primary text-decoration-none"
                key={artist.id}
                to={`/tmdb/artists/${artist.id}`}
              >
                {artist.artist_name}
                <br />
              </Link>
            ));
            return (
              <tr key={movie.id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={movie["album_image"]}
                    width="50px"
                    height="50px"
                  ></img>
                </td>
                <td>
                  <Link
                    className="link-primary text-decoration-none"
                    to={`/tmdb/movies/${movie.tmdb_id}`}
                  >
                    {movie.name}
                  </Link>
                </td>
                <td>{artistLinks}</td>
                <td>
                  <Link
                    className="link-primary text-decoration-none"
                    to={`/tmdb/albums/${movie.album_id}`}
                  >
                    {movie.album}
                  </Link>
                </td>
                <td>
                  <DeleteMovieButton
                    sId={movie.id}
                    pId={data.watchlist["id"]}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default SpecificWatchlist;
