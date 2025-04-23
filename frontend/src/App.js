import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // If you want to keep the default styles or your own CSS

function App() {
  // State variables for the sign-up form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Messages for feedback
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      // POST request to your backend
      const response = await axios.post('http://localhost:5000/api/users', {
        name,
        email,
        password,
      });
      setMessage(`User created successfully: ${response.data.name}`);

      // Clear form fields
      setName('');
      setEmail('');
      setPassword('');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to create user');
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <img
        src="https://historycouncilnsw.org.au/wp-content/uploads/2016/07/MQ_MAS_VER_RGB_POS.png"
        alt="Macquarie Logo"
        style={styles.logo}
        />
        <h1 style={styles.title}>CampusHQ</h1>
      </header>

      <div style={styles.formContainer}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Name</label>
          <input
            type="text"
            style={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter your name"
          />

          <label style={styles.label}>Email</label>
          <input
            type="email"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />

          <label style={styles.label}>Password</label>
          <input
            type="password"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />

          <button style={styles.button} type="submit">
            Sign Up
          </button>
        </form>

        {message && <p style={styles.success}>{message}</p>}
        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
}

export default App;

// Inline styling
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#fafafa',
    minHeight: '100vh',
  },
  header: {
    backgroundColor: '#7E2D36', // Macquarie burgundy-like
    padding: '1rem',
    textAlign: 'center',
    display :'flex',
  },
  title: {
    margin: 0,
    color: '#fff',
  },
  logo: {
    maxHeight:150,
    marginRight: '1rem',
  },
  formContainer: {
    maxWidth: '400px',
    margin: '2rem auto',
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '6px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '0.5rem',
    fontWeight: '600',
    color: '#333',
  },
  input: {
    padding: '0.5rem',
    marginBottom: '1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    backgroundColor: '#7E2D36',
    color: '#fff',
    padding: '0.75rem',
    fontSize: '1rem',
    fontWeight: '600',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  success: {
    marginTop: '1rem',
    color: 'green',
  },
  error: {
    marginTop: '1rem',
    color: 'red',
  },
};
