from fastapi.testclient import TestClient
from main import app
from queries.movies import MoviesQueries

client = TestClient(app)


class FakeMoviesQueries:
    def find_all_movies(self, q: str | None = None):
        return [
            {
                "name": "Movie_1",
                "id": "64e7b077cb5c3ec61015fede",
                "account_id": "64e4ef1601c3eedf1445f385",
            }
        ]


def test_find_all_movies():
    app.dependency_overrides[MoviesQueries] = FakeMoviesQueries
    res = client.get("/api/movies")
    data = res.json()

    assert res.status_code == 200
    assert data == {
        "movies": [
            {
                "name": "Movie_1",
                "id": "64e7b077cb5c3ec61015fede",
                "account_id": "64e4ef1601c3eedf1445f385",
            }
        ]
    }
