import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./ngoAuth.css";

function NGOLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("ngoToken");

    if (token) {
      navigate("/ngo/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/ngo/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },

        // ✅🔥 MAIN FIX HERE
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password: password.trim()
        })
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("ngoToken", result.token || "");
        localStorage.setItem("authRole", "ngo");

        if (result.ngo) {
          localStorage.setItem("ngoId", result.ngo.id);
          localStorage.setItem("ngoName", result.ngo.name);
          localStorage.setItem("ngoEmail", result.ngo.email);
        }

        navigate("/ngo/dashboard");
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="ngo-auth-page">
      <div className="ngo-auth-card">
        <h2>NGO Login</h2>

        <form onSubmit={handleSubmit}>
          
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>

        <p>
          Don't have account? <Link to="/ngo/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default NGOLogin;