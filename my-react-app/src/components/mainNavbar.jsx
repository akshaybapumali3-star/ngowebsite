import { Link } from "react-router-dom";
import "../styles/navbar.css";

function MainNavbar() {
  return (
    <header className="main-header">
      <nav className="navbar">
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/report-child">Report Child</Link></li>
          <li><Link to="/marketplace">Marketplace</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/volunteer">Volunteer</Link></li>

          {/* ✅ NGO REGISTER */}
          <li>
            <Link to="/ngo/register" className="ngo-register-btn">
              NGO Register
            </Link>
          </li>

          {/* ✅ NGO LOGIN */}
          <li>
            <Link to="/ngo/login" className="ngo-login-btn">
              NGO Login
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavbar;