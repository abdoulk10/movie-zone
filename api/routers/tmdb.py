from fastapi import APIRouter, Depends
from queries.tmdb import TmdbQueries


router = APIRouter()


@router.get("/api/tmdb/")
def search(
    s: str,
    o: int = 0,
    lim: int = 4,
    queries: TmdbQueries = Depends(),
):
    return [queries.search(s, o, lim)]


@router.get("/api/tmdb/artists/{id}")
def get_artist_info(
    id: str,
    queries: TmdbQueries = Depends(),
):
    return [queries.get_artist_info(id)]


@router.get("/api/tmdb/movie/{id}")
def get_movie_info(
    id: str,
    queries: TmdbQueries = Depends(),
):
    return [queries.get_movie_info(id)]
