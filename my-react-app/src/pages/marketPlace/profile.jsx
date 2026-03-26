import React, { useEffect, useState } from "react";
import "./profile.css";

function EditProfile() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser")) || {
      name: "John Doe",
      email: "johndoe@example.com",
      phone: "+91 9876543210",
      address: "123 Main Street, Pune",
    };
    setUserData(storedUser);
  }, []);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("loggedInUser", JSON.stringify(userData));
    alert("Profile updated successfully!");
    window.location.href = "/marketplace/profile"; // redirect to profile page
  };

  const logout = () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "/marketplace/login"; // redirect to login page
  };

  return (
    <div className="profile-page">
      <header className="profile-header">
        <h2>Bal Vatsalya Marga Marketplace</h2>
      </header>

      <div className="page-title">
        <h2>Edit Profile</h2>
        <p>Update your account information</p>
      </div>

      <section className="profile-section">
        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your full name"
            required
            value={userData.name}
            onChange={handleChange}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
            value={userData.email}
            onChange={handleChange}
          />

          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="Enter your phone number"
            required
            value={userData.phone}
            onChange={handleChange}
          />

          <label htmlFor="address">Address</label>
          <textarea
            id="address"
            name="address"
            placeholder="Enter your address"
            rows="3"
            required
            value={userData.address}
            onChange={handleChange}
          />

          <div className="form-buttons">
            <button type="submit" className="dashboard-btn">
              Save Changes
            </button>
            <button
              type="button"
              className="dashboard-btn"
              onClick={() => (window.location.href = "/marketplace/profile")}
            >
              Cancel
            </button>
          </div>
        </form>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </section>
    </div>
  );
}

export default EditProfile;
