import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import global from "../../data/global.json";
import "./styles.css"; // Import the custom styles
import { FaUserAlt } from "react-icons/fa";

export default function NavBar() {
  return (
    <nav className="navbar bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <span className="logo-text">{global.brand.name}</span>
        </Link>
        <Toggler />
      </div>
    </nav>
  );
}

function Toggler() {
  return (
    <>
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <FaUserAlt className="nav-btn-icon" /> {"Profile"}
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li>
            <a className="dropdown-item" href="#">
              Action
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Another action
            </a>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Something else here
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
