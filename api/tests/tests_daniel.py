import unittest
from fastapi.testclient import TestClient
from main import app
from httpx import AsyncClient
from MockTMDB import MockTMDB

class TestMovieRouter(unittest.TestCase):
    def test_movie_router_with_token(self):
        client = TestClient(app)

        mock_tmdb_client = MockTMDB()
        app.dependency_overrides[MockTMDB] = mock_tmdb_client

        response = client.get("/api/movies")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"id": 1, "title": "Movie 1", "overview": "Overview 1"})

if __name__ == "__main__":
    unittest.main()
