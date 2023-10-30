import { useGetAllWatchlistQuery } from "./app/apiSlice";
import DeleteWatchlistButton from "./watchlist_functions/WatchlistFunctions";
import AllMoviesInWatchlist from "./MoviesInWatchlist";
import UpdateButton from "./watchlist_functions/UpdateWatchlist";
import CreateWatchlistButton from "./watchlist_functions/CreateWatchlist";
import { Link } from "react-router-dom";

function AllWatchlist() {
  const { data: watchlists, error, isLoading } = useGetAllWatchlistQuery();

  if (isLoading) {
    return <progress className="progress is-primary" max="100"></progress>;
  }

  return (
    <div className="row mt-3">
      <h1>My Watchlist</h1>
      <h3>
        <CreateWatchlistButton />
      </h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Movies</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {watchlists?.watchlists.map((watchlist) => {
            return (
              <tr key={watchlist.id}>
                <td>
                  <Link
                    className="link-primary text-decoration-none"
                    to={`/watchlist/${watchlist.id}/movies`}
                    state={{ data: { watchlist } }}
                  >
                    {watchlist.name}
                  </Link>
                </td>
                <td>
                  <AllMoviesInWatchlist watchlist_id={watchlist.id} />
                </td>
                <td>
                  <UpdateButton watchlist_data={watchlist} />
                </td>
                <td>
                  <DeleteWatchlistButton id={watchlist.id} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default AllWatchlist;
