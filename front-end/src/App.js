import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import LoginForm from "./components/LoginForm";
import CreateAccount from "./components/CreateAccount";
import { CreateItem } from "./Restricted";
import NotFound from "./pages/404";
import ItemPreview from "./components/ItemPreview";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="App">
      <div className="content">
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/createaccount" element={<CreateAccount />} />
            <Route path="/createitem" element={<CreateItem />} />
            <Route path="/items/:itemId" element={<ItemPreview />} />
            <Route path="/@me" element={<Profile />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </div>
  );
}

export default App;
