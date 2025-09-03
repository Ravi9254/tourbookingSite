

import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Input, Button, Alert } from 'reactstrap';
import { useNavigate, Link } from 'react-router-dom';

const STORAGE_KEYS = {
  TOKEN: 'userToken',
  ROLE: 'userRole',
  USER_ID: 'userId',
  USER_NAME: 'userName',
  USER_EMAIL: 'userEmail'
};

const storage = {
  setUserData: (userData) => {
    localStorage.setItem(STORAGE_KEYS.TOKEN, userData.token);
    localStorage.setItem(STORAGE_KEYS.ROLE, userData.role);
    localStorage.setItem(STORAGE_KEYS.USER_ID, userData.id);
    localStorage.setItem(STORAGE_KEYS.USER_NAME, userData.name);
    localStorage.setItem(STORAGE_KEYS.USER_EMAIL, userData.email);
  },
};

const showToast = (message, type = 'info') => {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
};

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5050/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      
      if (res.ok) {
        storage.setUserData(data);
        showToast('Login successful!', 'success');
        
        // ✅ Check for redirect route after login
        const redirectRoute = localStorage.getItem('redirectAfterLogin');
        localStorage.removeItem('redirectAfterLogin'); // Clean up
        
        if (redirectRoute && data.role === 'admin' && redirectRoute.startsWith('/admin')) {
          // Redirect to the intended admin route
          navigate(redirectRoute);
        } else if (data.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/tours');
        }
      } else {
        setAlert({ show: true, message: data.message || 'Login failed', type: 'danger' });
      }
    } catch {
      setAlert({ show: true, message: 'Login failed. Try again.', type: 'danger' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-section">
      <Container>
        <Row className="justify-content-center">
          <Col lg="6" md="8">
            <div className="login-container">
              <h2 className="text-center mb-4">Login</h2>
              {alert.show && <Alert color={alert.type}>{alert.message}</Alert>}
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <Button type="submit" color="primary" block disabled={loading}>
                  {loading ? 'Logging in…' : 'Login'}
                </Button>
              </Form>
              <div className="text-center mt-3">
                <p>Don't have an account? <Link to="/register">Register here</Link></p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
