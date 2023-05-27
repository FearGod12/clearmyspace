import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import LoginForm from './LoginForm';
import CreateAccount from './CreateAccount';

function App() {
  return (
    <div className="App">
      
      <div className="content">
        <Router>
        <NavBar />
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/createaccount" element={<CreateAccount />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;

