from fastapi import APIRouter, HTTPException
from queries.bookmarks import BookmarkQueries
from pydantic import BaseModel

router = APIRouter()
queries = BookmarkQueries()


class BookmarkData(BaseModel):
    id: int
    poster_path: str
    title: str
    vote_average: float
    overview: str


@router.get("/api/bookmarks")
async def get_bookmarked_data():
    try:
        bookmarked_data = queries.get_bookmarked_data()
        formatted_data = []

        for item in bookmarked_data:
            try:
                formatted_item = {"_id": str(item["_id"]), **item}
                formatted_data.append(formatted_item)
            except Exception as e:
                print(f"Failed to process item: {str(item['_id'])} - {str(e)}")

        return {"bookmarked_data": formatted_data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/api/bookmarks/add")
async def add_to_bookmarks(item: BookmarkData):
    try:
        item_dict = item.dict()

        result = queries.add_to_bookmarks(item_dict)

        if result:
            return {"message": "Data added to bookmarks"}
        else:
            raise HTTPException(
                status_code=400, detail="Failed to add data to bookmarks"
            )
    except Exception as e:
        return {"error": str(e)}


@router.delete("/api/bookmarks/remove")
async def remove_bookmark(item_id: str):
    try:
        result = queries.remove_bookmark(item_id)
        if result:
            return {"message": "Data removed from bookmarks"}
        else:
            raise HTTPException(status_code=404, detail="Bookmark not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
