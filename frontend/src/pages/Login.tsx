import axios from 'axios';
import {
    useState,
    useContext,
    ChangeEvent,
    FormEvent
} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

interface LoginForm {
    email: string;
    password: string;
}

interface Status {
    message: string;
    isError: boolean;
    isLoading: boolean;
}

const Login: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const [formData, setFormData] = useState<LoginForm>({
        email: '',
        password: '',
    });
    const [status, setStatus] = useState<Status>({
        message: '',
        isError: false,
        isLoading: false,
    });

    // Update form fields
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Submit login request
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus({ message: '', isError: false, isLoading: true });

        try {
            const { data } = await axios.post<{
                token: string;
                userId: string;
            }>('http://localhost:5000/api/users/login', formData);

            // Centralized auth – stores token & emits to all tabs
            login(data.token);

            // If you still need to store userId separately:
            localStorage.setItem('userId', data.userId);

            navigate('/', { replace: true });
        } catch (err: any) {
            setStatus({
                message:
                    err.response?.data?.message ||
                    err.message ||
                    'An error occurred during login.',
                isError: true,
                isLoading: false,
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
                    Welcome to{' '}
                    <span className="campus-highlight">
                        Macquarie University's
                    </span>{' '}
                    student portal
                </p>

                <h2 className="form-title">Login</h2>
                <form
                    onSubmit={handleSubmit}
                    className="signup-form"
                    noValidate
                >
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
                            placeholder="*******"
                            minLength={6}
                        />
                    </div>

                    <button
                        type="submit"
                        className="login-button"
                        disabled={status.isLoading}
                    >
                        {status.isLoading ? 'Logging in…' : 'Sign In'}
                    </button>

                    {status.message && (
                        <div
                            className={`status-message ${status.isError ? 'error' : 'success'
                                }`}
                        >
                            {status.message}
                        </div>
                    )}
                </form>

                <footer>
                    <p>
                        Create a new account{' '}
                        <Link to="/signup" className="footer-link">
                            Sign up
                        </Link>
                    </p>
                    <p className="footer-help">
                        Need help?{' '}
                        <Link to="/help" className="footer-link">
                            Contact Support
                        </Link>
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default Login;
