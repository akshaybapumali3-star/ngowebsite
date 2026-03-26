import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ngoAuth.css';

export default function AddCategory() {
  const [category, setCategory] = useState({ name: '', image: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setCategory({ ...category, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(category),
      });
      if (res.status === 409) {
        setMessage('Category already exists');
        return;
      }
      if (!res.ok) throw new Error('Failed to create category');
      const created = await res.json();
      setMessage('Category added');
      // go to add product page for this category
      setTimeout(() => navigate(`/ngo/add-product?cat=${encodeURIComponent(created.name)}`), 700);
    } catch (err) {
      console.error(err);
      setMessage('Error adding category');
    }
  };

  return (
    <div className="ngo-auth-container">
      <h2>Add New Products</h2>
      {message && <div className="notification">{message}</div>}
      <form className="ngo-form" onSubmit={handleSubmit}>
        <label>Category Name</label>
        <input name="name" value={category.name} onChange={handleChange} required />

        <label>Image URL (optional)</label>
        <input name="image" value={category.image} onChange={handleChange} />

        <button type="submit">Create Category</button>
      </form>
    </div>
  );
}
