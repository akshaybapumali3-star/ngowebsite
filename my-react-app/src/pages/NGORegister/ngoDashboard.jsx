import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ngodashboard.css";

function NGODashboard() {
  const navigate = useNavigate();

  const [ngoName, setNgoName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("ngoToken");

    if (!token) {
      navigate("/ngo/login");
    }

    // ✅ फक्त NGO नाव घे
    setNgoName(localStorage.getItem("ngoName"));

  }, [navigate]);

  return (
    <div className="ngo-dashboard">

      {/* ✅ NGO NAME ONLY */}
      <div className="ngo-profile-card">
        <h2>👋 Welcome</h2>
        <h3>{ngoName}</h3>
      </div>

      {/* Sliding Images */}
      <div className="slider">
        <div className="slides">
          <img src="/images/games.jpg" alt="ngo1"/>
          <img src="/images/child2.avif" alt="ngo2"/>
          <img src="/images/child1.jpg" alt="ngo3"/>
        </div>
      </div>

      {/* NGO Quotes */}
      <div className="ngo-quotes">
        <h2>💙 Our Mission</h2>

        <p className="quote">
          "Every child deserves a safe childhood, education, and love."
        </p>

        <p className="quote">
          "Small acts of kindness can change the life of a child forever."
        </p>

        <p className="quote">
          "Together we can protect every child and build a better future."
        </p>
      </div>

      {/* Info Section */}
      <div className="ngo-info">

        <div className="info-card">
          <h3>👶 Child Protection</h3>
          <p>
            Our NGO works to protect missing and vulnerable children
            and reunite them with their families.
          </p>
        </div>

        <div className="info-card">
          <h3>🤝 Volunteer Support</h3>
          <p>
            Volunteers help us organize rescue missions,
            awareness campaigns and child support programs.
          </p>
        </div>

        <div className="info-card">
          <h3>🌍 Community Impact</h3>
          <p>
            Through community participation we create a safe
            environment where every child can grow and thrive.
          </p>
        </div>

      </div>

    </div>
  );
}

export default NGODashboard;