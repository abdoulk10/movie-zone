import { useGetAllMoviesInWatchlistQuery } from "./app/apiSlice";

const AllMoviesInWatchlist = ({ watchlist_id }) => {
  const { data } = useGetAllMoviesInWatchlistQuery(watchlist_id);

  return <div>{data?.movies.length}</div>;
};
export default AllMoviesInWatchlist;
