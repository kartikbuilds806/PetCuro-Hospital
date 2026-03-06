import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Phone, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import './Navbar.css';

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        setOpen(false);
    }, [location]);

    const scrollTo = (id) => {
        setOpen(false);
        if (location.pathname !== '/') {
            navigate('/');
            setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 300);
        } else {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const navLinks = [
        { label: 'Home', id: 'hero' },
        { label: 'About', id: 'about' },
        { label: 'Services', id: 'services' },
        { label: 'Why Us', id: 'why-us' },
        { label: 'Reviews', id: 'reviews' },
        { label: 'Contact', id: 'contact' },
    ];

    return (
        <header className={`navbar${scrolled ? ' scrolled' : ''}`} role="banner">
            <div className="container navbar-inner">
                {/* Logo */}
                <Link to="/" className="navbar-logo" aria-label="PetCuro Hospital - Home">
                    <div className="logo-icon" aria-hidden="true">🐾</div>
                    <div className="logo-text">
                        <span className="logo-name">PetCuro</span>
                        <span className="logo-sub">Hospital & Surgery</span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="navbar-nav" aria-label="Main navigation">
                    {navLinks.map(link => (
                        <button key={link.id} className="nav-link" onClick={() => scrollTo(link.id)} aria-label={`Navigate to ${link.label}`}>
                            {link.label}
                        </button>
                    ))}
                </nav>

                {/* Desktop Actions */}
                <div className="navbar-actions">
                    <a href="tel:+919084709800" className="btn btn-outline btn-sm nav-call" aria-label="Call PetCuro Hospital">
                        <Phone size={15} /> Call Now
                    </a>
                    {user ? (
                        <div className="user-menu">
                            <button className="user-avatar" aria-label="User menu">
                                <User size={16} />
                                <span>{user.name.split(' ')[0]}</span>
                            </button>
                            <div className="user-dropdown">
                                <Link to="/dashboard" className="dropdown-item">
                                    <LayoutDashboard size={15} /> Dashboard
                                </Link>
                                <button className="dropdown-item" onClick={handleLogout}>
                                    <LogOut size={15} /> Logout
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="auth-btns">
                            <Link to="/login" className="btn btn-sm" style={{ color: 'var(--primary)', fontWeight: 600 }}>Login</Link>
                            <Link to="/signup" className="btn btn-primary btn-sm">Sign Up</Link>
                        </div>
                    )}
                </div>

                {/* Hamburger */}
                <button className="hamburger" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
                    {open ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="mobile-menu" role="dialog" aria-label="Mobile navigation">
                    <nav className="mobile-nav">
                        {navLinks.map(link => (
                            <button key={link.id} className="mobile-nav-link" onClick={() => scrollTo(link.id)}>
                                {link.label}
                            </button>
                        ))}
                        <hr style={{ border: 'none', borderTop: '1px solid var(--gray-200)', margin: '8px 0' }} />
                        {user ? (
                            <>
                                <Link to="/dashboard" className="mobile-nav-link" onClick={() => setOpen(false)}>Dashboard</Link>
                                <button className="mobile-nav-link" onClick={() => { handleLogout(); setOpen(false); }}>Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="mobile-nav-link" onClick={() => setOpen(false)}>Login</Link>
                                <Link to="/signup" className="btn btn-primary" style={{ margin: '8px 16px', textAlign: 'center' }} onClick={() => setOpen(false)}>Sign Up</Link>
                            </>
                        )}
                    </nav>
                </div>
            )}
        </header>
    );
}
