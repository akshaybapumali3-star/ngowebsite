import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./marketActivity.css";

function MarketActivity() {
  const navigate = useNavigate();
  const [ngoName, setNgoName] = useState("NGO");

  useEffect(() => {
    const token = localStorage.getItem("ngoToken");
    const name = localStorage.getItem("ngoName");

    if (!token) {
      navigate("/ngo/login");
    }

    if (name) {
      setNgoName(name);
    }
  }, [navigate]);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">
        Welcome, <span>{ngoName}</span>
      </h1>
      
      <p className="dashboard-subtitle">
        This is your marketplace dashboard. From here you can:
      </p>

      <div className="dashboard-cards">
        {/* Manage Products Card */}
        <div className="dashboard-card">
          <h3>📦 Manage Products</h3>
          <p>
            Add, edit, or remove your products/services for sale.
          </p>
          <button onClick={() => navigate("/ngo/market-products")}>
            Go to Products
          </button>
        </div>

        {/* Orders Card */}
        <div className="dashboard-card">
          <h3>📋 Orders / Contributions</h3>
          <p>
            Track orders, contributions, and donations made through your listings.
          </p>
          <button onClick={() => navigate("/ngo/market-orders")}>
            View Orders
          </button>
        </div>

        {/* Analytics Card */}
        <div className="dashboard-card">
          <h3>📊 Analytics</h3>
          <p>
            Check the performance of your listings and engagement stats.
          </p>
          <button onClick={() => navigate("/ngo/market-analytics")}>
            View Analytics
          </button>
        </div>

        {/* Add Product Card */}
        <div className="dashboard-card">
          <h3>➕ Add Product</h3>
          <p>
            Add a new product to your marketplace listings.
          </p>
          <button onClick={() => navigate("/ngo/add-product")}>
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}

export default MarketActivity;