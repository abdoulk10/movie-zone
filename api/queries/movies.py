from pymongo import MongoClient
from models import MovieIn
import os
from bson.objectid import ObjectId
from bson.errors import InvalidId


DATABASE_URL = os.environ.get("DATABASE_URL")
client = MongoClient(DATABASE_URL)
db = client["mongo-db"]

client_id = os.environ.get("CLIENT_ID")
client_secret = os.environ.get("CLIENT_SECRET")


class MoviesQueries:
    @property
    def collection(self):
        return db["movies-db"]

    def create(self, watchlist_id: str, movie_in: MovieIn, account_id: str):
        movie = movie_in.dict()
        movie["watchlist_id"] = watchlist_id
        movie["account_id"] = account_id
        movie["idx"] = 0
        self.collection.insert_one(movie)
        movie["id"] = str(movie["_id"])
        return movie

    def find_all_movies(self):
        results = []
        for movie in self.collection.find():
            movie["id"] = str(movie["_id"])
            results.append(movie)
        return results

    def find_one_movie(self, movie_id: str):
        try:
            movie = self.collection.find_one({"_id": ObjectId(movie_id)})

        except InvalidId:
            return None
        if movie is None:
            return movie

        movie["id"] = str(movie["_id"])

        return movie

    def delete(self, movie_id: str, account_id: str, watchlist_id: str):
        result = self.collection.delete_one(
            {
                "_id": ObjectId(movie_id),
                "account_id": account_id,
                "watchlist_id": watchlist_id,
            }
        )
        return result.deleted_count > 0

    def update(self, movie_id: str, movie_changes: MovieIn):
        movie = movie_changes.dict()
        try:
            result = self.collection.update_one(
                {"_id": ObjectId(movie_id)}, {"$set": movie}
            )
        except InvalidId:
            return None
        if result.matched_count == 0:
            return None
        movie["id"] = movie_id
        return movie

    def songs_in_watchlist(self, watchlist_id: str, account_id: str):
        results = []
        for movie in self.collection.find({"watchlist_id": watchlist_id}):
            movie["id"] = str(movie["_id"])
            movie["account_id"] = account_id
            results.append(movie)
        return {"movies": results}
