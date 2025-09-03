// // import React, { useState, useEffect } from 'react';
// // import AdminLayout from '../../components/Admin/AdminLayout';
// // import { adminAPI, showToast } from '../../utils/adminAPI';
// // import "../../styles/admin.css"
// // const AdminDashboard = () => {
// //   const [stats, setStats] = useState({
// //     totalPackages: 0,
// //     totalUsers: 0,
// //     totalOrders: 0
// //   });
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     fetchStats();
// //   }, []);

// //   const fetchStats = async () => {
// //     try {
// //       setLoading(true);
      
// //       const [packagesRes, usersRes, ordersRes] = await Promise.all([
// //         adminAPI.getProducts(),
// //         adminAPI.getUsers(),
// //         adminAPI.getOrders()
// //       ]);

// //       setStats({
// //         totalPackages: packagesRes.products?.length || 0,
// //         totalUsers: usersRes.users?.length || 0,
// //         totalOrders: ordersRes.orders?.length || 0
// //       });
// //     } catch (error) {
// //       console.error('Error fetching stats:', error);
// //       showToast('Error loading dashboard data', 'error');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <AdminLayout>
// //         <div className="loading-screen">
// //           <div className="loading-spinner"></div>
// //           <p>Loading Dashboard...</p>
// //         </div>
// //       </AdminLayout>
// //     );
// //   }

// //   return (
// //     <AdminLayout>
// //       <div className="dashboard">
// //         <h1>Dashboard Overview</h1>
        
// //         <div className="stats-grid">
// //           <div className="stat-card">
// //             <h3>{stats.totalPackages}</h3>
// //             <p><i className="fas fa-box"></i> Total Packages</p>
// //           </div>
// //           <div className="stat-card">
// //             <h3>{stats.totalUsers}</h3>
// //             <p><i className="fas fa-users"></i> Total Users</p>
// //           </div>
// //           <div className="stat-card">
// //             <h3>{stats.totalOrders}</h3>
// //             <p><i className="fas fa-shopping-cart"></i> Total Orders</p>
// //           </div>
// //         </div>

// //         <div className="content-section">
// //           <div className="section-header">
// //             <h2>Quick Actions</h2>
// //           </div>
// //           <div className="section-content">
// //             <div style={{display: 'flex', gap: '15px', flexWrap: 'wrap'}}>
// //               <a href="/admin/packages" className="btn btn-primary">
// //                 <i className="fas fa-plus"></i> Add New Package
// //               </a>
// //               <a href="/admin/users" className="btn btn-success">
// //                 <i className="fas fa-users"></i> View All Users
// //               </a>
// //               <a href="/admin/orders" className="btn btn-warning">
// //                 <i className="fas fa-list"></i> View All Orders
// //               </a>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </AdminLayout>
// //   );
// // };

// // export default AdminDashboard;

// import React, { useEffect, useState } from 'react';
// // import { adminAPI } from '../../utils';
// // import { adminAPI } from '../../services/adminAPI';
// import { adminAPI } from '../../utils/adminAPI';

// const AdminDashboard = () => {
//   const [orders, setOrders] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const ordersData = await adminAPI.getOrders();
//         setOrders(ordersData);
//       } catch (err) {
//         setError(err.message || 'Failed to fetch orders.');
//       }
//     };
//     fetchStats();
//   }, []);

//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       <h1>Admin Dashboard</h1>
//       <ul>
//         {orders.map((order) => (
//           <li key={order._id}>{order.title || order._id}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default AdminDashboard;
import React, { useState, useEffect } from 'react';
import AdminPanel from '../../components/Admin/AdminPanel';
import { adminAPI, showToast } from '../../utils/adminAPI';
import "../../styles/admin.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalPackages: 0,
    totalUsers: 0,
    totalOrders: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      console.log('📊 AdminDashboard: Fetching stats...');
      setLoading(true);
      setError(null);

      const [packagesRes, usersRes, ordersRes] = await Promise.all([
        adminAPI.getProducts().catch(err => ({ products: [], error: err.message })),
        adminAPI.getUsers().catch(err => ({ users: [], error: err.message })),
        adminAPI.getOrders().catch(err => ({ orders: [], error: err.message }))
      ]);

      console.log('📊 API Responses:', { packagesRes, usersRes, ordersRes });

      setStats({
        totalPackages: packagesRes.products?.length || 0,
        totalUsers: usersRes.users?.length || 0,
        totalOrders: ordersRes.orders?.length || 0
      });

      // Check for any API errors
      const errors = [
        packagesRes.error && `Products: ${packagesRes.error}`,
        usersRes.error && `Users: ${usersRes.error}`, 
        ordersRes.error && `Orders: ${ordersRes.error}`
      ].filter(Boolean);

      if (errors.length > 0) {
        setError(`API Errors: ${errors.join(', ')}`);
        showToast(`Some data failed to load: ${errors.join(', ')}`, 'warning');
      }

    } catch (error) {
      console.error('❌ AdminDashboard: Error fetching stats:', error);
      setError(error.message);
      showToast('Error loading dashboard data', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminPanel>
        <div className="loading-screen">
          <div className="loading-spinner"></div>
          <p>Loading Dashboard...</p>
        </div>
      </AdminPanel>
    );
  }

  return (
    <AdminPanel>
      <div className="dashboard">
        <h1>Dashboard Overview</h1>

        {error && (
          <div style={{
            background: '#f8d7da',
            color: '#721c24', 
            padding: '12px',
            borderRadius: '4px',
            marginBottom: '20px',
            border: '1px solid #f5c6cb'
          }}>
            <strong>⚠️ Error:</strong> {error}
          </div>
        )}

        <div className="stats-grid">
          <div className="stat-card">
            <h3>{stats.totalPackages}</h3>
            <p><i className="fas fa-box"></i> Total Packages</p>
          </div>
          <div className="stat-card">
            <h3>{stats.totalUsers}</h3>
            <p><i className="fas fa-users"></i> Total Users</p>
          </div>
          <div className="stat-card">
            <h3>{stats.totalOrders}</h3>
            <p><i className="fas fa-shopping-cart"></i> Total Orders</p>
          </div>
        </div>

        <div className="content-section">
          <div className="section-header">
            <h2>Quick Actions</h2>
          </div>
          <div className="section-content">
            <div style={{display: 'flex', gap: '15px', flexWrap: 'wrap'}}>
              <a href="/admin/packages" className="btn btn-primary">
                <i className="fas fa-plus"></i> Add New Package
              </a>
              <a href="/admin/users" className="btn btn-success">
                <i className="fas fa-users"></i> View All Users
              </a>
              <a href="/admin/orders" className="btn btn-warning">
                <i className="fas fa-list"></i> View All Orders
              </a>
            </div>
          </div>
        </div>

       
      </div>
    </AdminPanel>
  );
};

export default AdminDashboard;
