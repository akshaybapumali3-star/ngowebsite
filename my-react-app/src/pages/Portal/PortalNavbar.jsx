import { Link, useLocation } from "react-router-dom";
import "./PortalNavbar.css";

const PortalNavbar = () => {
  const location = useLocation();

  // Determine Home path dynamically
  const homePath =
    location.pathname === "/portal" ? "/" : "/portal";

  const navLinks = [
    { name: "Home", path: homePath },
    { name: "File Complaint", path: "/portal/report" },
    { name: "Track Complaint", path: "/portal/track-complaint" },
  
  ];

  return (
    <nav className="portal-navbar">
      <div className="navbar-container">

        {/* Links */}
        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={location.pathname === link.path ? "active" : ""}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Hamburger for mobile */}
        <input type="checkbox" id="menu-toggle" className="menu-toggle" />
        <label htmlFor="menu-toggle" className="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </label>

        <ul className="mobile-nav-links">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={location.pathname === link.path ? "active" : ""}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

      </div>
    </nav>
  );
};

export default PortalNavbar;