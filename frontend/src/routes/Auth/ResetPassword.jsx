// ============================================
// STOCKMASTER - Reset Password Page
// Location: frontend/src/routes/Auth/ResetPassword.jsx
// ============================================

import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import './Auth.css';

const ResetPassword = () => {
  const navigate = useNavigate();
  const { resetToken } = useParams();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
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

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6 || formData.password.length > 12) {
      newErrors.password = 'Password must be between 6-12 characters';
    } else {
      const passwordErrors = [];
      
      if (!/[A-Z]/.test(formData.password)) {
        passwordErrors.push('one uppercase letter');
      }
      if (!/[a-z]/.test(formData.password)) {
        passwordErrors.push('one lowercase letter');
      }
      if (!/[0-9]/.test(formData.password)) {
        passwordErrors.push('one number');
      }
      if (!/[!@#$%^&*]/.test(formData.password)) {
        passwordErrors.push('one special character (!@#$%^&*)');
      }
      
      if (passwordErrors.length > 0) {
        newErrors.password = `Password must contain: ${passwordErrors.join(', ')}`;
      }
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
      const response = await fetch(`http://localhost:5000/api/auth/reset-password/${resetToken}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          password: formData.password,
          confirmPassword: formData.confirmPassword
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Store token in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        setAlert({
          show: true,
          type: 'success',
          message: 'Password reset successful! Redirecting to dashboard...'
        });

        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        setAlert({
          show: true,
          type: 'danger',
          message: data.message || 'Password reset failed. The link may have expired.'
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
          <h2>Reset Your Password</h2>
          <p>Enter your new password below</p>
        </div>

        {/* Alert Message */}
        {alert.show && (
          <div className={`alert alert-${alert.type}`}>
            {alert.message}
          </div>
        )}

        {/* Reset Password Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          {/* New Password */}
          <div className="input-group">
            <label htmlFor="password" className="input-label">
              New Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`input-field ${errors.password ? 'input-error' : ''}`}
              placeholder="Enter your new password"
              autoComplete="new-password"
            />
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>

          {/* Confirm New Password */}
          <div className="input-group">
            <label htmlFor="confirmPassword" className="input-label">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`input-field ${errors.confirmPassword ? 'input-error' : ''}`}
              placeholder="Re-enter your new password"
              autoComplete="new-password"
            />
            {errors.confirmPassword && (
              <span className="error-message">{errors.confirmPassword}</span>
            )}
          </div>

          {/* Password Requirements */}
          <div className="password-requirements">
            <p className="requirements-title">Password must contain:</p>
            <ul className="requirements-list">
              <li className={formData.password.length >= 6 && formData.password.length <= 12 ? 'valid' : ''}>
                6-12 characters
              </li>
              <li className={/[A-Z]/.test(formData.password) ? 'valid' : ''}>
                One uppercase letter
              </li>
              <li className={/[a-z]/.test(formData.password) ? 'valid' : ''}>
                One lowercase letter
              </li>
              <li className={/[0-9]/.test(formData.password) ? 'valid' : ''}>
                One number
              </li>
              <li className={/[!@#$%^&*]/.test(formData.password) ? 'valid' : ''}>
                One special character (!@#$%^&*)
              </li>
            </ul>
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
                Resetting Password...
              </span>
            ) : (
              'RESET PASSWORD'
            )}
          </button>
        </form>

        {/* Footer Links */}
        <div className="auth-footer">
          <Link to="/login" className="auth-link">
            ← Back to Login
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

export default ResetPassword;