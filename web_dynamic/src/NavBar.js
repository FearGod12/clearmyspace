import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <span className="logo-text">clearMySpace</span>
        </Link>
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
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="categoriesDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Categories
              </Link>
              <ul className="dropdown-menu" aria-labelledby="categoriesDropdown">
                <li>
                  <Link className="dropdown-item" to="#">
                    Food Items
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    Groceries
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    Clothes
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    Jewelry
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    Electronics
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="stateDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                State
              </Link>
              <ul className="dropdown-menu" aria-labelledby="stateDropdown">
                <li>
                  <Link className="dropdown-item" to="#">
                    Abuja
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    Lagos
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    Oyo
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link to="/Login" className="nav-link">
                Login/Create Account
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

