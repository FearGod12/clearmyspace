import { Link } from "react-router-dom";
import global from "../../data/global.json";
import "./styles.css"; // Import the custom styles
import Toggler from "./Toggler";

export default function NavBar() {
  return (
    <nav className="navbar bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <span className="logo-text">{global.brand.name}</span>
        </Link>
        <Toggler />
      </div>
    </nav>
  );
}
