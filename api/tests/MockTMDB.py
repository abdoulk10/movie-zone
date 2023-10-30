import httpx
import json
from httpx import MockTransport
from fastapi import HTTPException

class MockTMDB:
    def __init__(self):
        self.client = httpx.Client(transport=MockTransport())

    async def get_movie_details(self, movie_id: int):
        mock_responses = {
            1: {"id": 1, "title": "Movie 1", "overview": "Overview 1"},
            2: {"id": 2, "title": "Movie 2", "overview": "Overview 2"},
        }

        if movie_id in mock_responses:
            response_data = mock_responses[movie_id]
            return response_data
        else:
            raise HTTPException(status_code=404, detail="Movie not found")

    def close(self):
        self.client.close()

    def __enter__(self):
        return self

    def __exit__(self, *args):
        self.client.__exit__(*args)

    def __enter__(self):
        return self

    def __exit__(self, *args):
        self.client.__exit__(*args)
