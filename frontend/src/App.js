import "./App.css";
import Layout from "./components/Layouts/Layout";
import { Routes, Route } from 'react-router-dom';

// Import your existing pages
import Home from './pages/Home';
import Tours from './pages/Tours';
import TourDetails from './pages/ToursDetails';
import Wishlist from './pages/Wishlist';
import Orders from './pages/Orders';
import Success from './pages/Success';
import Cancel from './pages/Cancel';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from "./pages/Cart";

// Import new Admin components
import AdminDashboard from './pages/Admin/AdminDashboard';
import PackageManagement from './pages/Admin/PackageManagement';
import UserManagement from './pages/Admin/UserManagement';
import OrderManagement from './pages/Admin/OrderManagement';

// Import CSS and icons
import 'bootstrap/dist/css/bootstrap.min.css';
import 'remixicon/fonts/remixicon.css';

function App() {
  return (
    <Routes>
      {/* Layout-wrapped user routes */}
      <Route path="/*" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="tours" element={<Tours />} />
        <Route path="tours/:id" element={<TourDetails />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="user-orders" element={<Orders />} />
        <Route path="cart" element={<Cart />} />

        <Route path="success" element={<Success />} />
        <Route path="cancel" element={<Cancel />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    
      {/* Admin routes */}
      <Route path="admin/*">
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="packages" element={<PackageManagement />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="orders" element={<OrderManagement />} />
      </Route>
    </Routes>
  );
}

export default App;
