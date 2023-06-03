import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Make an API call to your server with the login credentials
    fetch('http://localhost:5001/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to log in.');
        }

        // Login successful
        console.log('Logged in successfully');
        return response.json();
      })
      .then((data) => {
        const token = data.id; 
        console.log(token)  // Assuming the session['id'] is the token
        localStorage.setItem('token', token); // Store the token in localStorage
        alert("login successful")
        navigate('/');
      })
      .catch((error) => {
        console.error('Error logging in:', error);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card" style={{ width: '400px', height: '350px' }}>
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
