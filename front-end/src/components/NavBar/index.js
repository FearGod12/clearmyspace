import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import global from "../../data/global.json";
import "./styles.css"; // Import the custom styles

export default function NavBar() {
  const [categories, setCategories] = useState([]);
  const [states, setStates] = useState([]);
  const [showOverall, setShowOverall] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showStates, setShowStates] = useState(false);
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
          <span className="logo-text">{global.brand.name}</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setShowOverall(!showOverall)}
        >
          <FontAwesomeIcon icon={faBars} className="large-icon" />
        </button>
        <div className="collapse navbar-collapse justify-content-end drop">
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <button
                className="nav-link btn"
                onClick={() => setShowOverall(!showOverall)}
              >
                <FontAwesomeIcon icon={faBars} />
              </button>
              <ul
                className={`dropdown-menu dropdown-overall ${showOverall ? "show" : ""}`}
              >
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <button
                    className="nav-link dropdown-toggle"
                    onClick={() => setShowCategories(!showCategories)}
                  >
                    Categories
                  </button>
                  <ul
                    className={`dropdown-menu states dropdown-categories ${
                      showCategories ? "show" : ""
                    }`}
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
                  <button
                    className="nav-link dropdown-toggle"
                    onClick={() => setShowStates(!showStates)}
                  >
                    State
                  </button>
                  <ul
                    className={`dropdown-menu states dropdown-states ${
                      showStates ? "show" : ""
                    }`}
                  >
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
                    Sign-up/Sign-in
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
                  <button onClick={handleLogout} className="nav-link">
                    Logout
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
