import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ngoRegister.css";

function NgoRegister() {
  const navigate = useNavigate();

  // 🔥 page open झाला की जुना token delete
  useEffect(() => {
    localStorage.removeItem("ngoToken");
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    address: "",
    description: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/ngo/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        alert("NGO Registered Successfully!");
        navigate("/ngo/login");
      } else {
        alert(data.message || "Registration Failed");
      }
    } catch (err) {
      alert("Server Error");
      console.error(err);
    }
  };

  return (
    <div className="ngo-register-container">
      <div className="ngo-card">
        <h2>NGO Registration</h2>

        <form className="ngo-form" onSubmit={handleSubmit}>
            <div className="extra-buttons">
  <button type="button" onClick={() => navigate(-1)}>
    ⬅ Back
  </button>

</div>
          <input type="text" name="name" placeholder="NGO Name" onChange={handleChange} required />

          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />

          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />

          <input type="text" name="contact" placeholder="Contact Number" onChange={handleChange} required />

          <input type="text" name="address" placeholder="Address" onChange={handleChange} required />

          <textarea name="description" placeholder="Describe your NGO activities" onChange={handleChange} required></textarea>

          <button type="submit">Register NGO</button>
          
        </form>
      </div>
    </div>
  );
}

export default NgoRegister;