import "../styles/header.css";
import "../styles/marketplaceNavbar.css";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Listen for custom login event
    const handleUserLoggedIn = () => {
      const updatedUser = localStorage.getItem("user");
      if (updatedUser) {
        setUser(JSON.parse(updatedUser));
      }
    };

    // Listen for storage changes (when user logs in/out from other tabs)
    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem("user");
      if (updatedUser) {
        setUser(JSON.parse(updatedUser));
      } else {
        setUser(null);
      }
    };

    // Close dropdown when clicking outside
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };

    window.addEventListener("userLoggedIn", handleUserLoggedIn);
    window.addEventListener("storage", handleStorageChange);
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      window.removeEventListener("userLoggedIn", handleUserLoggedIn);
      window.removeEventListener("storage", handleStorageChange);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("popupShown");
    setUser(null);
    setShowProfile(false);
    
    // Dispatch custom event so other components know user logged out
    window.dispatchEvent(new Event("userLoggedOut"));
    
    navigate("/");
  };

  const handleEditProfile = () => {
    setShowProfile(false);
    navigate("/edit-profile");
  };

  return (
    <>
      {/* ===== TOP HEADER ===== */}
      <div className="top-header">
        <div className="header-inner">

          {/* LOGO */}
          <div className="d-flex align-items-center gap-3">
            <div className="logo-circle">
              <img src="/images/logo.png" alt="Bal Vatsalya Marga Logo" />
            </div>

            <div className="logo-text">
              <h1>Bal Vatsalya Marge</h1>
              <p className="tagline">Committed to Child Welfare & Growth</p>
            </div>
          </div>

          {/* RIGHT SECTION - Report Button + Profile */}
          <div className="header-right">
            <a href="#" className="report-child-btn">Report Child</a>
            
            {user ? (
              // Profile Section - Just Circle
              <div className="profile-section" ref={profileRef}>
                <button 
                  className="profile-circle"
                  onClick={() => setShowProfile(!showProfile)}
                  title={user.name || user.email}
                >
                  <span>{user.name?.charAt(0).toUpperCase() || "U"}</span>
                </button>

                {showProfile && (
                  <div className="profile-dropdown">
                    <div className="profile-header">
                      <div className="profile-avatar-large">{user.name?.charAt(0).toUpperCase() || "U"}</div>
                      <div className="profile-info">
                        <h3>{user.name || "User"}</h3>
                        <p>{user.email}</p>
                      </div>
                    </div>

                    <button 
                      className="profile-option edit-profile-btn"
                      onClick={handleEditProfile}
                    >
                      ✏️ Edit Profile
                    </button>

                    <div className="profile-divider"></div>

                    <button 
                      className="profile-option logout-btn"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : null}
          </div>

        </div>
      </div>
    </>
  );
}

export default Header;
