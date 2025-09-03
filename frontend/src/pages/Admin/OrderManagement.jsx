import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/Admin/AdminLayout';
import OrderTable from '../../components/Admin/OrderTable';
import { adminAPI, showToast } from '../../utils/adminAPI';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getOrders();
      setOrders(response.orders || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      showToast('Error loading orders', 'error');
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter(order => 
  order.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  order.userId?.email?.toLowerCase().includes(searchTerm.toLowerCase())
);

  if (loading) {
    return (
      <AdminLayout>
        <div className="loading-screen">
          <div className="loading-spinner"></div>
          <p>Loading Orders...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="dashboard">
        <h1>Order Management</h1>

        <div className="search-filter">
          <div className="search-box">
            <input
              type="text"
              className="form-control"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="records-per-page">
            <span>Total: {filteredOrders.length} orders</span>
          </div>
        </div>

        <OrderTable orders={filteredOrders} />
      </div>
    </AdminLayout>
  );
};

export default OrderManagement;
