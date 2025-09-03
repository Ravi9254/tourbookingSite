
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import '../../styles/admin.css';

const AdminPanel = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // ✅ Use correct localStorage keys
    const token = localStorage.getItem('userToken');    // Fixed key
    const role = localStorage.getItem('userRole');      // Fixed key

    console.log('🔐 AdminPanel check:', { token: !!token, role });

    if (!token) {
      // Store the intended route before redirecting to login
      localStorage.setItem('redirectAfterLogin', location.pathname);
      navigate('/login');
      return;
    }

    if (role?.toLowerCase() === 'admin') {
      setIsAdmin(true);
    } else {
      // Store the intended route for non-admin users too
      localStorage.setItem('redirectAfterLogin', location.pathname);
      navigate('/login');
      return;
    }
    
    setLoading(false);
  }, [navigate, location.pathname]);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading Admin Panel...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="access-denied">
        <h3><i className="fas fa-exclamation-triangle"></i> Access Denied</h3>
        <p>You need admin privileges to access this panel.</p>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <Sidebar />
      <main className="main-content">{children}</main>
    </div>
  );
};

export default AdminPanel;
