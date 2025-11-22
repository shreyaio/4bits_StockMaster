// ============================================
// STOCKMASTER - Login Page
// Location: frontend/src/routes/Auth/Login.jsx
// ============================================

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    loginId: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.loginId.trim()) {
      newErrors.loginId = 'Login ID is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setAlert({ show: false, type: '', message: '' });

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        // Store token in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        setAlert({
          show: true,
          type: 'success',
          message: 'Login successful! Redirecting...'
        });

        // Redirect to dashboard after 1 second
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } else {
        setAlert({
          show: true,
          type: 'danger',
          message: data.message || 'Login failed. Please try again.'
        });
      }
    } catch (error) {
      setAlert({
        show: true,
        type: 'danger',
        message: 'Network error. Please check your connection.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Logo */}
        <div className="auth-logo">
          <div className="logo-circle">SM</div>
          <h1 className="logo-text">STOCKMASTER</h1>
        </div>

        {/* Page Title */}
        <div className="auth-header">
          <h2>Login to Your Account</h2>
          <p>Enter your credentials to access your account</p>
        </div>

        {/* Alert Message */}
        {alert.show && (
          <div className={`alert alert-${alert.type}`}>
            {alert.message}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          {/* Login ID */}
          <div className="input-group">
            <label htmlFor="loginId" className="input-label">
              Login ID
            </label>
            <input
              type="text"
              id="loginId"
              name="loginId"
              value={formData.loginId}
              onChange={handleChange}
              className={`input-field ${errors.loginId ? 'input-error' : ''}`}
              placeholder="Enter your login ID"
              autoComplete="username"
            />
            {errors.loginId && (
              <span className="error-message">{errors.loginId}</span>
            )}
          </div>

          {/* Password */}
          <div className="input-group">
            <label htmlFor="password" className="input-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`input-field ${errors.password ? 'input-error' : ''}`}
              placeholder="Enter your password"
              autoComplete="current-password"
            />
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={loading}
          >
            {loading ? (
              <span className="btn-loading">
                <span className="spinner-small"></span>
                Logging in...
              </span>
            ) : (
              'SIGN IN'
            )}
          </button>
        </form>

        {/* Footer Links */}
        <div className="auth-footer">
          <Link to="/forgot-password" className="auth-link">
            Forgot Password?
          </Link>
          <span className="auth-separator">|</span>
          <Link to="/signup" className="auth-link auth-link-primary">
            Sign Up
          </Link>
        </div>
      </div>

      {/* Legal Notice */}
      <div className="legal-notice">
        <span className="legal-badge">Legal Wallaby</span>
      </div>
    </div>
  );
};

export default Login;