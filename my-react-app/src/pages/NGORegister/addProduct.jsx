import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './ngoAuth.css';

function AddProduct() {
  const [product, setProduct] = useState({ name: '', image: null, price: '', category: '', rating: '' });
  const [categories, setCategories] = useState([]);
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Your existing categories
  const existingCategories = [
    'Handmade Bags',
    'Festival seasonal products',
    'Gifting Hampers',
    'Home Decor',
    'clothing',
    'Malanand Made Bags'
  ];

  useEffect(() => {
    const cat = searchParams.get('cat');
    if (cat) setProduct(p => ({ ...p, category: cat }));

    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories');
        if (!res.ok) throw new Error('Failed');
        const data = await res.json();
        setCategories(data || []);
      } catch (err) {
        console.error(err);
        // Fallback to existing categories
        setCategories(existingCategories.map(cat => ({ name: cat })));
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setProduct({ ...product, [name]: files[0] });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // attach ngoId if available (set during NGO registration/login)
      const ngoId = localStorage.getItem('ngoId') || null;
      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('price', product.price);
      formData.append('category', product.category);
      formData.append('rating', product.rating);
      formData.append('ngoId', ngoId);
      if (product.image) {
        formData.append('image', product.image);
      }
      console.log('Sending formData:', formData);

      const res = await fetch('/api/products', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Failed to create product');
      const created = await res.json();
      setMessage('Product added successfully');
      setTimeout(() => {
        // navigate to category view for the created product
        navigate(`/marketplace/category?cat=${encodeURIComponent(created.category)}`);
      }, 800);
    } catch (err) {
      console.error(err);
      setMessage('Error adding product');
    }
  };

  const displayCategories = categories.length > 0 ? categories : existingCategories.map(cat => ({ name: cat }));

  return (
    <div className="ngo-auth-container">
      <h2>Add Product</h2>
      {message && <div className="notification">{message}</div>}
      <form className="ngo-form" onSubmit={handleSubmit}>
        <label>Name</label>
        <input name="name" value={product.name} onChange={handleChange} required />

        <label>Image</label>
        <input type="file" name="image" onChange={handleChange} accept="image/*" />

        <label>Price</label>
        <input name="price" value={product.price} onChange={handleChange} />

        <label>Category</label>
        <select name="category" value={product.category} onChange={handleChange} required>
          <option value="">Select Category</option>
          {displayCategories.map((c) => (
            <option key={c.id || c.name} value={typeof c === 'string' ? c : c.name}>
              {typeof c === 'string' ? c : c.name}
            </option>
          ))}
        </select>

        <label>Rating</label>
        <input name="rating" value={product.rating} onChange={handleChange} />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
