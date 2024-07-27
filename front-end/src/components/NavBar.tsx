import React from "react";
import { useContext } from "react";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";
import { AppContext } from "../auth-provider";
import { logout } from "../actions/auth";

const Navbar = () => {
  const { isAuth, setAuth } = useContext(AppContext);
  const handleLogout = async() => {
    await logout().then((res) => {
      if (res && res.status === 200) {
        setAuth(false);
      }
    });
  };
  return (
    <nav className="navbar navbar-light navbar-expand-md fixed">
      <div className="container-fluid">
        <a className="navbar-brand text-white" href="/">
          TEXT STEGANOGRAPHY
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto me-3">
            <li className="nav-item mx-1">
              <a className="nav-link text-white" href="/">
                Home
              </a>
            </li>
            <li className="nav-item mx-1">
              <a className="nav-link text-white" href="/encrypt">
                Encrypt
              </a>
            </li>

            <li className="nav-item mx-1">
              <a className="nav-link text-white" href="/decrypt">
                Decrypt
              </a>
            </li>

            <li className="nav-item mx-1">
              <a className="nav-link text-white" href="#">
                Key
              </a>
            </li>
          </ul>

          {isAuth ? (
            <div className="d-flex">
              <div
                onClick={handleLogout}
                className="btn btn-outline-primary me-2"
              >
                Logout
              </div>
            </div>
          ) : (
            <div className="d-flex">
              <Link to="/login" className="btn btn-outline-primary me-2">
                Login
              </Link>
              <Link to="/signup" className="btn btn-outline-secondary">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
