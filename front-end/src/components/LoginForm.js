import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import global from "../data/global.json";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      navigate("/");
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsPending(true)

    // Make an API call to your server with the login credentials
    fetch(global.base_api + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((response) => {
        setIsPending(false)
        if (!response.ok) {
          throw new Error("Failed to log in.");
        }
        return response.json();
      })
      .then((data) => {
        const user = data;
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
      })
      .catch((error) => {
        console.error("Error logging in:", error);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card" style={{ width: "400px", height: "350px" }}>
        <div className="card-body d-flex flex-column justify-content-center">
          <h1 className="card-title text-center mb-4">Login</h1>
          <form id="login-form" onSubmit={handleLogin}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Login
            </button>
            {isPending && <div
            style={{ fontSize: "1.2rem",
            color: "blue",
            marginTop: "13px",
            textAlign: "center",
            fontStyle: "italic",
          }}> Loading...</div>}
          </form>
          <p className="text-center mt-3">
            Don't have an account? <Link to="/createaccount">Create one</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
