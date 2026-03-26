import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ngoVolunteers.css";

const NgoVolunteers = () => {
  const [requests, setRequests] = useState([]);
  const [messageInput, setMessageInput] = useState({});
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);

  const ngo = JSON.parse(localStorage.getItem("ngo") || "{}");

  useEffect(() => {
    if (!ngo._id) return;

    axios
      .get(`http://localhost:5000/api/volunteers/ngo/${ngo._id}`)
      .then((res) => setRequests(res.data))
      .catch((err) => console.error(err));
  }, [ngo._id]);

  const updateStatus = (id, status) => {
    axios
      .patch(`http://localhost:5000/api/volunteers/${id}/status`, { status })
      .then((res) => {
        setRequests((prev) =>
          prev.map((r) =>
            r._id === id
              ? { ...r, status: res.data.status, message: res.data.message || r.message }
              : r
          )
        );
      })
      .catch((err) => console.error(err));
  };

  const sendMessage = (id) => {
    const message = messageInput[id];
    if (!message) return alert("Please enter a message before rejecting");

    axios
      .patch(`http://localhost:5000/api/volunteers/${id}/status`, { 
        status: "rejected", 
        message 
      })
      .then((res) => {
        setRequests((prev) =>
          prev.map((r) =>
            r._id === id 
              ? { ...r, status: "rejected", message: res.data.message } 
              : r
          )
        );
        setMessageInput((prev) => ({ ...prev, [id]: "" }));
      })
      .catch((err) => console.error(err));
  };

  const handleViewDetails = (volunteer) => setSelectedVolunteer(volunteer);
  const closeModal = () => setSelectedVolunteer(null);

  return (
    <div className="ngo-volunteers-container">
      <h2>Volunteer Requests</h2>

      <div className="security-notice">
        <p>
          👥 <strong>Volunteer Applications:</strong> Review and manage volunteer requests for your NGO. Accept dedicated volunteers or provide feedback for improvement.
        </p>
      </div>

      {requests.length === 0 ? (
        <p style={{ textAlign: "center", color: "#666", fontSize: "16px" }}>
          No volunteer requests yet.
        </p>
      ) : (
        <table className="volunteer-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Age</th>
              <th>Skills</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((v) => (
              <tr key={v._id}>
                <td><strong>{v.name || v.user?.name}</strong></td>
                <td>{v.email || v.user?.email}</td>
                <td>{v.mobile || v.user?.mobile}</td>
                <td>{v.age || v.user?.age}</td>
                <td>{(v.skills || v.user?.skills)?.substring(0, 30)}...</td>
                <td>
                  <span 
                    className={`status ${v.status}`}
                  >
                    {v.status.charAt(0).toUpperCase() + v.status.slice(1)}
                  </span>
                </td>
                <td>
                  <button 
                    onClick={() => handleViewDetails(v)} 
                    style={{ marginRight: "8px", backgroundColor: "#0072b1", color: "white", padding: "6px 12px", border: "none", borderRadius: "4px", cursor: "pointer" }}
                  >
                    View Details
                  </button>
                  
                  {v.status === "pending" && (
                    <>
                      <button 
                        onClick={() => updateStatus(v._id, "accepted")} 
                        style={{ marginRight: "8px", backgroundColor: "green", color: "white", padding: "6px 12px", border: "none", borderRadius: "4px", cursor: "pointer" }}
                      >
                        Accept
                      </button>
                      <button 
                        onClick={() => {
                          const msg = prompt("Enter rejection message:");
                          if (msg) {
                            setMessageInput((prev) => ({ ...prev, [v._id]: msg }));
                            setTimeout(() => sendMessage(v._id), 100);
                          }
                        }} 
                        style={{ backgroundColor: "red", color: "white", padding: "6px 12px", border: "none", borderRadius: "4px", cursor: "pointer" }}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Details Modal */}
      {selectedVolunteer && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Volunteer Details</h3>
            <div className="volunteer-details">
              <p><strong>Name:</strong> {selectedVolunteer.name || selectedVolunteer.user?.name}</p>
              <p><strong>Email:</strong> {selectedVolunteer.email || selectedVolunteer.user?.email}</p>
              <p><strong>Mobile:</strong> {selectedVolunteer.mobile || selectedVolunteer.user?.mobile}</p>
              <p><strong>Age:</strong> {selectedVolunteer.age || selectedVolunteer.user?.age}</p>
              <p><strong>Address:</strong> {selectedVolunteer.address || selectedVolunteer.user?.address}</p>
              <p><strong>Skills:</strong> {selectedVolunteer.skills || selectedVolunteer.user?.skills}</p>
              <p><strong>Why Volunteering:</strong> {selectedVolunteer.preferences}</p>
              <p><strong>Status:</strong> <span className={`status ${selectedVolunteer.status}`}>{selectedVolunteer.status.charAt(0).toUpperCase() + selectedVolunteer.status.slice(1)}</span></p>
              
              {selectedVolunteer.message && (
                <p><strong>NGO Message:</strong> {selectedVolunteer.message}</p>
              )}
            </div>
            <button onClick={closeModal} className="close-modal">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NgoVolunteers;