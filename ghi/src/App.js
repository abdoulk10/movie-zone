import { useEffect, useState } from "react";
import Construct from "./Construct.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./Nav.js";
import HomePage from "./HomePage.js";
import LoginPage from "./LoginPage.js";
import SignupPage from "./SignupPage.js";
import AllWatchlist from "./AllWatchlist.js";
import WatchlistPage from "./WatchlistPage.js";
import MovieInfo from "./MovieInfo.js";
import SearchPage from "./SearchPage.js";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/">
            <Route index element={<HomePage />} />
          </Route>
          <Route path="allwatchlist">
            <Route index element={<AllWatchlist />} />
          </Route>
          <Route path="watchlist/:id/movies" element={<WatchlistPage />} />
          <Route path="/tmdb/movies">
            <Route index element={<MovieInfo />} />
            <Route path=":id" element={<MovieInfo />} />
          </Route>
          <Route path="search">
            <Route index element={<SearchPage />} />
          </Route>
          <Route path="homePage">
            <Route index element={<HomePage />} />
          </Route>
          <Route path="loginPage">
            <Route index element={<LoginPage />} />
          </Route>
          <Route path="signupPage">
            <Route index element={<SignupPage />} />
          </Route>
          <Route path="signupPage/homePage" component={AllWatchlist}>
            <Route index element={<AllWatchlist />} />
          </Route>
          <Route path="/loginPage/allwatchlist" component={AllWatchlist}>
            <Route index element={<AllWatchlist />} />
          </Route>
          <Route path="/homePage/loginpage" component={LoginPage}>
            <Route index element={<LoginPage />} />
          </Route>
          <Route
            path="/homePage/loginpage/allwatchlist"
            component={AllWatchlist}
          >
            <Route index element={<AllWatchlist />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
