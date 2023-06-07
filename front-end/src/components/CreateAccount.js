import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import global from "../data/global.json";

const CreateAccount = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleCreateAccount = (e) => {
    e.preventDefault();
    console.log(firstname, lastname, username, password, email);
    fetch(global.base_api + "users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname: firstname,
        lastname: lastname,
        username: username,
        email: email,
        phone: phone,
        password: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create an account.");
        }

        // Account created successfully
        console.log("Account created successfully");

        // Redirect to login page after creating account
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error creating account:", error);
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card" style={{ width: "400px", height: "500px" }}>
        <div className="card-body d-flex flex-column justify-content-center">
          <h1 className="card-title text-center mb-4">Create Account</h1>
          <form id="create-account-form" onSubmit={handleCreateAccount}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="First Name"
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Last Name"
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
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
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="phone"
                className="form-control"
                placeholder="0700 000 0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
              Create Account
            </button>
          </form>
          <p className="text-center mt-3">
            Already have an account? <Link to="/login">Login</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
