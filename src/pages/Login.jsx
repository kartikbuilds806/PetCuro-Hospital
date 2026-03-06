import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import './Auth.css';

export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [showPw, setShowPw] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.email || !form.password) { setError('Please fill all fields.'); return; }
        setLoading(true);
        setError('');
        try {
            login(form.email, form.password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-brand">
                    <Link to="/" className="auth-logo">🐾 PetCuro</Link>
                    <p className="auth-brand-sub">Hospital & Surgery – Dehradun</p>
                </div>

                <div className="auth-card">
                    <div className="auth-card-header">
                        <div className="auth-card-icon"><LogIn size={24} /></div>
                        <h1 className="auth-title">Welcome Back!</h1>
                        <p className="auth-subtitle">Login to manage your pet's appointments</p>
                    </div>

                    {error && (
                        <div className="auth-error" role="alert">
                            ⚠️ {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} aria-label="Login form">
                        <div className="form-group">
                            <label className="form-label" htmlFor="login-email">Email Address</label>
                            <input
                                id="login-email"
                                name="email"
                                type="email"
                                className="form-input"
                                placeholder="your@email.com"
                                value={form.email}
                                onChange={handleChange}
                                autoComplete="email"
                                aria-required="true"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="login-password">Password</label>
                            <div className="password-wrapper">
                                <input
                                    id="login-password"
                                    name="password"
                                    type={showPw ? 'text' : 'password'}
                                    className="form-input"
                                    placeholder="Your password"
                                    value={form.password}
                                    onChange={handleChange}
                                    autoComplete="current-password"
                                    aria-required="true"
                                />
                                <button type="button" className="pw-toggle" onClick={() => setShowPw(v => !v)} aria-label={showPw ? 'Hide password' : 'Show password'}>
                                    {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary auth-submit" disabled={loading} aria-busy={loading}>
                            {loading ? 'Logging in...' : 'Login to Dashboard'}
                        </button>
                    </form>

                    <p className="auth-switch">
                        Don't have an account? <Link to="/signup" className="auth-link">Sign Up Free</Link>
                    </p>
                </div>

                <p className="auth-back">
                    <Link to="/" className="auth-link">← Back to PetCuro Hospital</Link>
                </p>
            </div>
        </div>
    );
}
