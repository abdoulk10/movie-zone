from pydantic import BaseModel
from jwtdown_fastapi.authentication import Token
from typing import List, Optional


class AccountForm(BaseModel):
    username: str
    password: str


class AccountIn(BaseModel):
    username: str
    password: str


class AccountOut(BaseModel):
    id: str
    username: str


class AccountOutWithHashedPassword(AccountOut):
    hashed_password: str


class AccountToken(Token):
    account: AccountOut


class MovieIn(BaseModel):
    tmdb_id: str
    name: str
    artist: List
    album_image: str
    movie_number: str
    duration: str


class MovieOut(MovieIn):
    id: str
    idx: str = None
    none: Optional[str]
    account_id: str = None


class Movies(BaseModel):
    movies: List[MovieOut]


class WatchlistIn(BaseModel):
    name: str


class WatchlistOut(WatchlistIn):
    id: str
    idx: str = None
    account_id: str = None


class WatchlistMovieOut(WatchlistIn):
    id: str
    movies: List[MovieOut] = None


class Watchlists(BaseModel):
    watchlists: List[WatchlistOut]


class DeleteStatus(BaseModel):
    status: bool
