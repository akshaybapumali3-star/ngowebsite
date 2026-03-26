import { Link, useNavigate } from "react-router-dom";
import "../styles/ngonavbar.css";

function NGONavbar({ ngoName }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // logout
    localStorage.removeItem("ngoToken");
    localStorage.removeItem("authRole");
    localStorage.removeItem("ngoId");
    localStorage.removeItem("ngoName");

    navigate("/ngo/login");
  };

  return (
    <header className="ngo-navbar">
      <div className="navbar-left">
        <h2 className="ngo-title">NGO Marketplace Dashboard</h2>
      </div>

      <nav className="navbar-right">
        <span className="ngo-name">👋 {ngoName}</span>

        {/* ✅ FIXED LINK */}
        <li>
          <Link to="/ngo/report-child">Report Child</Link>
        </li>

        <Link to="/ngo/marketplace">Marketplace</Link>
        <Link to="/ngo/volunteers">Volunteer Requests</Link>
        <Link to="/">Home</Link>

        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </nav>
    </header>
  );
}

export default NGONavbar;