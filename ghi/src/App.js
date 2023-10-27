import { useEffect, useState } from "react";
import Construct from "./Construct.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage.js";
import Mainpage from "./pages/Mainpage.js";
import Nav from "./Nav.js";
import Login from "./pages/Login.js";
import Moviedetail from "./pages/Moviedetail.js";
import Logout from "./pages/Logout.js";
import Signup from "./pages/Signup.js";
import { AuthProvider, useToken } from "./pages/Authentication.js";
import AccountDetailView from "./pages/Accountpage.js";
import AccountEditForm from "./pages/Accounteditpage.js";
import TrendingMovies from "./pages/TrendingMovies.js";
import TopRatedMovies from "./pages/TopRatedMovies.js";
import LatestMovies from "./pages/LatestMovies.js";
import "./App.css";
import NavBar from "./Nav.js";
//import HomePage from "./HomePage.js";
//import LoginPage from "./LoginPage.js";
import SignupPage from "./pages/SignupPage.js";
import AllWatchlist from "./AllWatchlist.js";
import WatchlistPage from "./pages/WatchlistPage.js";
import MovieInfo from "./MovieInfo.js";
import SearchPage from "./pages/SearchPage.js";

function App() {
  return (
    <BrowserRouter basename={basename}>
      <AuthProvider>
        <GetToken />
        <Nav />
        <div className="container">
          <Routes>
            <Route path="/LatestMovies" element={<LatestMovies />} />
            <Route path="/TrendingMovies" element={<TrendingMovies />} />
            <Route path="/TopRatedMovies" element={<TopRatedMovies />} />
            <Route path="/" element={<Mainpage />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/AccountDetails" element={<AccountDetailView />} />
            <Route path="/movies/:id/detail" element={<Moviedetail />} />
            <Route path="/AccountDetails/edit" element={<AccountEditForm />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
