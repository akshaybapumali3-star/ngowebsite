import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ngoAuth.css';

function AddActivity() {
  const [activity, setActivity] = useState({
    title: '',
    description: '',
    image: '',
    category: '',
    date: '',
    location: '',
    participantLimit: '',
    status: 'active'
  });
  const [categories, setCategories] = useState(['Volunteer', 'Community Service', 'Disaster Relief', 'Education', 'Healthcare', 'Others']);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if NGO is logged in
    const token = localStorage.getItem('ngoToken');
    if (!token) {
      navigate('/ngo/login');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setActivity(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const ngoId = localStorage.getItem('ngoId');
      if (!ngoId) {
        setMessage('NGO ID not found. Please login again.');
        return;
      }

      const payload = {
        ...activity,
        ngoId,
        createdAt: new Date().toISOString()
      };

      const res = await fetch('/api/activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to create activity');
      }

      const created = await res.json();
      setMessage('Activity added successfully!');
      
      setTimeout(() => {
        navigate('/ngo/marketplace');
      }, 1500);
    } catch (err) {
      console.error(err);
      setMessage(`Error: ${err.message}`);
    }
  };

  return (
    <div className="ngo-auth-container">
      <h2>Add Activity</h2>
      {message && <div className={`notification ${message.includes('Error') ? 'error' : 'success'}`}>{message}</div>}
      
      <form className="ngo-form" onSubmit={handleSubmit}>
        <label>Activity Title *</label>
        <input
          type="text"
          name="title"
          value={activity.title}
          onChange={handleChange}
          placeholder="e.g., Community Cleanup Drive"
          required
        />

        <label>Description *</label>
        <textarea
          name="description"
          value={activity.description}
          onChange={handleChange}
          placeholder="Provide details about your activity..."
          rows="4"
          required
        />

        <label>Activity Image URL</label>
        <input
          type="url"
          name="image"
          value={activity.image}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
        />

        <label>Category *</label>
        <select
          name="category"
          value={activity.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <label>Date *</label>
        <input
          type="date"
          name="date"
          value={activity.date}
          onChange={handleChange}
          required
        />

        <label>Location *</label>
        <input
          type="text"
          name="location"
          value={activity.location}
          onChange={handleChange}
          placeholder="e.g., City Park, Main Street"
          required
        />

        <label>Participant Limit (optional)</label>
        <input
          type="number"
          name="participantLimit"
          value={activity.participantLimit}
          onChange={handleChange}
          placeholder="Leave empty for unlimited"
          min="1"
        />

        <label>Status</label>
        <select
          name="status"
          value={activity.status}
          onChange={handleChange}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <button type="submit">Add Activity</button>
      </form>
    </div>
  );
}

export default AddActivity;
