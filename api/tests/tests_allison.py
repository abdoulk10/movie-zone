from fastapi.testclient import TestClient
from main import app
from queries.users import UsersRepo

client = TestClient(app)


class FakeAllUserRepo:
    def get_all_users(self):
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
