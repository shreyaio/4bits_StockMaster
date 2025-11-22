// ============================================
// STOCKMASTER - Forgot Password Page
// Location: frontend/src/routes/Auth/ForgotPassword.jsx
// ============================================

import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });
  const [emailSent, setEmailSent] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors({});
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
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
      const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok) {
        setEmailSent(true);
        setAlert({
          show: true,
          type: 'success',
          message: 'Password reset email sent! Please check your inbox.'
        });
      } else {
        setAlert({
          show: true,
          type: 'danger',
          message: data.message || 'Failed to send reset email. Please try again.'
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
          <h2>Forgot Your Password?</h2>
          <p>
            {emailSent 
              ? 'Check your email for the reset link' 
              : 'Enter your email address and we\'ll send you a reset link'}
          </p>
        </div>

        {/* Alert Message */}
        {alert.show && (
          <div className={`alert alert-${alert.type}`}>
            {alert.message}
          </div>
        )}

        {!emailSent ? (
          <>
            {/* Forgot Password Form */}
            <form onSubmit={handleSubmit} className="auth-form">
              {/* Email */}
              <div className="input-group">
                <label htmlFor="email" className="input-label">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  className={`input-field ${errors.email ? 'input-error' : ''}`}
                  placeholder="Enter your registered email"
                  autoComplete="email"
                />
                {errors.email && (
                  <span className="error-message">{errors.email}</span>
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
                    Sending...
                  </span>
                ) : (
                  'SEND RESET LINK'
                )}
              </button>
            </form>
          </>
        ) : (
          <div className="success-container">
            <div className="success-icon">✓</div>
            <p className="success-text">
              A password reset link has been sent to <strong>{email}</strong>
            </p>
            <p className="info-text">
              The link will expire in 10 minutes. If you don't see the email, check your spam folder.
            </p>
            <button
              onClick={() => {
                setEmailSent(false);
                setEmail('');
                setAlert({ show: false, type: '', message: '' });
              }}
              className="btn btn-secondary btn-block"
              style={{ marginTop: '20px' }}
            >
              SEND ANOTHER EMAIL
            </button>
          </div>
        )}

        {/* Footer Links */}
        <div className="auth-footer">
          <Link to="/login" className="auth-link">
            ← Back to Login
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

export default ForgotPassword;