import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Import your images from assets
import slide1 from "../../assets/child1.jpg";
import slide2 from "../../assets/help.jpg";
import slide3 from "../../assets/back1.jpg";

const PortalHome = () => {
  const navigate = useNavigate();

  const images = [slide1, slide2, slide3];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={containerStyle}>
      
      {/* LEFT SIDE - IMAGE SLIDER */}
      <div style={leftStyle}>
        <img
          src={images[currentIndex]}
          alt="Child Protection"
          style={imageStyle}
        />
      </div>

      {/* RIGHT SIDE - HERO + BUTTONS */}
      <div style={rightStyle}>
        <h1 style={{ color: "#0a3d62" }}>
          Balvatsalya Child Protection Portal
        </h1>

        <p style={{ marginBottom: "30px" }}>
          Register and track complaints related to child safety.
          Your identity will remain confidential.
        </p>

        <button style={btnStyle} onClick={() => navigate("/portal/report")}>
          File Complaint
        </button>

        <button style={btnStyle} onClick={() => navigate("/portal/track-complaint")}>
          Track Complaint
        </button>

        <button style={btnStyle} onClick={() => navigate("/portal/login")}>
          Login
        </button>
      </div>
    </div>
  );
};

export default PortalHome;


// ================== STYLES ==================

const containerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "40px",
  gap: "40px",
  flexWrap: "wrap",
};

const leftStyle = {
  flex: 1,
  minWidth: "300px",
};

const rightStyle = {
  flex: 1,
  minWidth: "300px",
};

const imageStyle = {
  width: "100%",
  height: "400px",
  objectFit: "cover",
  borderRadius: "10px",
};

const btnStyle = {
  display: "block",
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  backgroundColor: "#0a3d62",
  color: "white",
  border: "none",
  cursor: "pointer",
  fontSize: "16px",
  borderRadius: "5px",
};