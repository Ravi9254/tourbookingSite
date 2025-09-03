
// // import React, { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import Sidebar from './Sidebar';
// // import '../../styles/admin.css';

// // // const AdminPanel = ({ children }) => {
// // //   const navigate = useNavigate();
// // //   const [isAdmin, setIsAdmin] = useState(false);
// // //   const [loading, setLoading] = useState(true);

// // //   useEffect(() => {
// // //     const token = localStorage.getItem('userToken');
// // //     const role = localStorage.getItem('userRole');

// // //     if (!token) {
// // //       navigate('/login');
// // //       return;
// // //     }

// // //     if (role !== 'admin') {
// // //       setLoading(false);
// // //       return;
// // //     }

// // //     setIsAdmin(true);
// // //     setLoading(false);
// // //   }, [navigate]);

// // //   if (loading) {
// // //     return (
// // //       <div className="loading-screen">
// // //         <div className="loading-spinner"></div>
// // //         <p>Loading Admin Panel...</p>
// // //       </div>
// // //     );
// // //   }

// // //   if (!isAdmin) {
// // //     return (
// // //       <div className="access-denied">
// // //         <h3><i className="fas fa-exclamation-triangle"></i> Access Denied</h3>
// // //         <p>You need admin privileges to access this panel. Please contact your system administrator.</p>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="admin-panel">
// // //       <Sidebar />
// // //       <main className="main-content">
// // //         {children}
// // //       </main>
// // //     </div>
// // //   );
// // // };

// // // export default AdminPanel;
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "./Sidebar";
// import "../../styles/admin.css";

// const AdminPanel = ({ children }) => {
//   const navigate = useNavigate();
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem("userToken");
//     const role = localStorage.getItem("userRole"); // role must be saved after login

//     // if (!token) {
//     //   navigate("/login");
//     //   return;
//     // }

//     if (role?.toLowerCase() === "admin") {
//       setIsAdmin(true);
//     }

//     setLoading(false);
//   }, [navigate]);

//   if (loading) {
//     return (
//       <div className="loading-screen">
//         <div className="loading-spinner"></div>
//         <p>Loading Admin Panel...</p>
//       </div>
//     );
//   }

//   if (!isAdmin) {
//     return (
//       <div className="access-denied">
//         <h3><i className="fas fa-exclamation-triangle"></i> Access Denied</h3>
//         <p>You need admin privileges to access this panel.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="admin-panel">
//       <Sidebar />
//       <main className="main-content">{children}</main>
//     </div>
//   );
// };

// export default AdminPanel;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import '../../styles/admin.css';

const AdminPanel = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    const role = localStorage.getItem('userRole');

    if (!token) {
      navigate('/login');
      return;
    }

    if (role?.toLowerCase() === 'admin') {
      setIsAdmin(true);
    } else {
      // Optionally redirect non-admin users
      navigate('/');
    }
    setLoading(false);
  }, [navigate]);

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
