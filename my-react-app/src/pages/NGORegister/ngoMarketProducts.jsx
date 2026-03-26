import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './marketActivity.css';

function NGOMarketProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('ngoToken');
    if (!token) {
      navigate('/ngo/login');
      return;
    }

    // Fetch products for this NGO
    fetchProducts();
  }, [navigate]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const ngoId = localStorage.getItem('ngoId');
      
      // Try to fetch from API, with fallback to sample data
      try {
        const res = await fetch(`/api/products?ngoId=${ngoId}`);
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        } else {
          loadSampleProducts();
        }
      } catch (err) {
        loadSampleProducts();
      }
    } finally {
      setLoading(false);
    }
  };

  const loadSampleProducts = () => {
    setProducts([
      {
        id: 1,
        name: 'Handmade Crafts',
        category: 'Handicraft',
        price: 500,
        rating: 4.5,
        orders: 12,
        image: '/public/image/bag1.avif'
      },
      {
        id: 2,
        name: 'Educational Books',
        category: 'Education',
        price: 299,
        rating: 4.2,
        orders: 8,
        image: '/public/image/bag2.avif'
      },
      {
        id: 3,
        name: 'Organic Products',
        category: 'Health',
        price: 750,
        rating: 4.8,
        orders: 25,
        image: '/public/image/bag3.avif'
      }
    ]);
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const res = await fetch(`/api/products/${productId}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' }
        });

        if (res.ok) {
          setProducts(products.filter(p => p.id !== productId));
          alert('Product deleted successfully');
        }
      } catch (err) {
        console.error('Error deleting product:', err);
        // Still remove from UI
        setProducts(products.filter(p => p.id !== productId));
      }
    }
  };

  const handleEdit = (productId) => {
    navigate(`/ngo/edit-product/${productId}`);
  };

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(p => p.category === filter);

  return (
    <div className="products-container">
      <h1>Manage Your Products</h1>

      <div className="products-header">
        <button className="btn-primary" onClick={() => navigate('/ngo/add-product')}>
          ➕ Add New Product
        </button>

        <div className="filter-section">
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Categories</option>
            <option value="Handicraft">Handicraft</option>
            <option value="Education">Education</option>
            <option value="Health">Health</option>
            <option value="Food">Food</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading products...</div>
      ) : filteredProducts.length === 0 ? (
        <div className="no-products">
          <p>No products found. Start by adding your first product!</p>
          <button className="btn-primary" onClick={() => navigate('/ngo/add-product')}>
            Add Product
          </button>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div key={product._id} className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-details">
                <h3>{product.name}</h3>
                <p className="category">{product.category}</p>
                <p className="price">₹{product.price}</p>
                <div className="product-stats">
                  <span>⭐ {product.rating || 4.0}</span>
                  <span>📦 {product.orders || 0} orders</span>
                </div>
              </div>
              <div className="product-actions">
                <button 
                  className="btn-edit"
                  onClick={() => handleEdit(product._id)}
                >
                  Edit
                </button>
                <button 
                  className="btn-delete"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NGOMarketProducts;
