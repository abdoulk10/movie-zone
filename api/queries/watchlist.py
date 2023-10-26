from pymongo import MongoClient
from models import WatchlistIn
import os
from bson.objectid import ObjectId
from bson.errors import InvalidId


DATABASE_URL = os.environ.get("DATABASE_URL")
client = MongoClient(DATABASE_URL)
db = client["mongo-db"]


class WatchlistQueries:
    @property
    def collection(self):
        return db["watchlist-db"]

    def create_watchlist(self, watchlist_in: WatchlistIn, account_id: str):
        watchlist = watchlist_in.dict()
        watchlist["account_id"] = account_id
        existing_watchlist_count = self.collection.count_documents({})
        watchlist["idx"] = existing_watchlist_count - 1
        self.collection.insert_one(watchlist)
        watchlist["id"] = str(watchlist["_id"])

        return watchlist

    def find_all(self, account_id: str):
        results = []
        final = []
        for watchlist in self.collection.find():
            watchlist["id"] = str(watchlist["_id"])
            results.append(watchlist)
        for account_watchlist in results:
            if (
                "account_id" in account_watchlist
                and account_watchlist["account_id"] == account_id
            ):
                final.append(account_watchlist)

        return final

    def find_one(self, watchlist_id: str, account_id: str):
        try:
            watchlist = self.collection.find_one(
                {"_id": ObjectId(watchlist_id), "account_id": account_id}
            )

        except InvalidId:
            return None
        if watchlist is None:
            return watchlist

        watchlist["id"] = str(watchlist["_id"])

        return watchlist

    def delete(self, watchlist_id: str, account_id: str):
        result = self.collection.delete_one(
            {"_id": ObjectId(watchlist_id), "account_id": account_id}
        )
        return result.deleted_count > 0

    def update(
        self, watchlist_id: str, watchlist_changes: WatchlistIn, account_id: str
    ):
        watchlist = watchlist_changes.dict()
        try:
            result = self.collection.update_one(
                {"_id": ObjectId(watchlist_id), "account_id": account_id},
                {"$set": watchlist},
            )

        except InvalidId:
            return None
        if result.matched_count == 0:
            return None
        watchlist["id"] = watchlist_id
        watchlist["account_id"] = account_id
        return watchlist
