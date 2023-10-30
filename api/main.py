from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import accounts, watchlist, movies, tmdb
import os
from authenticator import authenticator


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(accounts.router, tags=["Accounts"])
app.include_router(authenticator.router, tags=["Accounts"])


@app.get("/api/launch-details")
def launch_details():
    return {
        "launch_details": {
            "module": 3,
            "week": 17,
            "day": 5,
            "hour": 19,
            "min": "00",
        }
    }


app.include_router(watchlist.router, tags=["Watchlist"])
app.include_router(movies.router, tags=["Movies"])
app.include_router(tmdb.router, tags=["Tmdb"])
