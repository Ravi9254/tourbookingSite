// // const API_BASE = 'http://localhost:5050';

// // // Get auth headers
// // const getAuthHeaders = () => {
// //   const token = localStorage.getItem('userToken');
// //   return {
// //     'Content-Type': 'application/json',
// //     'token': token
// //   };
// // };

// // // API calls
// // export const adminAPI = {
// //   // Products
// //   getProducts: async () => {
// //     const response = await fetch(`${API_BASE}/product/products`);
// //     return await response.json();
// //   },

// //   addProduct: async (productData) => {
// //     const response = await fetch(`${API_BASE}/product/add-product`, {
// //       method: 'POST',
// //       headers: getAuthHeaders(),
// //       body: JSON.stringify(productData)
// //     });
// //     return await response.json();
// //   },

// //   updateProduct: async (id, productData) => {
// //     const response = await fetch(`${API_BASE}/product/edit/${id}`, {
// //       method: 'PUT',
// //       headers: getAuthHeaders(),
// //       body: JSON.stringify(productData)
// //     });
// //     return await response.json();
// //   },

// //   deleteProduct: async (id) => {
// //     const response = await fetch(`${API_BASE}/product/delete/${id}`, {
// //       method: 'DELETE',
// //       headers: getAuthHeaders()
// //     });
// //     return await response.json();
// //   },

// //   getSingleProduct: async (id) => {
// //     const response = await fetch(`${API_BASE}/product/product/${id}`, {
// //       headers: getAuthHeaders()
// //     });
// //     return await response.json();
// //   },

// //   // Users
// //   getUsers: async () => {
// //     const response = await fetch(`${API_BASE}/users`, {
// //       headers: getAuthHeaders()
// //     });
// //     return await response.json();
// //   },

// //   // Orders
// //   getOrders: async () => {
// //     const response = await fetch(`${API_BASE}/orders`, {
// //       headers: getAuthHeaders()
// //     });
// //     return await response.json();
// //   }
// // };

// // // Toast notifications
// // export const showToast = (message, type = 'info') => {
// //   const toast = document.createElement('div');
// //   toast.className = `toast ${type}`;
// //   toast.textContent = message;
// //   document.body.appendChild(toast);

// //   setTimeout(() => {
// //     toast.remove();
// //   }, 3000);
// // };
// // const API_BASE = 'http://localhost:5050';

// // const STORAGE_KEYS = {
// //   TOKEN: 'userToken',
// // };

// // const getAuthHeaders = () => {
// //   const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
// //   return {
// //     'Content-Type': 'application/json',
// //     Authorization: `Bearer ${token}`,
// //   };
// // };

// // export const adminAPI = {
// //   getOrders: async () => {
// //     const res = await fetch(`${API_BASE}/orders`, { headers: getAuthHeaders() });
// //     if (!res.ok) throw new Error('Auth failed');
// //     return res.json();
// //   },
// //   getUsers: async () => {
// //     const res = await fetch(`${API_BASE}/users`, { headers: getAuthHeaders() });
// //     if (!res.ok) throw new Error('Auth failed');
// //     return res.json();
// //   },
// //   getProducts: async () => {
// //     const res = await fetch(`${API_BASE}/product/products`);
// //     if (!res.ok) throw new Error('Failed to fetch products');
// //     return res.json();
// //   },

// const API_BASE = 'http://localhost:5050';

// const STORAGE_KEYS = {
//   TOKEN: 'userToken',
// };

// const getAuthHeaders = () => {
//   const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
//   return {
//     'Content-Type': 'application/json',
//     Authorization: `Bearer ${token}`,
//   };
// };

// export const adminAPI = {
//   getOrders: async () => {
//     const res = await fetch(`${API_BASE}/orders`, { headers: getAuthHeaders() });
//     if (!res.ok) throw new Error('Auth failed');
//     return res.json();
//   },
//   getUsers: async () => {
//     const res = await fetch(`${API_BASE}/users`, { headers: getAuthHeaders() });
//     if (!res.ok) throw new Error('Auth failed');
//     return res.json();
//   },
//   getProducts: async () => {
//     const res = await fetch(`${API_BASE}/product/products`);
//     if (!res.ok) throw new Error('Failed to fetch products');
//     return res.json();
//   },

//   addProduct: async (productData) => {
//     const response = await fetch(`${API_BASE}/product/add-product`, {
//       method: 'POST',
//       headers: getAuthHeaders(),
//       body: JSON.stringify(productData)
//     });

//     if (response.status === 401 || response.status === 403) {
//       console.error('🚫 Admin authentication failed');
//       throw new Error('Authentication failed');
//     }

//     return await response.json();
//   },

//   updateProduct: async (id, productData) => {
//     const response = await fetch(`${API_BASE}/product/edit/${id}`, {
//       method: 'PUT',
//       headers: getAuthHeaders(),
//       body: JSON.stringify(productData)
//     });

//     if (response.status === 401 || response.status === 403) {
//       throw new Error('Authentication failed');
//     }

//     return await response.json();
//   },

//   deleteProduct: async (id) => {
//     const response = await fetch(`${API_BASE}/product/delete/${id}`, {
//       method: 'DELETE',
//       headers: getAuthHeaders()
//     });

//     if (response.status === 401 || response.status === 403) {
//       throw new Error('Authentication failed');
//     }

//     return await response.json();
//   },

//   getSingleProduct: async (id) => {
//     const response = await fetch(`${API_BASE}/product/product/${id}`, {
//       headers: getAuthHeaders()
//     });

//     if (response.status === 401 || response.status === 403) {
//       throw new Error('Authentication failed');
//     }

//     return await response.json();
//   },

//   // Users
//   getUsers: async () => {
//     console.log('🔍 Calling /users endpoint...');
//     const response = await fetch(`${API_BASE}/users`, {
//       headers: getAuthHeaders()
//     });

//     console.log('📊 Users API response status:', response.status);

//     if (response.status === 401) {
//       throw new Error('Token invalid or missing');
//     }

//     if (response.status === 403) {
//       throw new Error('Admin role required');
//     }

//     return await response.json();
//   },

//   // Orders
//   getOrders: async () => {
//     console.log('🔍 Calling /orders endpoint...');
//     const response = await fetch(`${API_BASE}/orders`, {
//       headers: getAuthHeaders()
//     });

//     console.log('📊 Orders API response status:', response.status);

//     if (response.status === 401) {
//       throw new Error('Token invalid or missing');
//     }

//     if (response.status === 403) {
//       throw new Error('Admin role required');
//     }

//     return await response.json();
//   }
// };

// // Toast notifications
// export const showToast = (message, type = 'info') => {
//   const toast = document.createElement('div');
//   toast.className = `toast ${type}`;
//   toast.textContent = message;
//   document.body.appendChild(toast);

//   setTimeout(() => {
//     toast.remove();
//   }, 3000);
// };

// // Storage utilities
// export const storage = {
//   setUserData: (userData) => {
//     localStorage.setItem(STORAGE_KEYS.TOKEN, userData.token);
//     localStorage.setItem(STORAGE_KEYS.ROLE, userData.role);
//     localStorage.setItem(STORAGE_KEYS.USER_ID, userData.id);
//     localStorage.setItem(STORAGE_KEYS.USER_NAME, userData.name);
//     localStorage.setItem(STORAGE_KEYS.USER_EMAIL, userData.email);
//   },

//   getUserRole: () => localStorage.getItem(STORAGE_KEYS.ROLE),
//   getToken: () => localStorage.getItem(STORAGE_KEYS.TOKEN),

//   clearAll: () => {
//     Object.values(STORAGE_KEYS).forEach(key => {
//       localStorage.removeItem(key);
//     });
//   }
// };

// const API_BASE = 'http://localhost:5050';

// // Storage keys - centralized to avoid mismatches
// const STORAGE_KEYS = {
//   TOKEN: 'userToken',
//   ROLE: 'userRole',
//   USER_ID: 'userId',
//   USER_NAME: 'userName', 
//   USER_EMAIL: 'userEmail'
// };

// // Get auth headers with debugging
// const getAuthHeaders = () => {
//   const token = localStorage.getItem('userToken');
//   return {
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${token}` // ✅ always send Bearer
//   };
// };


// // Enhanced API calls with error handling
// export const adminAPI = {
//   // Products
//   getProducts: async () => {
//     const response = await fetch(`${API_BASE}/product/products`);
//     return await response.json();
//   },

//   addProduct: async (productData) => {
//     const response = await fetch(`${API_BASE}/product/add-product`, {
//       method: 'POST',
//       headers: getAuthHeaders(),
//       body: JSON.stringify(productData)
//     });

//     if (response.status === 401 || response.status === 403) {
//       console.error('🚫 Admin authentication failed');
//       throw new Error('Authentication failed');
//     }

//     return await response.json();
//   },

//   updateProduct: async (id, productData) => {
//     const response = await fetch(`${API_BASE}/product/edit/${id}`, {
//       method: 'PUT',
//       headers: getAuthHeaders(),
//       body: JSON.stringify(productData)
//     });

//     if (response.status === 401 || response.status === 403) {
//       throw new Error('Authentication failed');
//     }

//     return await response.json();
//   },

//   deleteProduct: async (id) => {
//     const response = await fetch(`${API_BASE}/product/delete/${id}`, {
//       method: 'DELETE',
//       headers: getAuthHeaders()
//     });

//     if (response.status === 401 || response.status === 403) {
//       throw new Error('Authentication failed');
//     }

//     return await response.json();
//   },

//   getSingleProduct: async (id) => {
//     const response = await fetch(`${API_BASE}/product/product/${id}`, {
//       headers: getAuthHeaders()
//     });

//     if (response.status === 401 || response.status === 403) {
//       throw new Error('Authentication failed');
//     }

//     return await response.json();
//   },

//   // Users
//   getUsers: async () => {
//     console.log('🔍 Calling /users endpoint...');
//     const response = await fetch(`${API_BASE}/users`, {
//       headers: getAuthHeaders()
//     });

//     console.log('📊 Users API response status:', response.status);

//     if (response.status === 401) {
//       throw new Error('Token invalid or missing');
//     }

//     if (response.status === 403) {
//       throw new Error('Admin role required');
//     }

//     return await response.json();
//   },

//   // Orders
//   getOrders: async () => {
//     console.log('🔍 Calling /orders endpoint...');
//     const response = await fetch(`${API_BASE}/orders`, {
//       headers: getAuthHeaders()
//     });

//     console.log('📊 Orders API response status:', response.status);

//     if (response.status === 401) {
//       throw new Error('Token invalid or missing');
//     }

//     if (response.status === 403) {
//       throw new Error('Admin role required');
//     }

//     return await response.json();
//   }
// };

// // Toast notifications
// export const showToast = (message, type = 'info') => {
//   const toast = document.createElement('div');
//   toast.className = `toast ${type}`;
//   toast.textContent = message;
//   document.body.appendChild(toast);

//   setTimeout(() => {
//     toast.remove();
//   }, 3000);
// };

// // Storage utilities
// export const storage = {
//   setUserData: (userData) => {
//     localStorage.setItem(STORAGE_KEYS.TOKEN, userData.token);
//     localStorage.setItem(STORAGE_KEYS.ROLE, userData.role);
//     localStorage.setItem(STORAGE_KEYS.USER_ID, userData.id);
//     localStorage.setItem(STORAGE_KEYS.USER_NAME, userData.name);
//     localStorage.setItem(STORAGE_KEYS.USER_EMAIL, userData.email);
//   },

//   getUserRole: () => localStorage.getItem(STORAGE_KEYS.ROLE),
//   getToken: () => localStorage.getItem(STORAGE_KEYS.TOKEN),

//   clearAll: () => {
//     Object.values(STORAGE_KEYS).forEach(key => {
//       localStorage.removeItem(key);
//     });
//   }
// };


const API_BASE = 'http://localhost:5050';

// ✅ Consistent storage keys
const STORAGE_KEYS = {
  TOKEN: 'userToken',
  ROLE: 'userRole',
  USER_ID: 'userId',
  USER_NAME: 'userName', 
  USER_EMAIL: 'userEmail'
};

// Get auth headers with debugging
const getAuthHeaders = () => {
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN); // ✅ Use correct key
  console.log('🔐 Token from localStorage:', !!token);
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

// Enhanced API calls with error handling
export const adminAPI = {
  // Products
  getProducts: async () => {
    const response = await fetch(`${API_BASE}/product/products`);
    return await response.json();
  },

  addProduct: async (productData) => {
    const response = await fetch(`${API_BASE}/product/add-product`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(productData)
    });

    if (response.status === 401 || response.status === 403) {
      console.error('🚫 Admin authentication failed');
      // Clear invalid token and redirect
      storage.clearAll();
      window.location.href = '/login';
      throw new Error('Authentication failed');
    }

    return await response.json();
  },

  updateProduct: async (id, productData) => {
    const response = await fetch(`${API_BASE}/product/edit/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(productData)
    });

    if (response.status === 401 || response.status === 403) {
      storage.clearAll();
      window.location.href = '/login';
      throw new Error('Authentication failed');
    }

    return await response.json();
  },

  deleteProduct: async (id) => {
    const response = await fetch(`${API_BASE}/product/delete/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });

    if (response.status === 401 || response.status === 403) {
      storage.clearAll();
      window.location.href = '/login';
      throw new Error('Authentication failed');
    }

    return await response.json();
  },

  getSingleProduct: async (id) => {
    const response = await fetch(`${API_BASE}/product/product/${id}`, {
      headers: getAuthHeaders()
    });

    if (response.status === 401 || response.status === 403) {
      storage.clearAll();
      window.location.href = '/login';
      throw new Error('Authentication failed');
    }

    return await response.json();
  },

  // Users
  getUsers: async () => {
    console.log('🔍 Calling /users endpoint...');
    const response = await fetch(`${API_BASE}/users`, {
      headers: getAuthHeaders()
    });

    console.log('📊 Users API response status:', response.status);

    if (response.status === 401) {
      storage.clearAll();
      window.location.href = '/login';
      throw new Error('Token invalid or missing');
    }

    if (response.status === 403) {
      storage.clearAll();
      window.location.href = '/login';
      throw new Error('Admin role required');
    }

    return await response.json();
  },

  // Orders
  getOrders: async () => {
    
    const response = await fetch(`${API_BASE}/orders`, {
      headers: getAuthHeaders()
    });

 

    if (response.status === 401) {
      storage.clearAll();
      window.location.href = '/login';
      throw new Error('Token invalid or missing');
    }

    if (response.status === 403) {
      storage.clearAll();
      window.location.href = '/login';
      throw new Error('Admin role required');
    }

    return await response.json();
  }
};

// Toast notifications
export const showToast = (message, type = 'info') => {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
};

// Storage utilities
export const storage = {
  setUserData: (userData) => {
    localStorage.setItem(STORAGE_KEYS.TOKEN, userData.token);
    localStorage.setItem(STORAGE_KEYS.ROLE, userData.role);
    localStorage.setItem(STORAGE_KEYS.USER_ID, userData.id);
    localStorage.setItem(STORAGE_KEYS.USER_NAME, userData.name);
    localStorage.setItem(STORAGE_KEYS.USER_EMAIL, userData.email);
  },

  getUserRole: () => localStorage.getItem(STORAGE_KEYS.ROLE),
  getToken: () => localStorage.getItem(STORAGE_KEYS.TOKEN),

  clearAll: () => {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    localStorage.removeItem('redirectAfterLogin');
  }
};
