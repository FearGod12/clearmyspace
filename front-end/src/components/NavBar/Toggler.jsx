import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import global from "../../data/global.json";

export default function Toggler() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    fetch(global.base_api + "logout", { method: "POST" }).then((response) => {
      if (response.ok) {
        navigate("/");
      }
    });
  };

  if (user === null) {
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
              <Link className="dropdown-item" to="/login">
                Sign In
              </Link>
            </li>
          </ul>
        </div>
      </>
    );
  }
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
          <FaUserAlt className="nav-btn-icon" /> {user.username}
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li>
            <Link className="dropdown-item" to="/@me">
              Profile
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/@me/purchases">
              Purchases
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/@me/listings">
              Listings
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/createitem">
              Create new item
            </Link>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <button className="dropdown-item" onClick={logout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}
