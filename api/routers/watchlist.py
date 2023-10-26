from fastapi import APIRouter, Depends, HTTPException
from models import (
    Watchlists,
    WatchlistIn,
    WatchlistOut,
    DeleteStatus,
)
from queries.watchlist import WatchlistQueries
from authenticator import authenticator


router = APIRouter()


@router.get("/api/watchlists", response_model=Watchlists)
def find_all(
    q: str | None = None,
    account_data: dict = Depends(authenticator.get_current_account_data),
    queries: WatchlistQueries = Depends(),
):
    return {"watchlists": queries.find_all(account_id=account_data["id"])}


@router.post("/api/watchlists", response_model=WatchlistOut)
def create_watchlist(
    watchlist_in: WatchlistIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    queries: WatchlistQueries = Depends(),
):
    return queries.create_watchlist(
        watchlist_in=watchlist_in, account_id=account_data["id"]
    )


@router.get("/api/watchlists/{watchlist_id}", response_model=WatchlistOut)
def get_watchlist(
    watchlist_id: str,
    account_data: dict = Depends(authenticator.get_current_account_data),
    queries: WatchlistQueries = Depends(),
):
    watchlist = queries.find_one(
        watchlist_id=watchlist_id, account_id=account_data["id"]
    )
    if watchlist is None:
        raise HTTPException(status_code=404, detail="Watchlist not found")
    return watchlist


@router.delete("/api/watchlists/{watchlist_id}", response_model=DeleteStatus)
def delete_watchlist(
    watchlist_id: str,
    account_data: dict = Depends(authenticator.get_current_account_data),
    queries: WatchlistQueries = Depends(),
):
    return {
        "status": queries.delete(
            watchlist_id=watchlist_id, account_id=account_data["id"]
        )
    }


@router.put("/api/watchlists/{watchlist_id}", response_model=WatchlistOut)
def update_watchlist(
    watchlist_id: str,
    watchlist_in: WatchlistIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    queries: WatchlistQueries = Depends(),
):
    watchlist = queries.update(
        watchlist_id=watchlist_id,
        watchlist_changes=watchlist_in,
        account_id=account_data["id"],
    )

    if watchlist is None:
        raise HTTPException(status_code=404, detail="Watchlist not Found")
    return watchlist
