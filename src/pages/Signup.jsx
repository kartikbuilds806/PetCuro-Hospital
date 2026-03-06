import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import './Auth.css';

export default function Signup() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
    const [showPw, setShowPw] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, phone, password, confirm } = form;
        if (!name || !email || !phone || !password) { setError('Please fill all required fields.'); return; }
        if (password !== confirm) { setError('Passwords do not match.'); return; }
        if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
        if (!/^\d{10}$/.test(phone)) { setError('Enter a valid 10-digit phone number.'); return; }
        setLoading(true);
        setError('');
        try {
            register(name, email, phone, password);
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
                        <div className="auth-card-icon auth-card-icon-green"><UserPlus size={24} /></div>
                        <h1 className="auth-title">Create Account</h1>
                        <p className="auth-subtitle">Join PetCuro to manage your pet's health</p>
                    </div>

                    {error && (
                        <div className="auth-error" role="alert">⚠️ {error}</div>
                    )}

                    <form onSubmit={handleSubmit} aria-label="Sign up form">
                        <div className="form-group">
                            <label className="form-label" htmlFor="signup-name">Full Name *</label>
                            <input id="signup-name" name="name" className="form-input" placeholder="Your full name" value={form.name} onChange={handleChange} aria-required="true" />
                        </div>

                        <div className="auth-form-row">
                            <div className="form-group">
                                <label className="form-label" htmlFor="signup-email">Email *</label>
                                <input id="signup-email" name="email" type="email" className="form-input" placeholder="your@email.com" value={form.email} onChange={handleChange} aria-required="true" />
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="signup-phone">Phone *</label>
                                <input id="signup-phone" name="phone" className="form-input" placeholder="10-digit number" value={form.phone} onChange={handleChange} maxLength={10} aria-required="true" />
                            </div>
                        </div>

                        <div className="auth-form-row">
                            <div className="form-group">
                                <label className="form-label" htmlFor="signup-password">Password *</label>
                                <div className="password-wrapper">
                                    <input id="signup-password" name="password" type={showPw ? 'text' : 'password'} className="form-input" placeholder="Min. 6 characters" value={form.password} onChange={handleChange} aria-required="true" />
                                    <button type="button" className="pw-toggle" onClick={() => setShowPw(v => !v)} aria-label="Toggle password visibility">
                                        {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="signup-confirm">Confirm Password *</label>
                                <input id="signup-confirm" name="confirm" type={showPw ? 'text' : 'password'} className="form-input" placeholder="Repeat password" value={form.confirm} onChange={handleChange} aria-required="true" />
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary auth-submit" disabled={loading} aria-busy={loading}>
                            {loading ? 'Creating Account...' : 'Create My Account 🐾'}
                        </button>
                    </form>

                    <p className="auth-switch">
                        Already have an account? <Link to="/login" className="auth-link">Login</Link>
                    </p>
                </div>

                <p className="auth-back">
                    <Link to="/" className="auth-link">← Back to PetCuro Hospital</Link>
                </p>
            </div>
        </div>
    );
}
