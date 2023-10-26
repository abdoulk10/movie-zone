from fastapi import APIRouter, Depends, HTTPException
from models import DeleteStatus, MovieIn, MovieOut, Movies
from queries.movies import MoviesQueries
from authenticator import authenticator

router = APIRouter()


@router.get("/api/movies", response_model=Movies)
def find_all_movies(q: str | None = None, queries: MoviesQueries = Depends()):
    return {"movies": queries.find_all_movies()}


@router.get("/api/movies/{movie_id}", response_model=MovieOut)
def find_one_movie(movie_id: str, queries: MoviesQueries = Depends()):
    movie = queries.find_one_movie(movie_id=movie_id)
    if movie is None:
        raise HTTPException(status_code=404, detail="movie not found")
    return movie


@router.delete(
    "/api/watchlists/{watchlist_id}/movies/{movie_id}", response_model=DeleteStatus
)
def delete_movie(
    movie_id: str,
    watchlist_id: str,
    account_data: dict = Depends(authenticator.get_current_account_data),
    queries: MoviesQueries = Depends(),
):
    return {
        "status": queries.delete(
            movie_id=movie_id,
            account_id=account_data["id"],
            watchlist_id=watchlist_id,
        )
    }


@router.put("/api/movies/{movie_id}", response_model=MovieOut)
def update_movie(
    movie_id: str,
    movie_in: MovieIn,
    queries: MoviesQueries = Depends(),
):
    movie = queries.update(movie_id=movie_id, movie_changes=movie_in)

    if movie is None:
        raise HTTPException(status_code=404, detail="movie not Found")
    return movie


@router.post("/api/watchlist/{watchlist_id}/movies", response_model=MovieOut)
def create(
    watchlist_id: str,
    movie_in: MovieIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    queries: MoviesQueries = Depends(),
):
    return queries.create(
        watchlist_id=watchlist_id, movie_in=movie_in, account_id=account_data["id"]
    )


@router.get("/api/watchlists/{watchlist_id}/movies", response_model=Movies)
def movies_in_watchlist(
    watchlist_id: str,
    account_data: dict = Depends(authenticator.get_current_account_data),
    queries: MoviesQueries = Depends(),
):
    return queries.movies_in_watchlist(
        watchlist_id=watchlist_id, account_id=account_data["id"]
    )
