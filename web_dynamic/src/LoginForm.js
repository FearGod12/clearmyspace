import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    //login logic here
    console.log('Logging in with:', username, password);
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
            <button type="submit" className="btn btn-primary btn-block">Login</button>
          </form>
          <p className="text-center mt-3">Don't have an account? <Link to="/createaccount">Create one</Link>.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

