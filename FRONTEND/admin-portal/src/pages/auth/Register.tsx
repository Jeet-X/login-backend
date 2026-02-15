import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Smartphone, ShieldPlus, ArrowRight } from 'lucide-react';
import { authApi } from '../../api/adminApi';

const Register: React.FC = () => {
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        password: '',
        mobile: '',
        role: 'ADMIN',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await authApi.register(formData);
            console.log('Registration Success Response:', response.data);
            alert('Registration successful! Please login.');
            navigate('/login');
        } catch (err: any) {
            console.error('Registration Error:', err.response?.data || err.message);
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card animate-fadeIn">
                <div className="auth-header">
                    <div className="auth-logo">
                        <ShieldPlus size={40} className="text-primary" />
                    </div>
                    <h1>Create Admin</h1>
                    <p>Register a new administrator for the system</p>
                </div>

                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleRegister} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="full_name">Full Name</label>
                        <div className="input-wrapper">
                            <User className="input-icon" size={20} />
                            <input
                                id="full_name"
                                type="text"
                                placeholder="John Doe"
                                value={formData.full_name}
                                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <div className="input-wrapper">
                            <Mail className="input-icon" size={20} />
                            <input
                                id="email"
                                type="email"
                                placeholder="admin@jeetx.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="mobile">Mobile Number (Optional)</label>
                        <div className="input-wrapper">
                            <Smartphone className="input-icon" size={20} />
                            <input
                                id="mobile"
                                type="text"
                                placeholder="+1 234 567 890"
                                value={formData.mobile}
                                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="role">Admin Role</label>
                        <div className="input-wrapper">
                            <ShieldPlus className="input-icon" size={20} />
                            <select
                                id="role"
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                style={{ width: '100%', paddingLeft: '3rem' }}
                            >
                                <option value="ADMIN">Regular Admin</option>
                                <option value="SUPER_ADMIN">Super Admin</option>
                            </select>
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
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                                minLength={8}
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn-primary full-width" disabled={isLoading}>
                        {isLoading ? (
                            <span className="animate-pulse">Processing...</span>
                        ) : (
                            <>
                                <span>Register Admin</span>
                                <ArrowRight size={20} />
                            </>
                        )}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>Already have an account? <Link to="/login">Sign In</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;
