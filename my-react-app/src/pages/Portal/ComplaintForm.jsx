import React, { useState, useEffect } from "react";
import "./ReportForm.css";

const ComplaintForm = () => {
  const [photoPreview, setPhotoPreview] = useState(null);

  // existing states
  const [location, setLocation] = useState({ lat: "", lng: "" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    role: "Citizen",
    childName: "",
    age: "",
    gender: "Male",
    description: "",
  });

  // ✅ added states
  const [complaintId, setComplaintId] = useState("");
  const [trackId, setTrackId] = useState("");
  const [trackResult, setTrackResult] = useState(null);

  // location fetch
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => {
        console.log("Location error:", err);
      }
    );
  }, []);

  // input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // photo preview
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  // =====================
  // SUBMIT COMPLAINT
  // =====================
  const handleSubmit = async () => {
    try {
      const form = new FormData();

      Object.keys(formData).forEach((key) => {
        form.append(key, formData[key]);
      });

      form.append("lat", location.lat);
      form.append("lng", location.lng);

      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput && fileInput.files[0]) {
        form.append("photo", fileInput.files[0]);
      }

      const res = await fetch("http://localhost:5000/api/complaint/create", {
        method: "POST",
        body: form,
      });

      const data = await res.json();

      if (data.success) {
        setComplaintId(data.complaintId);
        alert("Complaint Registered! ID: " + data.complaintId);

        setFormData({
          name: "",
          email: "",
          mobile: "",
          role: "Citizen",
          childName: "",
          age: "",
          gender: "Male",
          description: "",
        });
        setPhotoPreview(null);
      } else if (data.duplicate) {
        alert("Child already reported. Existing ID: " + data.complaintId);
      } else {
        alert("Error submitting complaint");
      }
    } catch (err) {
      console.log(err);
      alert("Error submitting complaint");
    }
  };

  // =====================
  // COPY ID
  // =====================
  const copyId = () => {
    navigator.clipboard.writeText(complaintId);
    alert("Complaint ID copied!");
  };

  // =====================
  // TRACK COMPLAINT
  // =====================
  const handleTrack = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/complaint/track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ complaintId: trackId }),
      });

      const data = await res.json();

      if (data.success) {
        setTrackResult(data.data);
      } else {
        alert("Complaint not found");
        setTrackResult(null);
      }
    } catch (err) {
      console.log(err);
      alert("Tracking error");
    }
  };

  return (
    <div className="complaint-page">
      <h2 className="page-title">Register Complaint</h2>
      <p className="subtitle">
        Please provide correct information. Fields marked * are mandatory.
      </p>

      <div className="complaint-layout">

        {/* LEFT FORM */}
        <div className="complaint-form">

          <div className="section">
            <h3>1. Complainant Details</h3>

            <label>Name *</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} />

            <label>Email *</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />

            <label>Mobile Number *</label>
            <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} />

            <label>Role</label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option>Citizen</option>
              <option>NGO</option>
              <option>Volunteer</option>
            </select>
          </div>

          <div className="section">
            <h3>2. Child Details</h3>

            <label>Child Name</label>
            <input type="text" name="childName" value={formData.childName} onChange={handleChange} />

            <label>Age *</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} />

            <label>Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>

            <label>Brief Description *</label>
            <textarea rows="4" name="description" value={formData.description} onChange={handleChange} />
          </div>

          <div className="section">
            <h3>3. Location of Incident</h3>

            <div className="map-box">
              <iframe
                title="map"
                src={`https://maps.google.com/maps?q=${location.lat},${location.lng}&z=15&output=embed`}
                width="100%"
                height="250"
                frameBorder="0"
              ></iframe>
            </div>

            <p>📍 Lat: {location.lat} | Lng: {location.lng}</p>
          </div>

          <div className="section">
            <h3>4. Upload Evidence</h3>

            <label>Child Photo (Camera / Upload)</label>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handlePhotoChange}
            />

            {photoPreview && (
              <div className="preview">
                <p>Photo Preview:</p>
                <img src={photoPreview} alt="Preview" />
              </div>
            )}

            <label>Video (optional)</label>
            <input type="file" accept="video/*" />
          </div>

          <button className="submit-btn" onClick={handleSubmit}>
            Submit Complaint
          </button>

          {/* SHOW COMPLAINT ID */}
          {complaintId && (
            <div className="id-box">
              <h3>Your Complaint ID: {complaintId}</h3>
              <button onClick={copyId}>Copy ID</button>
            </div>
          )}
        </div>

        {/* RIGHT SIDE PANEL */}
        <div className="complaint-side">

          <div className="side-card emergency">
            <h4>Need Immediate Help?</h4>
            <p className="helpline">📞 Child Helpline</p>
            <strong>1098</strong>
          </div>

          <div className="side-card">
            <h4>Track Complaint</h4>

            <input
              type="text"
              placeholder="Enter Report ID"
              className="track-input"
              value={trackId}
              onChange={(e) => setTrackId(e.target.value)}
            />

            <button className="track-btn" onClick={handleTrack}>
              Track Status
            </button>

            {trackResult && (
              <div className="track-result">
                <p><strong>Status:</strong> {trackResult.status}</p>
                <p><strong>NGO:</strong> {trackResult.ngo || "Not Assigned"}</p>
                <p>
                  <strong>Location:</strong>{" "}
                  {trackResult.location?.lat}, {trackResult.location?.lng}
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ComplaintForm;