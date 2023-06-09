import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import global from "../../data/global.json";
import { useNavigate } from "react-router-dom";
import data from "../../data/user";
import { FaUserAlt } from "react-icons/fa";
import ProfileTab from "./ProfileTabs";

export default function Profile() {
  const [user, setUser] = useState(data);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(global.base_api + "/users/" + user.id)
      .then((response) => {
        if (!response.ok) {
          throw new Error("No current session");
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        navigate("/login");
      });

    fetch(global.base_api + "/users/" + user.id + "/reviews")
      .then((response) => {
        if (!response.ok) {
          throw new Error("No current session");
        }
        return response.json();
      })
      .then((data) => {
        setReviews(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!user) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  } else {
    return (
      <>
        <div className="container">
          <div className="container-fluid my-5">
            <div className="row g-5 d-flex mb-5">
              <div className="col-8 d-flex">
                <div className="user-image me-4">
                  <h1 className="display-5">
                    {user.firstname.slice(0, 1) + user.lastname.slice(0, 1)}
                  </h1>
                </div>
                <div>
                  <h5 className="display-6">
                    {user.firstname + " " + user.lastname}
                  </h5>
                  <small>
                    <FaUserAlt /> {user.username}
                  </small>
                </div>
              </div>
              <div className="col-4">
                <Link to="/createitem" className="btn btn-lg btn-primary">
                  Create Item
                </Link>
              </div>
            </div>
            <ProfileTab />
          </div>
        </div>
      </>
    );
  }
}
