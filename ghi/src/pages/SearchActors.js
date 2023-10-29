import { useSelector, useDispatch } from "react-redux";
import { useLazySearchTmdbQuery } from "../app/apiSlice";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { search, reset } from "../app/searchSlice";

function SearchActors() {
  const sTmdb = useSelector((state) => state.search.value);
  const dispatch = useDispatch();

  const params = {
    search: sTmdb,
    type: "actors,movies",
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
        <h1>Related Actors</h1>
        <table className="table table-striped table-md">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {data[0][0]?.actors_info.map((actors) => {
              return (
                <tr key={actors.id}>
                  <td>
                    <Link
                      className="link-primary text-decoration-none"
                      to={`/tmdb/actors/${actors.id}`}
                    >
                      <img
                        src={actors.actors_image}
                        width="90px"
                        height="90px"
                      ></img>
                    </Link>
                  </td>
                  <td>
                    <Link
                      className="link-primary text-decoration-none"
                      to={`/Tmdb/actors/${actors.id}`}
                    >
                      {actors.name}
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
export default SearchActors;
