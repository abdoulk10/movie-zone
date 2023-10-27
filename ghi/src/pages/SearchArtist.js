import { useSelector, useDispatch } from "react-redux";
import { useLazySearchTmdbQuery } from "../app/apiSlice";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { search, reset } from "../app/searchSlice";

function SearchArtist() {
  const sTmdb = useSelector((state) => state.search.value);
  const dispatch = useDispatch();

  const params = {
    search: sTmdb,
    type: "artist,track",
    limit: 4,
    offset: 0,
  };

  const [trigger, { data, isLoading }] = useLazySearchTmdbQuery();

  useEffect(() => {
    if (sTmdb) {
      trigger(params);
    }
  }, [sTmdb]);

  useEffect(() => {
    if (data) {
      dispatch(reset());
    }
  }, [data]);

  if (isLoading) {
    return <progress className="progress is-primary" max="100"></progress>;
  }

  return (
    data && (
      <div className="row mt-3">
        <h1>Related Artists</h1>
        <table className="table table-striped table-md">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {data[0][0]?.artists_info.map((artist) => {
              return (
                <tr key={artist.id}>
                  <td>
                    <Link
                      className="link-primary text-decoration-none"
                      to={`/tmdb/artists/${artist.id}`}
                    >
                      <img
                        src={artist.artist_image}
                        width="90px"
                        height="90px"
                      ></img>
                    </Link>
                  </td>
                  <td>
                    <Link
                      className="link-primary text-decoration-none"
                      to={`/Tmdb/artists/${artist.id}`}
                    >
                      {artist.name}
                    </Link>
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
export default SearchArtist;
