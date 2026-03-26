import { Link } from "react-router-dom";
import "../styles/marketplaceNavbar.css";

function MarketplaceNavbar() {
  return (
    <header className="market-header">
      <nav className="market-navbar">
        <ul className="market-nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/marketplace">Categories</Link></li>
          <li><Link to="/marketplace/orders">Orders</Link></li>
          <li><Link to="/marketplace/profile">Profile</Link></li>
          <li><Link to="/marketplace/cart">Cart</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default MarketplaceNavbar;
