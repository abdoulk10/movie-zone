import { useDeleteWatchlistMutation } from "../app/apiSlice";

const DeleteWatchlistButton = ({ id }) => {
  const [deleteWatchlist] = useDeleteWatchlistMutation(id);

  return (
    <>
      <button className="btn btn-danger" onClick={() => deleteWatchlist(id)}>
        Delete
      </button>
    </>
  );
};

export default DeleteWatchlistButton;
