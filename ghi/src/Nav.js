import { NavLink } from "react-router-dom";
import { useGetTokenQuery, useLogoutMutation } from "./app/apiSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Meme from "./logo-image/Meme.png";

function NavBar() {
  const { data: account } = useGetTokenQuery();
  const [logout, logoutResponse] = useLogoutMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (logoutResponse.data) {
      navigate(`${"homepage"}`);
    }
  }, [logoutResponse]);

  const handleRefresh = () => {
    navigate(0);
  };

  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary"
      data-bs-theme="dark"
    >
      <div className="container-fluid navbar-nav me-auto mb-2 mb-lg-0">
        <NavLink to={"homepage"} className="navbar-brand">
          <img src={Meme} height="85px" width="85px"></img>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {account && (
              <li className="nav-item">
                <NavLink to={"allwatchlist"} className={"nav-link"}>
                  Watchlist
                </NavLink>
              </li>
            )}

            {account && (
              <li className="nav-item">
                <NavLink
                  to={"search"}
                  className={"nav-link"}
                  onSubmit={handleRefresh}
                >
                  Search
                </NavLink>
              </li>
            )}
            {!account && (
              <li className="nav-item">
                <NavLink to={"LoginPage"} className={"nav-link"}>
                  Login
                </NavLink>
              </li>
            )}
            {!account && (
              <li className="nav-item">
                <NavLink to={"SignupPage"} className={"nav-link"}>
                  Sign Up
                </NavLink>
              </li>
            )}
          </ul>

          {account && (
            <button
              className="btn btn-danger"
              to="logoutPage"
              onClick={() => logout()}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 home-bookm">
                        <li className="nav-item">
                            <NavLink className="nav-link active" aria-current="page" to="/homepage">
                            Homepage
                            </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink className="nav-link active" aria-current="page" to="/Bookmarkedmovies">
                          Bookmarks
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
                            <Link className="dropdown-item" to="/AccountDetails">Account Information</Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to="/login">Sign In</Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to="/signup">Sign Up</Link>
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
>>>>>>> origin/main
}

export default NavBar;
