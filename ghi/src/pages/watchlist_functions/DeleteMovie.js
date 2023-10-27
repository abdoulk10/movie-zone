import { useDeleteMovieMutation } from "../app/apiSlice";
import { useState, useEffect } from "react";

const DeleteMovieButton = ({ sId, pId }) => {
  const [deleteMovie] = useDeleteMovieMutation();

  return (
    <>
      <button
        className="btn btn-danger"
        onClick={() => deleteMovie({ sId, pId })}
      >
        Delete
      </button>
    </>
  );
};

export default DeleteMovieButton;
