import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";

function Nav() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 home-bookm">MOVIE ZONE
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/homepage">
                            Homepage
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className="nav-link active"
                                aria-current="page"
                                to="/TrendingMovies"
                            >
                                Trending Movies
                            </Link>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className="nav-link active"
                                aria-current="page"
                                to="/TopRatedMovies"
                            >
                                Top Rated
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link active" aria-current="page" to="/LatestMovies">
                                Latest Movies
                            </NavLink>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                      <li className="nav-item dropdown">
                        <div
                          className="nav-link dropdown-toggle account-dd"
                          id="navbarDropdownMenuLink"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                        </div>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                          <li>
                            <Link className="dropdown-item" to="/AccountDetails">Account Information   |</Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to="/login">Sign In   |</Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to="/signup">Sign Up   |</Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to="/logout">Sign Out</Link>
                          </li>
                      </ul>
                      
                    </li>
                  </ul>
              </div>
          </div>
      </nav>
    );
}

export default Nav;
