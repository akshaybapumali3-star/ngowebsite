import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("userCart")) || [];
    setCart(storedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("userCart", JSON.stringify(cart));
  }, [cart]);

  const updateSummary = () => {
    const items = cart.reduce((acc, item) => acc + item.quantity, 0);
    const price = cart.reduce((acc, item) => {
      const priceNum = typeof item.price === 'string' 
        ? parseInt(item.price.replace('₹', '').replace(/,/g, '')) 
        : item.price;
      return acc + priceNum * item.quantity;
    }, 0);
    return { items, price };
  };

  const removeItem = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const increaseQty = (index) => {
    const newCart = [...cart];
    newCart[index].quantity++;
    setCart(newCart);
  };

  const decreaseQty = (index) => {
    const newCart = [...cart];
    if (newCart[index].quantity > 1) {
      newCart[index].quantity--;
    } else {
      newCart.splice(index, 1);
    }
    setCart(newCart);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      return alert("Your cart is empty!");
    }

    let orders = JSON.parse(localStorage.getItem("userOrders")) || [];
    cart.forEach((item) => {
      orders.push({
        ...item,
        date: new Date().toLocaleDateString(),
        status: "Pending",
      });
    });

    localStorage.setItem("userOrders", JSON.stringify(orders));
    setCart([]);
    alert("Order placed successfully!");
  };

  const { items, price } = updateSummary();

  return (
    <div className="cart-page">
      <header className="cart-header">
        <h2>Bal Vatsalya Marga Marketplace</h2>
      </header>

      <div className="page-title">
        <h2>Your Cart</h2>
        <p>Review products you’ve added before checkout</p>
      </div>

      {cart.length === 0 ? (
        <div className="no-orders-box">
          <h3>Your cart is empty</h3>
          <p>Add products to your cart and they will appear here.</p>
          <button className="dashboard-btn" onClick={() => navigate("/marketplace/categories")}>
            Shop Now
          </button>
        </div>
      ) : (
        <>
          <section className="cart-container">
            {cart.map((item, index) => (
              <div className="cart-card" key={index}>
                <img src={item.image} alt={item.name} />
                <div className="cart-info">
                  <h3>{item.name}</h3>
                  <p>Price: {item.price}</p>
                  <button className="remove-btn" onClick={() => removeItem(index)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </section>

          <div className="cart-summary">
            <p>Total Items: <span>{items}</span></p>
            <p>Total Price: ₹<span>{price.toLocaleString('en-IN')}</span></p>
            <button className="dashboard-btn" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
