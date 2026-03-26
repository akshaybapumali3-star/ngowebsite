const PortalHeader = () => {
  return (
    <div style={headerStyle}>
      <div style={logoContainer}>
        <img
          src="/assets/logo.png"   // Put your logo inside public folder
          alt="Balvatsalya Logo"
          style={logoStyle}
        />
        <h2 style={{ margin: 0 }}>
          Balvatsalya Child Protection Portal
        </h2>
      </div>
    </div>
  );
};

export default PortalHeader;


// ================= STYLES =================

const headerStyle = {
  backgroundColor: "#0a3d62",
  color: "white",
  padding: "20px 30px",
};

const logoContainer = {
  display: "flex",
  alignItems: "center",
  gap: "15px",
};

const logoStyle = {
  height: "90px",
  width: "50px",
};