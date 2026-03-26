import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import "./auth.css";

export default function Signup() {
  const navigate = useNavigate();

  // ✅ Block page if NGO already logged in
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
      name: formData.get("name"),
      email: formData.get("email"),
      mobile: formData.get("mobile"),
      password: formData.get("password"),
    };

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message);

        // ✅ Ensure no NGO session exists
        localStorage.removeItem("ngoLoggedIn");

        navigate("/login");
      } else {
        alert(result.message);
      }

    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-top">
          <img
            src="/images/logo.png"
            alt="Bal Vatsalya Marge logo"
            className="auth-logo"
          />
          <h2>Create Your Bal Vatsalya Marge Account</h2>
        </div>
        
        <div className="auth-inner">
          <form className="auth-form" onSubmit={handleSubmit}>
            <input name="name" type="text" placeholder="Username" required />
            <input name="email" type="email" placeholder="Email" required />
            <input name="mobile" type="tel" placeholder="Mobile Number" />
            <input name="password" type="password" placeholder="Password" required />

            <button className="auth-primary" type="submit">
              Signup
            </button>
          </form>
        </div>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}