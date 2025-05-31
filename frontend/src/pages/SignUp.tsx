import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const PasswordRequirements = ({ password }: any) => {
    const requirements = [
        { text: 'At least 8 characters', met: password.length >= 8 },
        { text: 'Contains uppercase letter', met: /[A-Z]/.test(password) },
        { text: 'Contains lowercase letter', met: /[a-z]/.test(password) },
        { text: 'Contains number', met: /[0-9]/.test(password) },
        { text: 'Contains special character', met: /[!@#$%^&*]/.test(password) },
    ];

    return (
        <div className="password-requirements">
            {requirements.map((req, index) => (
                <div key={index} className={`requirement ${req.met ? 'met' : ''}`}>
                    <span className="requirement-icon">{req.met ? '✓' : '○'}</span>
                    {req.text}
                </div>
            ))}
        </div>
    );
};

const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        studentId: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [status, setStatus] = useState({
        message: '',
        isError: false,
        isLoading: false
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setStatus({
                message: 'Passwords do not match',
                isError: true,
                isLoading: false
            });
            return;
        }

        setStatus({ message: '', isError: false, isLoading: true });

        try {
            const response = await axios.post('http://localhost:5000/api/users/register', {
                name: `${formData.firstName} ${formData.lastName}`,
                studentId: formData.studentId,
                email: formData.email,
                password: formData.password
            });

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.userId);

            setStatus({
                message: `Welcome to CampusHQ, ${formData.firstName}! Your account has been created successfully.`,
                isError: false,
                isLoading: false
            });

            // Redirect to home page after successful signup
            navigate('/');
        } catch (error: any) {
            setStatus({
                message: error.response?.data?.message || 'An error occurred during registration',
                isError: true,
                isLoading: false
            });
        }
    };

    return (
        <div className="app-bg">
            <div className="center-card">
                <div className="logo-row">
                    <img
                        src="https://historycouncilnsw.org.au/wp-content/uploads/2016/07/MQ_MAS_VER_RGB_POS.png"
                        alt="Macquarie Logo"
                        className="mq-logo"
                    />
                    <h1 className="campus-title">CampusHQ</h1>
                </div>

                <p className="header-text">
                    Welcome to <span className="campus-highlight">Macquarie University's</span> student portal
                </p>

                <h2 className="form-title">Create Your Account</h2>

                <form onSubmit={handleSubmit} className="signup-form">
                    <div className="form-group">
                        <label htmlFor="firstName" className="form-label">
                            First Name <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="form-input"
                            required
                            placeholder="Enter your first name"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="lastName" className="form-label">
                            Last Name <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="form-input"
                            required
                            placeholder="Enter your last name"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="studentId" className="form-label">
                            Student ID <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            id="studentId"
                            name="studentId"
                            value={formData.studentId}
                            onChange={handleChange}
                            className="form-input"
                            required
                            placeholder="Enter your student ID"
                            pattern="\d{8}"
                            title="Please enter your 8-digit student ID"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email" className="form-label">
                            University Email <span className="required">*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="form-input"
                            required
                            placeholder="your.name@students.mq.edu.au"
                            pattern=".*@students\.mq\.edu\.au$"
                            title="Please use your Macquarie University student email"
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
                            placeholder="Create a strong password"
                        />
                        <PasswordRequirements password={formData.password} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword" className="form-label">
                            Confirm Password <span className="required">*</span>
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="form-input"
                            required
                            placeholder="Confirm your password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="submit-button"
                        disabled={status.isLoading}
                    >
                        {status.isLoading ? 'Creating Account...' : 'Create Account'}
                    </button>

                    {status.message && (
                        <div className={`status-message ${status.isError ? 'error' : 'success'}`}>
                            {status.message}
                        </div>
                    )}
                </form>

                <footer className="form-footer">
                    <p>Already have an account? <Link to="/login" className="footer-link">Sign in</Link></p>
                    <p className="footer-help">Need help? <Link to="/help" className="footer-link">Contact Support</Link></p>
                </footer>
            </div>
        </div>
    );
};

export default SignUp;