import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./order.css";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Load orders from localStorage (later replace with API)
    const storedOrders =
      JSON.parse(localStorage.getItem("userOrders")) || [];
    setOrders(storedOrders);
  }, []);

  return (
    <div className="orders-page">
      {/* PAGE TITLE */}
      <div className="page-title">
        <h2>Your Orders</h2>
        <p>Track all products you’ve purchased</p>
      </div>

      {/* EMPTY STATE */}
      {orders.length === 0 ? (
        <div className="no-orders-box">
          <h3>No orders yet</h3>
          <p>You haven’t purchased anything. Start exploring!</p>

          <Link to="/marketplace">
            <button className="dashboard-btn">Shop Now</button>
          </Link>
        </div>
      ) : (
        /* ORDERS LIST */
        <div className="orders-container">
          {orders.map((order, index) => (
            <div className="order-card" key={index}>
              <img src={order.image} alt={order.name} />

              <div className="order-info">
                <h3>{order.name}</h3>
                <p>Price: ₹{order.price}</p>
                <p>Quantity: {order.quantity}</p>
                <p className="status">Status: {order.status}</p>
                <p className="date">Ordered on: {order.date}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
