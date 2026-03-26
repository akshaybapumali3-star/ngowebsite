import "../styles/loginpopup.css";
import { useNavigate } from "react-router-dom";

function LoginPopup({ onClose }) {
  const navigate = useNavigate();

  const handleClose = () => {
    if (onClose) onClose();
  };

  const goToLogin = () => {
    if (onClose) onClose();
    navigate("/login");
  };

  return (
    <div className="popup-overlay">
      <div className="popup-card">

        <button className="close-btn" onClick={handleClose}>×</button>

        <h2>Join Us in Protecting Every Child</h2>

        <p>
         To report a child, volunteer, or access secure services,
          please login to your account.
        </p>

        <div className="popup-buttons">
          <button
            className="login-btn"
            onClick={goToLogin}
          >
            Go To Login
          </button>
        </div>

      </div>
    </div>
  );
}

export default LoginPopup;