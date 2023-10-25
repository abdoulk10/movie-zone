from pymongo import MongoClient
import os

DATABASE_URL = os.environ.get("DATABASE_URL")
client = MongoClient(DATABASE_URL)
db = client["mongo-db"]


class BookmarkQueries:
    @property
    def collection(self):
        return db["bookmarks"]

    def get_bookmarked_data(self):
        bookmarked_data = list(self.collection.find())
        for item in bookmarked_data:
            item["_id"] = str(item["_id"])

        return bookmarked_data

    def add_to_bookmarks(self, item):
        self.collection.insert_one(item)

    def remove_bookmark(self, item_id):
        result = self.collection.delete_one({"_id": (item_id)})
        return result.deleted_count > 0


queries = BookmarkQueries()
