import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";   // ✅ ADD THIS
import "./auth.css";

export default function Login() {
  const navigate = useNavigate();

  // ✅ Block NGO from accessing user login
  useEffect(() => {
    const ngoLoggedIn = localStorage.getItem("ngoLoggedIn");
    if (ngoLoggedIn === "true") {
      navigate("/ngo/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {

        // ✅ REMOVE NGO LOGIN IF EXISTS
        localStorage.removeItem("ngoLoggedIn");

        // ✅ ADD ROLE FLAG
        localStorage.setItem("userLoggedIn", "true");

        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        
        window.dispatchEvent(new Event("userLoggedIn"));
        
        alert("Login Successful");
        navigate("/");
      } else {
        alert(result.message || "Login failed. Please try again.");
      }

    } catch (error) {
      console.error("Login Error:", error);
      alert("Connection Error: Make sure backend server is running on http://localhost:5000");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-top">
          <img src="/images/logo.png" alt="Bal Vatsalya Marge logo" className="auth-logo" />
          <h2>Login to Bal Vatsalya Marge</h2>
        </div>

        <div className="auth-inner">
          <form className="auth-form" onSubmit={handleSubmit}>
            <input name="email" type="email" placeholder="Email" required />
            <input name="password" type="password" placeholder="Password" required />
            <button className="auth-primary" type="submit">Login</button>
          </form>
        </div>

        <p className="auth-footer">
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
}