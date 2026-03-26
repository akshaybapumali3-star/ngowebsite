import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './marketActivity.css';

function NGOMarketAnalytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('month');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('ngoToken');
    if (!token) {
      navigate('/ngo/login');
      return;
    }

    fetchAnalytics();
  }, [navigate, timeRange]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const ngoId = localStorage.getItem('ngoId');

      try {
        const res = await fetch(`/api/analytics?ngoId=${ngoId}&range=${timeRange}`);
        if (res.ok) {
          const data = await res.json();
          setAnalytics(data);
        } else {
          loadSampleAnalytics();
        }
      } catch (err) {
        loadSampleAnalytics();
      }
    } finally {
      setLoading(false);
    }
  };

  const loadSampleAnalytics = () => {
    setAnalytics({
      totalVisits: 2543,
      totalSales: 45000,
      totalOrders: 48,
      conversionRate: 3.2,
      averageOrderValue: 937.5,
      topProduct: 'Organic Products',
      topCategory: 'Health & Wellness',
      monthlyGrowth: 15,
      visitorTrend: [
        { date: 'Mar 1', visits: 120, sales: 2500 },
        { date: 'Mar 5', visits: 280, sales: 4500 },
        { date: 'Mar 10', visits: 350, sales: 6200 },
        { date: 'Mar 15', visits: 420, sales: 7800 },
        { date: 'Mar 20', visits: 520, sales: 10500 },
        { date: 'Mar 25', visits: 680, sales: 13500 }
      ],
      productPerformance: [
        {
          name: 'Organic Products',
          sold: 25,
          revenue: 18750,
          rating: 4.8
        },
        {
          name: 'Handmade Crafts',
          sold: 14,
          revenue: 7000,
          rating: 4.5
        },
        {
          name: 'Educational Books',
          sold: 9,
          revenue: 2691,
          rating: 4.2
        }
      ],
      categoryBreakdown: [
        { category: 'Health', percentage: 45, orders: 22 },
        { category: 'Handicraft', percentage: 30, orders: 14 },
        { category: 'Education', percentage: 25, orders: 12 }
      ]
    });
  };

  if (loading) {
    return <div className="loading">Loading analytics...</div>;
  }

  if (!analytics) {
    return <div className="error">Failed to load analytics</div>;
  }

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <h1>Market Analytics & Insights</h1>
        <select 
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="time-range-select"
        >
          <option value="week">Last 7 Days</option>
          <option value="month">Last 30 Days</option>
          <option value="quarter">Last 3 Months</option>
          <option value="year">Last Year</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon">👥</div>
          <h3>Total Visits</h3>
          <p className="metric-value">{analytics.totalVisits.toLocaleString()}</p>
          <p className="metric-change">+{analytics.monthlyGrowth}% this month</p>
        </div>

        <div className="metric-card">
          <div className="metric-icon">💰</div>
          <h3>Total Sales</h3>
          <p className="metric-value">₹{analytics.totalSales.toLocaleString()}</p>
          <p className="metric-change">Revenue from all orders</p>
        </div>

        <div className="metric-card">
          <div className="metric-icon">📦</div>
          <h3>Total Orders</h3>
          <p className="metric-value">{analytics.totalOrders}</p>
          <p className="metric-change">Conversion: {analytics.conversionRate}%</p>
        </div>

        <div className="metric-card">
          <div className="metric-icon">📈</div>
          <h3>Avg Order Value</h3>
          <p className="metric-value">₹{analytics.averageOrderValue}</p>
          <p className="metric-change">Per transaction</p>
        </div>
      </div>

      {/* Product Performance */}
      <section className="analytics-section">
        <h2>Product Performance</h2>
        <div className="performance-grid">
          {analytics.productPerformance.map((product, idx) => (
            <div key={idx} className="performance-card">
              <h3>{product.name}</h3>
              <div className="performance-stat">
                <span>Sold:</span>
                <strong>{product.sold} units</strong>
              </div>
              <div className="performance-stat">
                <span>Revenue:</span>
                <strong>₹{product.revenue.toLocaleString()}</strong>
              </div>
              <div className="performance-stat">
                <span>Rating:</span>
                <strong>⭐ {product.rating}</strong>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Category Breakdown */}
      <section className="analytics-section">
        <h2>Sales by Category</h2>
        <div className="category-breakdown">
          {analytics.categoryBreakdown.map((cat, idx) => (
            <div key={idx} className="category-bar">
              <div className="category-label">
                <span>{cat.category}</span>
                <span className="category-percentage">{cat.percentage}%</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${cat.percentage}%` }}
                />
              </div>
              <p className="category-orders">{cat.orders} orders</p>
            </div>
          ))}
        </div>
      </section>

      {/* Top Insights */}
      <section className="analytics-section insights-section">
        <h2>Key Insights</h2>
        <div className="insights-grid">
          <div className="insight-card">
            <h3>🏆 Top Product</h3>
            <p>{analytics.topProduct}</p>
          </div>
          <div className="insight-card">
            <h3>📊 Top Category</h3>
            <p>{analytics.topCategory}</p>
          </div>
          <div className="insight-card">
            <h3>🎯 Growth Rate</h3>
            <p>+{analytics.monthlyGrowth}% MoM</p>
          </div>
          <div className="insight-card">
            <h3>💡 Recommendation</h3>
            <p>Focus on {analytics.topCategory} to maximize revenue</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default NGOMarketAnalytics;
