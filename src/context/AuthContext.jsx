import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem('petcuro_user');
        if (stored) {
            setUser(JSON.parse(stored));
        }
        const storedAppts = localStorage.getItem('petcuro_appointments');
        if (storedAppts) {
            setAppointments(JSON.parse(storedAppts));
        }
        setLoading(false);
    }, []);

    const register = (name, email, phone, password) => {
        const users = JSON.parse(localStorage.getItem('petcuro_users') || '[]');
        const exists = users.find(u => u.email === email);
        if (exists) throw new Error('Email already registered');
        const newUser = {
            id: Date.now().toString(),
            name, email, phone,
            password, // In production, this would be hashed
            createdAt: new Date().toISOString()
        };
        users.push(newUser);
        localStorage.setItem('petcuro_users', JSON.stringify(users));
        const { password: _, ...safeUser } = newUser;
        setUser(safeUser);
        localStorage.setItem('petcuro_user', JSON.stringify(safeUser));
        return safeUser;
    };

    const login = (email, password) => {
        const users = JSON.parse(localStorage.getItem('petcuro_users') || '[]');
        const found = users.find(u => u.email === email && u.password === password);
        if (!found) throw new Error('Invalid email or password');
        const { password: _, ...safeUser } = found;
        setUser(safeUser);
        localStorage.setItem('petcuro_user', JSON.stringify(safeUser));
        return safeUser;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('petcuro_user');
    };

    const bookAppointment = (data) => {
        const allAppts = JSON.parse(localStorage.getItem('petcuro_appointments') || '[]');
        const newAppt = {
            id: Date.now().toString(),
            ...data,
            userId: user?.id || 'guest',
            status: 'confirmed',
            createdAt: new Date().toISOString()
        };
        allAppts.push(newAppt);
        localStorage.setItem('petcuro_appointments', JSON.stringify(allAppts));
        setAppointments(allAppts);
        return newAppt;
    };

    const getUserAppointments = () => {
        const allAppts = JSON.parse(localStorage.getItem('petcuro_appointments') || '[]');
        return user ? allAppts.filter(a => a.userId === user.id) : [];
    };

    const cancelAppointment = (id) => {
        const allAppts = JSON.parse(localStorage.getItem('petcuro_appointments') || '[]');
        const updated = allAppts.map(a => a.id === id ? { ...a, status: 'cancelled' } : a);
        localStorage.setItem('petcuro_appointments', JSON.stringify(updated));
        setAppointments(updated);
    };

    const updateProfile = (updates) => {
        const updated = { ...user, ...updates };
        setUser(updated);
        localStorage.setItem('petcuro_user', JSON.stringify(updated));
        // Update in users list too
        const users = JSON.parse(localStorage.getItem('petcuro_users') || '[]');
        const idx = users.findIndex(u => u.id === user.id);
        if (idx !== -1) {
            users[idx] = { ...users[idx], ...updates };
            localStorage.setItem('petcuro_users', JSON.stringify(users));
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, register, login, logout, bookAppointment, getUserAppointments, cancelAppointment, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
