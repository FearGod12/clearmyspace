import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import LoginForm from './LoginForm';
import CreateAccount from './CreateAccount';
import ItemList from './ItemsList';
import CreateItem from './Restricted';

function App() {
  return (
    <div className="App">
      <div className="content">
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<ItemList />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/createaccount" element={<CreateAccount />} />
            <Route path="/createitem" element={<CreateItem />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
