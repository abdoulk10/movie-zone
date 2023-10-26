import React from "react";
import { Link } from "react-router-dom";
import { useGetSpecificWatchlistQuery } from "../app/apiSlice";

function WatchlistLink({ watchlist }) {
  const {
    data: watchlistData,
    error,
    isLoading,
  } = useGetSpecificWatchlistQuery(watchlist.id);

  return (
    <Link to={`/${watchlist.id}`}>
      {isLoading ? "Loading..." : watchlistData.name}
    </Link>
  );
}

export default WatchlistLink;
