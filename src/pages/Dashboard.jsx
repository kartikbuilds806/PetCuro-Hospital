import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, CalendarDays, Clock, LogOut, Edit2, X, CheckCircle2, AlertCircle, Trash2, Phone, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import './Dashboard.css';

const statusColors = { confirmed: 'green', cancelled: 'red', pending: 'orange' };
const statusIcons = { confirmed: <CheckCircle2 size={14} />, cancelled: <X size={14} />, pending: <Clock size={14} /> };

export default function Dashboard() {
    const { user, logout, getUserAppointments, cancelAppointment, updateProfile } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('appointments');
    const [appointments, setAppointments] = useState([]);
    const [editProfile, setEditProfile] = useState(false);
    const [profileForm, setProfileForm] = useState({ name: user?.name || '', phone: user?.phone || '' });
    const [profileSaved, setProfileSaved] = useState(false);

    useEffect(() => {
        setAppointments(getUserAppointments());
    }, []);

    const handleCancel = (id) => {
        if (window.confirm('Cancel this appointment?')) {
            cancelAppointment(id);
            setAppointments(getUserAppointments());
        }
    };

    const handleProfileSave = () => {
        updateProfile(profileForm);
        setEditProfile(false);
        setProfileSaved(true);
        setTimeout(() => setProfileSaved(false), 3000);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const upcoming = appointments.filter(a => a.status === 'confirmed');
    const past = appointments.filter(a => a.status === 'cancelled');

    return (
        <div className="dashboard-page">
            {/* Sidebar */}
            <aside className="dashboard-sidebar" aria-label="Dashboard navigation">
                <div className="sidebar-brand">
                    <span className="sidebar-logo">🐾</span>
                    <div>
                        <div className="sidebar-title">PetCuro</div>
                        <div className="sidebar-sub">My Pet Portal</div>
                    </div>
                </div>

                <div className="sidebar-user">
                    <div className="sidebar-avatar">{user?.name?.charAt(0).toUpperCase()}</div>
                    <div>
                        <div className="sidebar-name">{user?.name}</div>
                        <div className="sidebar-email">{user?.email}</div>
                    </div>
                </div>

                <nav className="sidebar-nav" aria-label="Dashboard sections">
                    {[
                        { id: 'appointments', label: 'Appointments', icon: <CalendarDays size={18} /> },
                        { id: 'profile', label: 'My Profile', icon: <User size={18} /> },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            className={`sidebar-nav-item ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                            aria-current={activeTab === tab.id ? 'true' : undefined}
                        >
                            {tab.icon} {tab.label}
                        </button>
                    ))}
                </nav>

                <div className="sidebar-actions">
                    <a href="tel:+919084709800" className="sidebar-call">
                        <Phone size={16} /> Call Clinic
                    </a>
                    <button className="sidebar-logout" onClick={handleLogout}>
                        <LogOut size={16} /> Logout
                    </button>
                </div>
            </aside>

            {/* Main */}
            <main className="dashboard-main" id="dashboard-content">
                {/* Header */}
                <div className="dashboard-header">
                    <div>
                        <h1 className="dashboard-title">
                            {activeTab === 'appointments' ? '📅 My Appointments' : '👤 My Profile'}
                        </h1>
                        <p className="dashboard-sub">PetCuro Hospital & Surgery – Dehradun</p>
                    </div>
                    <button className="btn btn-primary btn-sm" onClick={() => { window.scrollTo(0, 0); navigate('/'); setTimeout(() => document.getElementById('appointment')?.scrollIntoView({ behavior: 'smooth' }), 300); }}>
                        <CalendarDays size={16} /> Book New
                    </button>
                </div>

                {/* APPOINTMENTS TAB */}
                {activeTab === 'appointments' && (
                    <div>
                        {/* Stats */}
                        <div className="dash-stats">
                            <div className="dash-stat">
                                <div className="dash-stat-value">{appointments.length}</div>
                                <div className="dash-stat-label">Total Booked</div>
                            </div>
                            <div className="dash-stat">
                                <div className="dash-stat-value text-primary">{upcoming.length}</div>
                                <div className="dash-stat-label">Upcoming</div>
                            </div>
                            <div className="dash-stat">
                                <div className="dash-stat-value" style={{ color: '#EF4444' }}>{past.length}</div>
                                <div className="dash-stat-label">Cancelled</div>
                            </div>
                        </div>

                        {appointments.length === 0 ? (
                            <div className="dash-empty">
                                <div className="dash-empty-icon">🐾</div>
                                <h3>No Appointments Yet</h3>
                                <p>Book your first appointment with PetCuro Hospital in Dehradun</p>
                                <button className="btn btn-primary" onClick={() => navigate('/')}>
                                    Book Appointment
                                </button>
                            </div>
                        ) : (
                            <div className="appt-list">
                                {appointments.map(appt => (
                                    <div key={appt.id} className={`appt-item ${appt.status}`} role="article" aria-label={`Appointment for ${appt.petName}`}>
                                        <div className="appt-item-header">
                                            <div className="appt-pet-info">
                                                <span className="appt-pet-name">{appt.petName}</span>
                                                <span className="appt-pet-type">({appt.petType})</span>
                                                <span className={`status-badge status-${appt.status}`}>
                                                    {statusIcons[appt.status]} {appt.status}
                                                </span>
                                            </div>
                                            {appt.status === 'confirmed' && (
                                                <button className="cancel-btn" onClick={() => handleCancel(appt.id)} aria-label={`Cancel appointment for ${appt.petName}`}>
                                                    <Trash2 size={15} /> Cancel
                                                </button>
                                            )}
                                        </div>
                                        <div className="appt-item-details">
                                            <div><CalendarDays size={14} /> {appt.date}</div>
                                            <div><Clock size={14} /> {appt.time}</div>
                                            <div><AlertCircle size={14} /> {appt.reason}</div>
                                        </div>
                                        <div className="appt-item-footer">
                                            Booked on {new Date(appt.createdAt).toLocaleDateString('en-IN')}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* PROFILE TAB */}
                {activeTab === 'profile' && (
                    <div>
                        {profileSaved && (
                            <div className="profile-saved" role="status"><CheckCircle2 size={16} /> Profile updated successfully!</div>
                        )}
                        <div className="profile-card">
                            <div className="profile-avatar">{user?.name?.charAt(0).toUpperCase()}</div>
                            <div className="profile-info">
                                <h2 className="profile-name">{user?.name}</h2>
                                <p className="profile-member">PetCuro Member · Dehradun</p>
                            </div>
                            <button className="btn btn-outline btn-sm" onClick={() => setEditProfile(v => !v)}>
                                <Edit2 size={14} /> {editProfile ? 'Cancel Edit' : 'Edit Profile'}
                            </button>
                        </div>

                        {editProfile ? (
                            <div className="profile-edit-form">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="profile-name">Full Name</label>
                                    <input id="profile-name" className="form-input" value={profileForm.name} onChange={e => setProfileForm(p => ({ ...p, name: e.target.value }))} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="profile-phone">Phone Number</label>
                                    <input id="profile-phone" className="form-input" value={profileForm.phone} onChange={e => setProfileForm(p => ({ ...p, phone: e.target.value }))} maxLength={10} />
                                </div>
                                <button className="btn btn-primary" onClick={handleProfileSave}><CheckCircle2 size={16} /> Save Changes</button>
                            </div>
                        ) : (
                            <div className="profile-details">
                                <div className="profile-detail-item"><span>Name</span><strong>{user?.name}</strong></div>
                                <div className="profile-detail-item"><span>Email</span><strong>{user?.email}</strong></div>
                                <div className="profile-detail-item"><span>Phone</span><strong>{user?.phone || 'Not set'}</strong></div>
                                <div className="profile-detail-item"><span>Member Since</span><strong>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN') : 'Today'}</strong></div>
                                <div className="profile-detail-item"><span>Total Appointments</span><strong>{appointments.length}</strong></div>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
