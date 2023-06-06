import React, { useEffect, useState } from "react";
import "./style.css";
import global from "../../data/global.json";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(global.base_api + "@me")
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

  if (user) {
    return (
      <>
        <h1>{user.username}</h1>
      </>
    );
  } else {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  }
}
