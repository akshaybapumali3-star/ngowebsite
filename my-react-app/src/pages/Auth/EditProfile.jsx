import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css";

export default function EditProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setFormData({
        name: user.name || "",
        email: user.email || "",
      });
    } else {
      // Redirect if not logged in
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Update user data in localStorage
      const updatedUser = {
        ...JSON.parse(localStorage.getItem("user")),
        ...formData,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));

      // Dispatch event so header updates
      window.dispatchEvent(new Event("userLoggedIn"));

      alert("Profile updated successfully!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Error updating profile");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-top">
          <h2>Edit Your Profile</h2>
          <p style={{ color: "#666", marginBottom: 0 }}>Update your information</p>
        </div>

        <div className="auth-inner">
          <form className="auth-form" onSubmit={handleSubmit}>
            {/* PHOTO UPLOAD */}
            <div className="photo-upload-section">
              <div className="photo-preview">
                {preview ? (
                  <img src={preview} alt="Profile Preview" />
                ) : (
                  <div className="photo-placeholder">
                    {formData.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}
              </div>
              <label className="photo-upload-label">
                📷 Upload Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  style={{ display: "none" }}
                />
              </label>
            </div>

            {/* NAME INPUT */}
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            {/* EMAIL INPUT */}
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />

            {/* SUBMIT BUTTON */}
            <button className="auth-primary" type="submit">
              Save Changes
            </button>
          </form>

          {/* CANCEL BUTTON */}
          <button
            className="auth-cancel-btn"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
