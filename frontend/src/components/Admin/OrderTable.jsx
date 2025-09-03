import React from 'react';

const OrderTable = ({ orders }) => {
  console.log(orders)
  return (
    <div className="content-section">
      <div className="section-content">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Products</th>
              <th>Total Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>
                  <div>
                    {/* CHANGE: order.user.name → order.userId.name */}
                    <strong>{order.userId?.name || 'Unknown User'}</strong><br />
                    <small>{order.userId?.email || 'No email'}</small>
                  </div>
                </td>
                <td>
                  {order.products?.map((item, index) => (
                    <div key={index}>
                      {item.product?.name || 'Unknown Product'} (x{item.quantity})
                    </div>
                  ))}
                </td>
                <td>₹{order.total}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {(!orders || orders.length === 0) && (
          <div className="text-center mt-20">
            <p>No orders found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTable;
