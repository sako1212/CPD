import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [status, setStatus] = useState({
    message: '',
    isError: false,
    isLoading: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ message: '', isError: false, isLoading: true });

    // Simulate API call
    setTimeout(() => {
      setStatus({
        message: `Welcome, ${formData.name}! Registration successful.`,
        isError: false,
        isLoading: false
      });
      setFormData({ name: '', email: '', password: '' });
    }, 1200);
  };

  return (
    <div className="app-bg">
      <header className="app-header">
        <img 
          src="https://historycouncilnsw.org.au/wp-content/uploads/2016/07/MQ_MAS_VER_RGB_POS.png" 
          alt="Macquarie Logo" 
          className="app-logo" 
        />
        <span className="app-title">CampusHQ</span>
      </header>
      <main className="main-content">
        <div className="form-card">
          <h2 className="form-title">Create Account</h2>
          <form onSubmit={handleSubmit} className="signup-form">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Full Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email <span className="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password <span className="required">*</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                required
                minLength="8"
              />
            </div>
            <button 
              type="submit" 
              className="submit-button"
              disabled={status.isLoading}
            >
              {status.isLoading ? 'Processing...' : 'Sign Up'}
            </button>
            {status.message && (
              <div className={`status-message ${status.isError ? 'error' : 'success'}`}>
                {status.message}
              </div>
            )}
          </form>
        </div>
      </main>
    </div>
  );
};

export default App;
