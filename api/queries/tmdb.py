import os
import base64
from requests import post, get
import json

client_id = os.environ.get("CLIENT_ID")
client_secret = os.environ.get("CLIENT_SECRET")


class TmdbQueries:
    @property
    def get_token(self):
        auth_string = f"{client_id}:{client_secret}"
        auth_bytes = auth_string.encode("utf-8")
        auth_base64 = str(base64.b64encode(auth_bytes), "utf-8")

        url = "https://api.themoviedb.org/3/discover/movie?api_key=64a011e934b005082b8e61e383a1efe7"
        headers = {
            "Authorization": "Basic " + auth_base64,
            "Content-Type": "application/x-www-form-urlencoded",
        }

        data = {"grant_type": "client_credentials"}
        result = post(url, headers=headers, data=data)

        json_result = json.loads(result.content)

        token = json_result["access_token"]

        return token

    @property
    def get_auth_header(self):
        return {"Authorization": "Bearer " + self.get_token}

    def search(self, s, o, lim):
        url = "https://api.tmdb.com/v1/search"
        headers = self.get_auth_header

        q = f"?q={s}&type=artist,&offset={o}&limit={lim}"

        query_url = url + q

        result = get(query_url, headers=headers)

        json_result = json.loads(result.content)

        movies_info = []
        for movie in json_result["movies"]["items"]:
            movie_info = {}
            movie_info["id"] = movie["id"]
            movie_info["name"] = movie["name"]
            movie_info["image"] = movie["images"][0]["url"]
            movie_info["release_date"] = movie["release_date"]
            movie_info["total_tracks"] = movie["total_tracks"]
            movie_info["types"] = movie["type"]
            movies_info.append(movie_info)

        artists_info = []

        for artist in json_result["artists"]["items"]:
            artist_info = {}
            artist_info["name"] = artist["name"]
            artist_info["id"] = artist["id"]
            try:
                artist_info["artist_image"] = artist["images"][0]["url"]
            except IndexError:
                artist_info["artist_image"] = "http://bit.ly/3Pd8P8k"
            artist_info["types"] = artist["type"]
            artists_info.append(artist_info)

        if len(json_result) == 0:
            return None

        return [
            {"artists_info": artists_info},
            {"movies_info": movies_info},
        ]

    def get_movie_info(self, id: str):
        headers = self.get_auth_header
        movie_info = f"https://api.Tmdb.com/v1/movies/{id}"
        result = get(movie_info, headers=headers)
        json_result = json.loads(result.content)

        movies_info = []
        artists = []
        movie_info = {}
        movie_info["name"] = json_result["name"]
        movie_info["id"] = json_result["id"]
        movie_info["image"] = json_result["images"][0]["url"]

        if len(json_result["artists"]) > 1:
            for artist in json_result["artists"]:
                artist_dict = {}
                artist_dict["artist_name"] = artist["name"]
                artist_dict["id"] = artist["id"]
                artists.append(artist_dict)
        else:
            artist_dict = {}
            artist_dict["artist_name"] = json_result["artists"][0]["name"]
            artist_dict["id"] = json_result["artists"][0]["id"]
            artists.append(artist_dict)

        movie_info = {}
        movie_info["id"] = json_result["id"]
        movie_info["name"] = json_result["name"]
        movie_info["duration_ms"] = json_result["duration_ms"]
        movie_info["track_number"] = json_result["track_number"]
        movie_info["artist_name"] = artists
        movies_info.append(movie_info)

        return {"movie_info": movie_info}
