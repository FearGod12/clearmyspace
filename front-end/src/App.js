import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar";
import LoginForm from "./components/LoginForm";
import CreateAccount from "./components/CreateAccount";
import ItemList from "./components/ItemsList";
import CreateItem from "./Restricted";

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
