const PortalLogin = () => {
  return (
    <div style={{ padding: "40px" }}>
      <h2>Portal Login</h2>

      <form style={{ maxWidth: "400px" }}>
        <input type="text" placeholder="Username" required /><br /><br />
        <input type="password" placeholder="Password" required /><br /><br />

        <button style={btnStyle}>Login</button>
      </form>
    </div>
  );
};

const btnStyle = {
  padding: "10px 20px",
  backgroundColor: "#0a3d62",
  color: "white",
  border: "none",
};

export default PortalLogin;