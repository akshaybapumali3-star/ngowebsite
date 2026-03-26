import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./categoryProducts.css";

function CategoryProducts() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const category = searchParams.get("cat");

  const [products, setProducts] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [userRatings, setUserRatings] = useState({});
  const [notification, setNotification] = useState("");
  const [hoverRating, setHoverRating] = useState({});

  useEffect(() => {
    if (!category) {
      setProducts([]);
      return;
    }

    const fetchProducts = async () => {
      try {
        const res = await fetch(`/api/products?category=${encodeURIComponent(category)}`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setProducts([]);
      }
    };

    fetchProducts();
  }, [category]);

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("userCart")) || [];
    const existingItem = cart.find(item => item.id === product._id && item.category === category);
    
    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      cart.push({
        ...product,
        category,
        quantity: 1
      });
    }
    
    localStorage.setItem("userCart", JSON.stringify(cart));
    
    setNotification(`${product.name} added to cart!`);
    setTimeout(() => setNotification(""), 2000);
  };

  const handleRating = (productId, rating) => {
    setUserRatings(prev => ({
      ...prev,
      [`${category}-${productId}`]: rating
    }));
    setNotification("Thanks for rating!");
    setTimeout(() => setNotification(""), 2000);
  };

  const getRating = (productId, defaultRating) => {
    return userRatings[`${category}-${productId}`] || defaultRating;
  };

  return (
    <div className="marketpage">
      {/* NOTIFICATION */}
      {notification && <div className="notification">{notification}</div>}

      {/* PAGE TITLE */}
      <div className="page-title">
        <h2>{category}</h2>
        <p>Browse all {category} products</p>
      </div>

      {/* PRODUCTS GRID */}
      <div className="products-container">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <div 
                  className="product-rating"
                  onMouseLeave={() => setHoverRating({})}
                >
                  <div className="star-rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`star ${star <= (hoverRating[product._id] || getRating(product._id, Math.floor(product.rating))) ? "filled" : ""}`}
                        onMouseEnter={() => setHoverRating({ [product._id]: star })}
                        onClick={() => handleRating(product._id, star)}
                      >
                        ⭐
                      </span>
                    ))}
                  </div>
                  <span className="rating-value">{getRating(product._id, product.rating).toFixed(1)}</span>
                </div>
                <div className="product-actions">
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                  <button 
                    className="buy-btn"
                    onClick={() => {
                      const token = localStorage.getItem("token");
                      if (!token) {
                        // require login first
                        navigate('/login');
                        return;
                      }
                      setSelectedProduct(product);
                      setShowPayment(true);
                    }}
                  >
                    {product.price}
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products found for this category.</p>
        )}
      </div>

      {/* PAYMENT MODAL */}
      {showPayment && selectedProduct && (
        <div className="payment-modal-overlay" onClick={() => setShowPayment(false)}>
          <div className="payment-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowPayment(false)}>×</button>
            <h2>Payment Details</h2>
            <div className="payment-details">
              <div className="product-summary">
                <img src={selectedProduct.image} alt={selectedProduct.name} />
                <div>
                  <h3>{selectedProduct.name}</h3>
                  <p className="price">{selectedProduct.price}</p>
                </div>
              </div>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="Enter your full name" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="Enter your email" />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input type="tel" placeholder="Enter your phone number" />
              </div>
              <div className="form-group">
                <label>Address</label>
                <textarea placeholder="Enter your delivery address" rows="3"></textarea>
              </div>
              <div className="form-group">
                <label>Payment Method</label>
                <select>
                  <option>Select Payment Method</option>
                  <option>Credit Card</option>
                  <option>Debit Card</option>
                  <option>UPI</option>
                  <option>Net Banking</option>
                </select>
              </div>
              <button className="pay-btn">Pay {selectedProduct.price}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryProducts;
