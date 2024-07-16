import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar navbar-light navbar-expand-md bg-light fixed">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
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
              <a className="nav-link" href="#">
                Home
              </a>
            </li>
            <li className="nav-item mx-1">
              <a className="nav-link" href="#">
                Help
              </a>
            </li>
          </ul>
          <div className="d-flex">
            <button className="btn btn-outline-primary me-2">Login</button>
            <button className="btn btn-outline-secondary">Sign Up</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
