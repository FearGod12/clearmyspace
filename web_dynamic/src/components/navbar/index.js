import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";

export default function NavBar() {
  const [categories, setCategories] = useState([]);
  const [states, setStates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
    fetchStates();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/v1/categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchStates = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/v1/states");
      const data = await response.json();
      setStates(data);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const handleLogout = () => {
    // Make an API call to log out the user
    fetch("http://localhost:5001/api/v1/logout", {
      method: "POST",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to log out.");
        }

        // Logout successful
        console.log("Logged out successfully");

        // Remove token from local storage
        localStorage.removeItem("token");
        alert("logout successful");

        navigate("/"); // Redirect to the home page
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

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
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
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
              <ul
                className="dropdown-menu"
                aria-labelledby="categoriesDropdown"
              >
                {categories.map((category) => (
                  <li key={category.id}>
                    <Link className="dropdown-item" to="#">
                      {category.name}
                    </Link>
                  </li>
                ))}
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
                {states.map((state) => (
                  <li key={state.id}>
                    <Link className="dropdown-item" to="#">
                      {state.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="nav-item">
              <Link to="/Login" className="nav-link">
                Login/Create Account
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={{
                  pathname: "/CreateItem",
                  state: { categories: categories },
                }}
                className="nav-link"
              >
                Create New Item
              </Link>
            </li>
            <li className="nav-item">
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
