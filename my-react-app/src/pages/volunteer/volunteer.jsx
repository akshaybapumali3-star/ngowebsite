import React, { useEffect, useState } from "react";
import axios from "axios";
import "./volunteer.css";

const Volunteer = () => {
  const [ngos, setNgos] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    address: "",
    mobile: "",
    skills: "",
    why: "",
    ngo: "",
  });
  const [statusMessage, setStatusMessage] = useState("");
  const [broadcast, setBroadcast] = useState({ subject: "", body: "" });
  const [broadcastResult, setBroadcastResult] = useState("");
  const [userRequests, setUserRequests] = useState([]);

  useEffect(() => {
    // fetch NGOs for dropdown
    axios
      .get("http://localhost:5000/api/ngo/list")
      .then((res) => setNgos(res.data))
      .catch((err) => console.error(err));

    // prefill form with user data
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.name) setFormData(prev => ({ ...prev, name: user.name }));
    if (user.email) setFormData(prev => ({ ...prev, email: user.email }));
    if (user.mobile) setFormData(prev => ({ ...prev, mobile: user.mobile }));
    if (user.address) setFormData(prev => ({ ...prev, address: user.address }));
    if (user.age) setFormData(prev => ({ ...prev, age: user.age }));
    if (user.skills) setFormData(prev => ({ ...prev, skills: user.skills }));

    // fetch user requests
    if (user.id) {
      axios
        .get(`http://localhost:5000/api/volunteers/user/${user.id}`)
        .then((res) => setUserRequests(res.data))
        .catch((err) => console.error("Error fetching user requests:", err));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user.id) {
      setStatusMessage("Please login before submitting.");
      return;
    }

    axios
      .post("http://localhost:5000/api/volunteers", {
        userId: user.id,
        ngoId: formData.ngo,
        name: formData.name,
        email: formData.email,
        age: formData.age,
        address: formData.address,
        mobile: formData.mobile,
        skills: formData.skills,
        preferences: formData.why,
      })
      .then((res) => {
        setStatusMessage("Request submitted! Thank you for volunteering.");
        // refresh user requests
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        if (user.id) {
          axios
            .get(`http://localhost:5000/api/volunteers/user/${user.id}`)
            .then((res) => setUserRequests(res.data))
            .catch((err) => console.error("Error fetching user requests:", err));
        }
      })
      .catch((err) => {
        console.error(err);
        setStatusMessage("Failed to submit request.");
      });
  };

  // broadcast helpers
  const handleBroadcastChange = (e) => {
    const { name, value } = e.target;
    setBroadcast((prev) => ({ ...prev, [name]: value }));
  };

  const sendBroadcast = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/ngo/broadcast", broadcast)
      .then((res) => setBroadcastResult(res.data.message))
      .catch((err) => {
        console.error(err);
        setBroadcastResult("Failed to send broadcast.");
      });
  };

  return (
    <>

      <section className="hero">
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <h1 className="hero-title">
            Become a Volunteer
            <span id="hero-typing" className="highlight-sand"></span>
          </h1>
          <p className="hero-subtext">Together, We Can Make a Difference.</p>
        </div>

        <div className="hero-banner-slider">
          <img src="/images/banner1.jpg" className="banner-slide" alt="Banner 1"/>
          <img src="/images/banner2.jpg" className="banner-slide" alt="Banner 2"/>
        </div>
      </section>

      <section className="join-section">
        <div className="join-center">
          <a href="#volunteer-form" className="btn-primary">
            Register for Volunteering
          </a>
        </div>
      </section>

      <section className="impact-wrapper">
        <div className="impact-message">

          <h2 className="impact-heading animate-heading">
            Your Time is Their <span>Greatest Gift</span>
          </h2>

          <p className="impact-text">
            Volunteers play a crucial role in shaping the lives of children and communities. 
            By giving your time, skills, and care, you help create opportunities for children 
            to learn, grow, and dream big. Your involvement not only supports the organization, 
            but also spreads awareness and inspires others to join the cause. Each small action 
            contributes to building confidence, hope, and a brighter future for children. 
            Volunteering is not just about helping others—it is about becoming a part of a 
            movement that creates lasting change. Join us and make every moment count for 
            those who need it the most.
          </p>

        </div>
      </section>


      <section className="roles-title-section">
        <div className="roles-title-wrap">

          <h2 className="roles-main-title">Areas Where You Can Help</h2>

          <p className="roles-sub-title">
            Your time, care, and skills can help children grow, learn, and smile
          </p>

        </div>
      </section>


      <section className="roles-wrapper">

        <section className="volunteer-roles">

          <div className="role-row">
            <img src="/images/teaching.jpg" alt="Teaching Children"/>
            <div className="role-content">
              <h3>📚 Teaching & Learning</h3>
              <p>
                Bring joy and confidence to children through education. By sharing your skills, 
                you empower them to dream big and build a brighter future. Your guidance helps 
                them grow, learn new skills, and discover their potential.
              </p>
            </div>
          </div>


          <div className="role-row reverse">
            <img src="/images/healthcare.jpg" alt="Healthcare Support"/>
            <div className="role-content">
              <h3>🩺 Healthcare Support</h3>
              <p>
                Support children’s health and well-being by participating in medical awareness 
                and checkup initiatives. Your care and guidance help them stay healthy, build 
                confidence, and learn healthy habits. Every small act of support can create 
                a lasting impact on their lives.
              </p>
            </div>
          </div>


          <div className="role-row">
            <img src="/images/games.jpg" alt="Fun Activities"/>
            <div className="role-content">
              <h3>🎯 Fun & Games</h3>
              <p>
                Create joyful moments for children through games, sports, and creative activities. 
                Your energy and enthusiasm help them laugh, connect, and build confidence. 
                Every playful interaction encourages learning, teamwork, and a sense of belonging.
              </p>
            </div>
          </div>


          <div className="role-row reverse">
            <img src="/images/mentoring.jpg" alt="Mentoring & Guidance"/>
            <div className="role-content">
              <h3>🤝 Mentoring & Guidance</h3>
              <p>
                Guide and support children through personal development and learning experiences. 
                Your encouragement and advice help them build confidence, make positive decisions, 
                and discover their strengths. Every mentoring session inspires growth, fosters 
                resilience, and creates meaningful connections that can shape their future.
              </p>
            </div>
          </div>


          <div className="role-row">
            <img src="/images/drama.jpg" alt="Drama And Performance"/>
            <div className="role-content">
              <h3>🎭 Drama & Performance</h3>
              <p>
                Inspire children through drama, storytelling, music, and performances. 
                Your creativity and expression help them build confidence, communication skills, 
                and emotional awareness. Every performance encourages self-expression, teamwork, 
                and the courage to share their voice with the world.
              </p>
            </div>
          </div>


          <div className="role-row reverse">
            <img src="/images/fitness.jpg" alt="Fitness Activity"/>
            <div className="role-content">
              <h3>💪Fitness Activity</h3>
              <p>
                Support children in staying active through fitness activities, exercises, and movement-based games. 
                Your motivation helps improve their strength, stamina, and overall health. 
                Each activity builds confidence, encourages discipline, and promotes a positive, 
                energetic, and healthy lifestyle.
              </p>
            </div>
          </div>

        </section>

      </section>



      <section className="help-section">
        <div className="help-box">

          <h2>Need Help or Have Questions?</h2>

          <p>
            If you need any assistance or have questions about volunteering,
            feel free to reach out to us. We’re here to help and guide you
            every step of the way.
          </p>

          <div className="help-contact">
            <a href="tel:+919876543210">📞 +91 98765 43210</a>
            <a href="mailto:volunteer@yourngo.org">✉ volunteer@yourngo.org</a>
          </div>

        </div>
      </section>



      {/* broadcast section separated */}
      <section className="broadcast-section">
        <div className="form-box" style={{ maxWidth: "600px", margin: "auto" }}>
          <h3>Message All NGOs</h3>
          <p style={{ textAlign: "center", marginBottom: "20px" }}>
            This message will be sent to every NGO registered on the website.
            (The dropdown below is only for volunteer registration.)
          </p>
          <form onSubmit={sendBroadcast}>
            <input
              name="subject"
              type="text"
              placeholder="Subject"
              value={broadcast.subject}
              onChange={handleBroadcastChange}
              required
            />
            <textarea
              name="body"
              rows="4"
              placeholder="Message body"
              value={broadcast.body}
              onChange={handleBroadcastChange}
              required
            />
            <button className="btn-primary" type="submit">
              Send to all NGOs
            </button>
          </form>
          {broadcastResult && <p className="status-message">{broadcastResult}</p>}
        </div>
      </section>

      <section className="form-section" id="volunteer-form">
        <div className="form-box">

          <div className="form-header">
            <h2 className="form-title">
              Your Journey to Helping Starts Here
            </h2>

            <p className="form-subtitle">
              Fill out the form below to become a part of our volunteer family and make a real difference.
            </p>
          </div>


          <form onSubmit={handleSubmit}>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
            />

            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
            />

            <input
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              placeholder="Age"
              required
            />

            <input
              name="mobile"
              type="tel"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Mobile Number"
              required
            />

            <textarea
              name="address"
              rows="2"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              required
            ></textarea>

            <textarea
              name="skills"
              rows="2"
              value={formData.skills}
              onChange={handleChange}
              placeholder="Skills and Experience"
              required
            ></textarea>

            <select
              name="ngo"
              value={formData.ngo}
              onChange={handleChange}
              required
            >
              <option value="">Select an NGO to support</option>
              {ngos.map((n) => (
                <option key={n._id} value={n._id}>
                  {n.name}
                </option>
              ))}
            </select>

            <textarea
              name="why"
              rows="3"
              value={formData.why}
              onChange={handleChange}
              placeholder="Why do you want to volunteer?"
              required
            ></textarea>

            <button type="submit" className="btn-primary">
              Join Now
            </button>

            {statusMessage && <p className="status-message">{statusMessage}</p>}

          </form>

        </div>

      </section>

      {/* User Dashboard Section */}
      <section className="dashboard-section" style={{ padding: "40px 20px", backgroundColor: "#f9f9f9" }}>
        <div className="dashboard-container" style={{ maxWidth: "800px", margin: "auto" }}>
          <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#333" }}>Your Volunteer Requests</h2>

          {userRequests.length === 0 ? (
            <p style={{ textAlign: "center", color: "#666" }}>No requests submitted yet.</p>
          ) : (
            <div className="requests-list">
              {userRequests.map((request) => (
                <div key={request._id} style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "20px", marginBottom: "20px", backgroundColor: "#fff" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                    <h3 style={{ margin: 0, color: "#333" }}>{request.ngo?.name}</h3>
                    <span style={{
                      padding: "5px 10px",
                      borderRadius: "4px",
                      color: "#fff",
                      backgroundColor: request.status === "accepted" ? "#28a745" : request.status === "rejected" ? "#dc3545" : "#ffc107"
                    }}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" }}>
                    <div>
                      <strong>Name:</strong> {request.name}
                    </div>
                    <div>
                      <strong>Email:</strong> {request.email}
                    </div>
                    <div>
                      <strong>Age:</strong> {request.age}
                    </div>
                    <div>
                      <strong>Mobile:</strong> {request.mobile}
                    </div>
                  </div>

                  <div style={{ marginBottom: "15px" }}>
                    <strong>Address:</strong> {request.address}
                  </div>

                  <div style={{ marginBottom: "15px" }}>
                    <strong>Skills:</strong> {request.skills}
                  </div>

                  <div style={{ marginBottom: "15px" }}>
                    <strong>Why I want to volunteer:</strong> {request.preferences}
                  </div>

                  {request.message && (
                    <div style={{ padding: "10px", backgroundColor: "#f8f9fa", borderRadius: "4px", borderLeft: "4px solid #dc3545" }}>
                      <strong>NGO Message:</strong> {request.message}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

    </>
  );
};

export default Volunteer;