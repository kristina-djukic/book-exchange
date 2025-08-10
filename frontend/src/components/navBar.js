import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hideOn = ["/login", "/register"];

  const handleLogout = async () => {
    try {
      await axios.post("/auth/logout", {}, { withCredentials: true });
      toast.success("Logged out successfully!");
      localStorage.setItem("isAuthenticated", false);

      navigate("/login");
    } catch (err) {
      toast.error("Logout failed. Please try again.");
      console.error("Logout error:", err);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
      <Link className="navbar-brand" to="/">
        Book Exchange
      </Link>
      {!hideOn.includes(location.pathname) && (
        <>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/homepage">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/mybooks">
                  My Books
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  Profile
                </Link>
              </li>
            </ul>

            {location.pathname === "/profile" ? (
              <button
                className="btn btn-outline-danger"
                type="button"
                onClick={handleLogout}
              >
                Log out
              </button>
            ) : (
              <form className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  name="search"
                  placeholder="Search books..."
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
            )}
          </div>
        </>
      )}
    </nav>
  );
};

export default NavBar;
