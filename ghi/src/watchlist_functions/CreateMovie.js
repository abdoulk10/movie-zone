import { useCreateMovieInWatchlistMutation } from "../app/apiSlice";

const CreateMovieButton = ({ data }) => {
  const [createMovie] = useCreateMovieInWatchlistMutation();

  const handleCreateMovie = async () => {
    try {
      const response = await createMovie(data);
    } catch (error) {
      if (error.message === "Movie already in watchlist") {
        alert("Movie already exists in the watchlist.");
      } else {
      }
    }
  };

  return (
    <>
      <button className="btn btn-success" onClick={handleCreateMovie}>
        +
      </button>
    </>
  );
};

export default CreateMovieButton;
