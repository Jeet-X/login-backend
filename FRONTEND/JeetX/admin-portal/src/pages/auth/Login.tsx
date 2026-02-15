import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, LogIn, ArrowRight, ShieldCheck } from 'lucide-react';
import { authApi } from '../../api/adminApi';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(new URLSearchParams(window.location.search).get('error') || '');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await authApi.login({ email, password });
            console.log('Login Success Data:', response.data);

            // Fix: Token is nested inside tokens object
            const token = response.data.data?.tokens?.access_token;

            if (token) {
                console.log('✅ Token extracted successfully:', token.substring(0, 15) + '...');
                localStorage.setItem('adminToken', token);
                navigate('/');
            } else {
                console.error('❌ Token extraction failed! Full data structure:', response.data);
                throw new Error('Access token not found in response');
            }
        } catch (err: any) {
            console.error('Login Error:', err.response?.data || err.message); // Added console log for error
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card animate-fadeIn">
                <div className="auth-header">
                    <div className="auth-logo">
                        <ShieldCheck size={40} className="text-primary" />
                    </div>
                    <h1>Admin Portal</h1>
                    <p>Login to manage your Jeet-X ecosystem</p>
                </div>

                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleLogin} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <div className="input-wrapper">
                            <Mail className="input-icon" size={20} />
                            <input
                                id="email"
                                type="email"
                                placeholder="admin@jeetx.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="input-wrapper">
                            <Lock className="input-icon" size={20} />
                            <input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn-primary full-width" disabled={isLoading}>
                        {isLoading ? (
                            <span className="animate-pulse">Authenticating...</span>
                        ) : (
                            <>
                                <span>Sign In</span>
                                <ArrowRight size={20} />
                            </>
                        )}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>Don't have an admin account? <Link to="/register">Register here</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
