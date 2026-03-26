// src/pages/NGORegister/NGOReportChild.jsx
import { useEffect, useState } from "react";
import "./NGOReportChild.css";

const NGOReportChild = () => {
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const ngoName = localStorage.getItem("ngoName"); // Logged-in NGO name

  // Fetch complaints from backend
  const fetchComplaints = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/complaint/all", {
        headers: {
          "x-ngo-name": ngoName, // Authorization header
        },
      });
      const data = await res.json();
      if (data.success) {
        setComplaints(data.data);
      }
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // Accept complaint
  const handleAccept = async (id) => {
    const res = await fetch("http://localhost:5000/api/complaint/accept", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ complaintId: id, ngoName }),
    });
    const data = await res.json();
    if (data.success) {
      alert("Accepted ✅");
      fetchComplaints();
    } else {
      alert(data.message || "Error");
    }
  };

  // Reject complaint (optional)
  const handleReject = async (id) => {
    const res = await fetch("http://localhost:5000/api/complaint/update-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ complaintId: id, status: "Rejected" }),
    });
    const data = await res.json();
    if (data.success) {
      alert("Rejected ❌");
      fetchComplaints();
    } else {
      alert(data.message || "Error");
    }
  };

  // Update status
  const handleUpdateStatus = async (id, newStatus) => {
    const res = await fetch("http://localhost:5000/api/complaint/update-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ complaintId: id, status: newStatus }),
    });
    const data = await res.json();
    if (data.success) {
      alert(`Status updated to ${newStatus} ✅`);
      fetchComplaints();
    } else {
      alert(data.message || "Error");
    }
  };

  // Modal controls
  const handleViewDetails = (complaint) => setSelectedComplaint(complaint);
  const closeModal = () => setSelectedComplaint(null);

  return (
    <div className="ngo-report-child-container">
      <h2>All Complaints</h2>

      <div className="security-notice">
        <p>
          🔒 <strong>Confidential:</strong> Child information is sensitive. Handle with care and maintain privacy.
        </p>
      </div>

      <table className="complaint-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Child</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Description</th>
            <th>Location</th>
            <th>Status</th>
            <th>NGO</th>
            <th>Photo</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((c) => (
            <tr key={c._id}>
              <td>{c.complaintId}</td>
              <td>{c.childName}</td>
              <td>{c.age}</td>
              <td>{c.gender}</td>
              <td>{c.description}</td>
              <td>
                {c.location ? `${c.location.lat.toFixed(4)}, ${c.location.lng.toFixed(4)}` : 'N/A'}
              </td>
              <td>{c.status}</td>
              <td>{c.assignedNgo || "Not Assigned"}</td>
              <td>
                {c.photoHash ? (
                  <img
                    src={`http://localhost:5000/uploads/${c.photoFilename}`}
                    alt="Child"
                    style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                  />
                ) : 'No Photo'}
              </td>
              <td>
                <button onClick={() => handleViewDetails(c)} style={{ marginRight: "10px", backgroundColor: "blue", color: "white" }}>
                  View Details
                </button>

                {c.status === "Pending" && (
                  <>
                    <button onClick={() => handleAccept(c.complaintId)} style={{ marginRight: "10px", backgroundColor: "green", color: "white" }}>
                      Accept
                    </button>
                    <button onClick={() => handleReject(c.complaintId)} style={{ backgroundColor: "red", color: "white" }}>
                      Reject
                    </button>
                  </>
                )}

                {c.status === "Accepted" && c.assignedNgo === ngoName && (
                  <>
                    <button onClick={() => handleUpdateStatus(c.complaintId, "In Progress")} style={{ marginRight: "10px", backgroundColor: "orange", color: "white" }}>
                      In Progress
                    </button>
                    <button onClick={() => handleUpdateStatus(c.complaintId, "Resolved")} style={{ backgroundColor: "green", color: "white" }}>
                      Resolved
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Details Modal */}
      {selectedComplaint && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Complaint Details</h3>
            <div className="complaint-details">
              <p><strong>ID:</strong> {selectedComplaint.complaintId}</p>
              <p><strong>Child Name:</strong> {selectedComplaint.childName}</p>
              <p><strong>Age:</strong> {selectedComplaint.age}</p>
              <p><strong>Gender:</strong> {selectedComplaint.gender}</p>
              <p><strong>Description:</strong> {selectedComplaint.description}</p>
              <p><strong>Reporter:</strong> {selectedComplaint.name}</p>
              <p><strong>Email:</strong> {selectedComplaint.email}</p>
              <p><strong>Mobile:</strong> {selectedComplaint.mobile}</p>
              <p><strong>Role:</strong> {selectedComplaint.role}</p>
              <p><strong>Location:</strong> {selectedComplaint.location ? 
                `${selectedComplaint.location.lat}, ${selectedComplaint.location.lng}` : 'N/A'}</p>
              <p><strong>Status:</strong> {selectedComplaint.status}</p>
              <p><strong>Assigned NGO:</strong> {selectedComplaint.assignedNgo || "Not Assigned"}</p>

              {selectedComplaint.photoHash && (
                <div className="photo-section">
                  <strong>Child Photo:</strong><br/>
                  <img
                    src={`http://localhost:5000/uploads/${selectedComplaint.photoFilename}`}
                    alt="Child"
                    style={{ maxWidth: '300px', maxHeight: '300px', objectFit: 'cover', borderRadius: '8px' }}
                  />
                </div>
              )}
            </div>
            <button onClick={closeModal} className="close-modal">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NGOReportChild;