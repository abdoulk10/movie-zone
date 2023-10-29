from fastapi.testclient import TestClient
from main import app
from queries.accounts import AccountQueries

client = TestClient(app)


class MockAccountQueries:

    def get_all_accounts(self):
        return [
            {
                "id": 1,
                "first_name": "Obiwan",
                "last_name": "Kenobi",
                "email": "ok@jedimaster.com",
                "username": "Obiwan",
            },
            {
                "id": 2,
                "first_name": "Anakin",
                "last_name": "Skywalker",
                "email": "darth@vader.com",
                "username": "vader",
            }
        ]


def test_all_accounts():
    app.dependency_overrides[AccountQueries] = MockAccountQueries
    response = client.get(
        "/get/all",
    )
    assert response.status_code == 200
    assert response.json() == [
        {
            "id": 1,
            "first_name": "Obiwan",
            "last_name": "Kenobi",
            "email": "ok@jedimaster.com",
            "username": "Obiwan",
        },
        {
            "id": 2,
            "first_name": "Anakin",
            "last_name": "Skywalker",
            "email": "darth@vader.com",
            "username": "vader",
            }
        ]



