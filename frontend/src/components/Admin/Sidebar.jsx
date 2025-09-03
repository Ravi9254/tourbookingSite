import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('redirectAfterLogin');
    
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2><i className="fas fa-suitcase"></i> Tour Admin</h2>
      </div>
      <nav className="sidebar-nav">
        <Link 
          to="/admin/dashboard" 
          className={`nav-item ${location.pathname === '/admin/dashboard' ? 'active' : ''}`}
        >
          <i className="fas fa-tachometer-alt"></i>
          Dashboard
        </Link>
        <Link 
          to="/admin/packages" 
          className={`nav-item ${location.pathname === '/admin/packages' ? 'active' : ''}`}
        >
          <i className="fas fa-box"></i>
          Packages
        </Link>
        <Link 
          to="/admin/users" 
          className={`nav-item ${location.pathname === '/admin/users' ? 'active' : ''}`}
        >
          <i className="fas fa-users"></i>
          Users
        </Link>
        <Link 
          to="/admin/orders" 
          className={`nav-item ${location.pathname === '/admin/orders' ? 'active' : ''}`}
        >
          <i className="fas fa-shopping-cart"></i>
          Orders
        </Link>
        <button onClick={logout} className="nav-item logout-btn">
          <i className="fas fa-sign-out-alt"></i>
          Logout
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
