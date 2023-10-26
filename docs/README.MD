## Project Documentation

1. `Functionality`: Articulate the capabilities of your app or service.
-Our FastAPI created with TMDB (the movie data base api) allows users to search and browse movies, display movie details, implements user registration and authentication to allow users to create accounts and manage their watchlists. The application also allows you to see trailer, ratings, and reviews. In the navigation bar a user can select Homepage, Popular movies, Trending movies, etc.



2. `User Stories/Scenarios`: Outline key use-cases, ideally using Gherkin syntax.
Feature: Movie Database API Application

  Scenario: Searching for Movies
    Given a user wants to search for movies
    When they enter the search query "Inception"
    Then they should receive a list of movies matching the query

  Scenario: Browsing Movies by Genre
    Given a user wants to browse movies by genre
    When they select the genre "Action"
    Then they should see a list of action movies

  Scenario: Viewing Movie Details
    Given a user wants to view the details of a movie
    When they select the movie "The Shawshank Redemption"
    Then they should see the movie's title, synopsis, release date, and cast

  Scenario: User Account Creation
    Given a user wants to create an account
    When they provide valid registration information
    Then they should have a registered account

  Scenario: Adding Movies to Watchlist
    Given a registered user wants to add a movie to their watchlist
    When they find the movie "The Godfather" and select "Add to Watchlist"
    Then the movie should be added to their watchlist


  Scenario: Movie Trailers and Videos
    Given a user wants to watch trailers and videos
    When they select a movie, e.g., "Jurassic Park"
    Then they should have access to trailers and promotional videos



3. `Intended Market`: Clearly define your user persona and target demographic.
User Persona:

Name: Movie Enthusiast
Age: 25-40
Gender: Any
Occupation: Various, including students, professionals, and movie industry workers.
Location: Urban and suburban areas
Interests:
Passionate about movies and TV shows
Enjoys both mainstream and indie films
Enjoys discussing and sharing movie recommendations
Keen on exploring movie details, cast, and trivia
Often watches movies in theaters, on streaming platforms, or owns a substantial movie collection
Tech-Savviness: Moderate to high
Device Preferences: Primarily mobile devices (smartphones and tablets), but also desktop users
Target Demographic:

Age Range: 18-60+
Gender: All genders
Geographic Location: Primarily urban and suburban areas with access to cinemas and streaming services.
Interests:
People who love movies and TV shows across various genres.
Moviegoers who frequently visit cinemas.
Cord-cutters and subscribers to streaming services.
Students looking for movie recommendations and film-related information.
Professionals in the film industry who need a resource for movie data.
Tech-Savviness: A broad range, from casual users to tech-savvy individuals.
Device Preferences: Primarily mobile devices but with a responsive web version for desktop users.



4. `Stretch Goals`: Document “nice-to-haves” in your product roadmap.
- E.g.: Implement a recommendation engine via collaborative filtering.


5. `Onboarding`: Detail the local dev setup, branching strategy, .env, 3rd party api keys, and CI/CD pipeline.
- E.g.: Fork the repo, clone locally, install dependencies via `npm install`, and checkout to a feature branch.

What you need to do to get started:
-Get a free API key at https://themoviedb.org/
-Clone the repo:
    https://gitlab.com/abradshaw0728/movie-zone.git
-Install NPM packages
    npm install
-Enter your API in config.js
    const API_KEY = 'ENTER YOUR API";



6. `Tech Stack`: Specify technologies, libraries, and frameworks.
-React
-FastAPI
-MongoDB
-Docker
-TMDB API
-Bootstrap
-Web-leb


7. `Journaling`: Maintain a dev log, perhaps in a `CHANGELOG.md`.
Developer journals are located in the Journals Folder.

8. `Documentation`: Attach DB schemas, wireframes, and API contracts.
-E.g.: point to the documents dir


9. `Issue Tracking`: Link to your Linear or JIRA board for bug tracking.
-E.g. - links or screenshoots, could be included in the doc’s dir


10. `Testing`: Describe unit tests.
-E.g. - <student name> : < location of test worked on>
