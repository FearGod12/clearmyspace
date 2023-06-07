import React, { useEffect, useState } from "react";
import "./style.css";
import global from "../../data/global.json";
import { useNavigate } from "react-router-dom";
import data from "../../data/user";
import { FaUserAlt } from "react-icons/fa";

export default function Profile() {
  const [user, setUser] = useState(data);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(global.base_api + "users/" + user.id)
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
            <div className="row g-5">
              <div className="col-8 d-flex">
                <div className="user-image me-4">
                  <h1 className="display-5">
                    {user.firstname.slice(0, 1) + user.lastname.slice(0, 1)}
                  </h1>
                </div>
                <div>
                  <h5 className="display-6 text-center">
                    {user.firstname + " " + user.lastname}
                  </h5>
                  <small>
                    <FaUserAlt /> {user.username}
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
