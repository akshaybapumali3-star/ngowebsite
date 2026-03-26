import { useState, useEffect } from "react";
import "./TrackComplaint.css";
import banner from "../../assets/child1.jpg";

const TrackComplaint = () => {
  const [email, setEmail] = useState("");
  const [complaintId, setComplaintId] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [generatedCaptcha, setGeneratedCaptcha] = useState("");

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setGeneratedCaptcha(captcha);
  };

  const handleTrack = async () => {
    if (!email || !complaintId || !captchaInput) {
      alert("Please fill all fields");
      return;
    }

    if (captchaInput.toUpperCase() !== generatedCaptcha) {
      alert("Captcha does not match!");
      setCaptchaInput("");
      generateCaptcha();
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/complaint/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, complaintId }),
      });

      const data = await res.json();
      if (!data.success) {
        alert("❌ Complaint not found");
        return;
      }

      let message = `✅ Complaint Found!\nStatus: ${data.data.status}`;
      if (data.data.ngo) {
        message += `\n\n🏢 Assigned NGO: ${data.data.ngo}`;
        if (data.data.ngoDetails) {
          message += `\n📞 Contact: ${data.data.ngoDetails.contact}`;
          message += `\n📧 Email: ${data.data.ngoDetails.email}`;
          message += `\n📍 Address: ${data.data.ngoDetails.address}`;
          message += `\n\n💡 The NGO will contact you soon for assistance.`;
        } else {
          message += `\n\n💡 NGO details will be available soon.`;
        }
      } else {
        message += `\n\n⏳ Your complaint is being reviewed by NGOs.`;
      }

      alert(message);
    } catch (err) {
      console.log(err);
      alert("❌ Error fetching complaint");
    }
  };

  return (
    <div className="track-container">
      <div className="track-image">
        <img src={banner} alt="Child Protection" />
      </div>

      <div className="track-form">
        <h2>Track Complaint</h2>

        <label>Registered Email / Mobile</label>
        <input
          type="text"
          placeholder="hello@abc.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Complaint ID</label>
        <input
          type="text"
          placeholder="Enter your Complaint ID"
          value={complaintId}
          onChange={(e) => setComplaintId(e.target.value)}
        />

        <label>Captcha</label>
        <div className="captcha-container">
          <span className="captcha-text">{generatedCaptcha}</span>
          <button type="button" className="refresh-captcha" onClick={generateCaptcha}>
            ⟳
          </button>
        </div>
        <input
          type="text"
          placeholder="Enter captcha"
          value={captchaInput}
          onChange={(e) => setCaptchaInput(e.target.value.toUpperCase())}
        />

        <button onClick={handleTrack} className="track-btn">
          Track Now
        </button>
      </div>
    </div>
  );
};

export default TrackComplaint;