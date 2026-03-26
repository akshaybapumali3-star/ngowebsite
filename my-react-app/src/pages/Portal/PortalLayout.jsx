import { Outlet } from "react-router-dom";
import PortalNavbar from "./PortalNavbar";
import PortalFooter from "./PortalFooter";
import logo from "../../assets/logo.png";  // ✅ adjust if needed

const PortalLayout = () => {
  return (
    <>
      <div style={topHeaderStyle}>
        <div style={logoContainer}>
          <img
            src={logo}
            alt="Balvatsalya Logo"
            style={logoStyle}
          />
          <div>
            <h2 style={{ margin: 0, color: "#0a3d62" }}>
              Balvatsalya Child Protection Portal
            </h2>
            <p style={{ margin: 0, fontSize: "14px", color: "#555" }}>
              Government Child Safety & Complaint Management System
            </p>
          </div>
        </div>
      </div>

      <div style={{ minHeight: "80vh", padding: "20px", backgroundColor: "#f6f1d4" }}>
        <Outlet />
      </div>

      <PortalFooter />
    </>
  );
};

export default PortalLayout;

const topHeaderStyle = {
  backgroundColor: "#f6f1d4",
  padding: "30px 40px",
  borderBottom: "2px solid #ddd",
};

const logoContainer = {
  display: "flex",
  alignItems: "center",
  gap: "25px",
};

const logoStyle = {
  height: "90px",
  width: "90px",
};