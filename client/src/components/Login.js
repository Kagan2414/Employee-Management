import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await api.post('/auth/login', credentials);
            login(response.data.user, response.data.token);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (

            <div className="min-h-screen flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="card max-w-md w-full space-y-8 animate-fade-in bg-gradient-to-br from-blue-50 to-indigo-100">
                    <div className="text-center">
                        <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
                            Welcome Back
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Sign in to access your account
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 animate-fade-in">
                                <p className="text-red-700">{error}</p>
                            </div>
                        )}
                        <div className="rounded-md -space-y-px">
                            <div className="mb-4">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    className="input-field rounded-md"
                                    placeholder="Enter your email"
                                    value={credentials.email}
                                    onChange={(e) => setCredentials({
                                        ...credentials,
                                        email: e.target.value
                                    })}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    required
                                    className="input-field rounded-md"
                                    placeholder="Enter your password"
                                    value={credentials.password}
                                    onChange={(e) => setCredentials({
                                        ...credentials,
                                        password: e.target.value
                                    })}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="btn-primary w-full transform transition-all duration-3000 hover:scale-105 focus:scale-95"
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Signing in...
                                    </span>
                                ) : 'Sign in'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
    );
};

export default Login;