import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './marketActivity.css';

function NGOMarketOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('ngoToken');
    if (!token) {
      navigate('/ngo/login');
      return;
    }

    fetchOrders();
  }, [navigate]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const ngoId = localStorage.getItem('ngoId');

      try {
        const res = await fetch(`/api/orders?ngoId=${ngoId}`);
        if (res.ok) {
          const data = await res.json();
          setOrders(data);
        } else {
          loadSampleOrders();
        }
      } catch (err) {
        loadSampleOrders();
      }
    } finally {
      setLoading(false);
    }
  };

  const loadSampleOrders = () => {
    setOrders([
      {
        id: 'ORD-001',
        productName: 'Handmade Crafts',
        customerName: 'Rajesh Kumar',
        amount: 500,
        quantity: 1,
        status: 'completed',
        date: '2026-03-05',
        paymentMethod: 'Credit Card'
      },
      {
        id: 'ORD-002',
        productName: 'Educational Books',
        customerName: 'Priya Sharma',
        amount: 1497,
        quantity: 5,
        status: 'pending',
        date: '2026-03-06',
        paymentMethod: 'UPI'
      },
      {
        id: 'ORD-003',
        productName: 'Organic Products',
        customerName: 'Amit Patel',
        amount: 2250,
        quantity: 3,
        status: 'shipped',
        date: '2026-03-04',
        paymentMethod: 'Debit Card'
      },
      {
        id: 'ORD-004',
        productName: 'Handmade Crafts',
        customerName: 'Sneha Desai',
        amount: 1000,
        quantity: 2,
        status: 'completed',
        date: '2026-03-03',
        paymentMethod: 'UPI'
      },
      {
        id: 'ORD-005',
        productName: 'Educational Books',
        customerName: 'Vikram Singh',
        amount: 598,
        quantity: 2,
        status: 'completed',
        date: '2026-03-02',
        paymentMethod: 'Credit Card'
      }
    ]);
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (res.ok) {
        setOrders(orders.map(order =>
          order.id === orderId ? { ...order, status: newStatus } : order
        ));
      }
    } catch (err) {
      console.error('Error updating order:', err);
    }
  };

  const getStatusBadgeClass = (status) => {
    return `status-${status}`;
  };

  const filteredOrders = statusFilter === 'all'
    ? orders
    : orders.filter(order => order.status === statusFilter);

  const totalRevenue = filteredOrders.reduce((sum, order) => sum + order.amount, 0);
  const totalOrders = filteredOrders.length;

  return (
    <div className="orders-container">
      <h1>Orders & Contributions</h1>

      <div className="orders-stats">
        <div className="stat-card">
          <h3>Total Orders</h3>
          <p className="stat-value">{totalOrders}</p>
        </div>
        <div className="stat-card">
          <h3>Total Revenue</h3>
          <p className="stat-value">₹{totalRevenue.toLocaleString()}</p>
        </div>
        <div className="stat-card">
          <h3>Avg Order Value</h3>
          <p className="stat-value">₹{totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0}</p>
        </div>
      </div>

      <div className="orders-filter">
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Orders</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="shipped">Shipped</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {loading ? (
        <div className="loading">Loading orders...</div>
      ) : filteredOrders.length === 0 ? (
        <div className="no-orders">
          <p>No orders found.</p>
        </div>
      ) : (
        <div className="orders-table">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Product</th>
                <th>Customer</th>
                <th>Quantity</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="order-id">{order.id}</td>
                  <td>{order.productName}</td>
                  <td>{order.customerName}</td>
                  <td>{order.quantity}</td>
                  <td>₹{order.amount}</td>
                  <td>{order.date}</td>
                  <td>{order.paymentMethod}</td>
                  <td>
                    <span className={`status-badge ${getStatusBadgeClass(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                      className="status-select"
                    >
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="shipped">Shipped</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default NGOMarketOrders;
