import React, { useState } from 'react';
import { CalendarDays, Clock, User, Phone, Mail, Heart, CheckCircle2, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import './Appointment.css';

const petTypes = ['Dog', 'Cat'];
const reasons = [
    'General Check-up', 'Vaccination', 'Surgery Consultation', 'Emergency',
    'Dental Scaling', 'Grooming', 'Diagnostics / Blood Test', 'X-Ray / Ultrasound',
    'Deworming', 'Skin Issue', 'Neutering / Sterilization', 'Other'
];
const timeSlots = ['10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'];
const HOLIDAYS = []; // No holidays

export default function Appointment() {
    const { bookAppointment } = useAuth();
    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [calMonth, setCalMonth] = useState(new Date());
    const [form, setForm] = useState({ ownerName: '', phone: '', email: '', petName: '', petType: '', reason: '' });
    const [errors, setErrors] = useState({});

    // Calendar helpers
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    const year = calMonth.getFullYear();
    const month = calMonth.getMonth();
    const totalDays = daysInMonth(year, month);
    const firstDay = firstDayOfMonth(year, month);

    const prevMonth = () => setCalMonth(d => new Date(d.getFullYear(), d.getMonth() - 1));
    const nextMonth = () => setCalMonth(d => new Date(d.getFullYear(), d.getMonth() + 1));

    const selectDate = (day) => {
        const d = new Date(year, month, day);
        if (d < today || HOLIDAYS.includes(d.getDay())) return;
        setSelectedDate(d);
        setSelectedTime(null);
    };

    const isDisabled = (day) => {
        const d = new Date(year, month, day);
        return d < today || HOLIDAYS.includes(d.getDay());
    };

    const isSelected = (day) => {
        if (!selectedDate) return false;
        return selectedDate.getDate() === day && selectedDate.getMonth() === month && selectedDate.getFullYear() === year;
    };

    // Form validation
    const validate = () => {
        const e = {};
        if (!form.ownerName.trim()) e.ownerName = 'Owner name is required';
        if (!form.phone.trim() || !/^[6-9]\d{9}$/.test(form.phone))
            e.phone = 'Enter valid 10-digit Indian mobile number';
        if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter valid email address';
        if (!form.petName.trim()) e.petName = 'Pet name is required';
        if (!form.petType) e.petType = 'Select pet type';
        if (!form.reason) e.reason = 'Select reason for visit';
        return e;
    };

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
        if (errors[e.target.name]) setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) { setErrors(errs); return; }
        if (!selectedDate || !selectedTime) return;

        setIsSubmitting(true);

        const appt = bookAppointment({
            ...form,
            date: selectedDate.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
            time: selectedTime,
            rawDate: selectedDate.toISOString(),
        });

        // WhatsApp message in requested format
        const msg = encodeURIComponent(
            `Hello PetCuro Hospital,\n` +
            `I would like to confirm my appointment.\n\n` +
            `Name: ${form.ownerName}\n` +
            `Pet Name: ${form.petName}\n` +
            `Pet Type: ${form.petType}\n` +
            `Reason: ${form.reason}\n` +
            `Preferred Date: ${appt.date} at ${selectedTime}`
        );

        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitted(true);
            window.open(`https://wa.me/919084709800?text=${msg}`, '_blank');
        }, 1500);
    };

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    if (submitted) {
        return (
            <section className="section appointment-section" id="appointment" aria-label="Appointment confirmed">
                <div className="container">
                    <div className="appt-success">
                        <div className="success-icon"><CheckCircle2 size={64} /></div>
                        <h2>Appointment Confirmed! 🎉</h2>
                        <p>Thank you, <strong>{form.ownerName}</strong>! Your appointment for <strong>{form.petName}</strong> has been booked.</p>
                        <div className="success-details">
                            <div><CalendarDays size={18} /> {selectedDate?.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                            <div><Clock size={18} /> {selectedTime}</div>
                            <div><Heart size={18} /> PetCuro Hospital – Race Course, Dehradun</div>
                        </div>
                        <p className="success-note">A WhatsApp message has been opened to notify our team. We'll confirm your appointment shortly!</p>
                        <div className="success-btns">
                            <button className="btn btn-primary" onClick={() => { setSubmitted(false); setStep(1); setSelectedDate(null); setSelectedTime(null); setForm({ ownerName: '', phone: '', email: '', petName: '', petType: '', reason: '' }); }}>
                                Book Another Appointment
                            </button>
                            <a href="tel:+919084709800" className="btn btn-outline">Call Us to Confirm</a>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="section appointment-section" id="appointment" aria-labelledby="appt-title">
            <div className="container">
                <div className="section-header">
                    <span className="section-label"><CalendarDays size={14} /> Book Appointment</span>
                    <h2 id="appt-title" className="section-title">
                        Book a Vet Appointment in Dehradun
                    </h2>
                    <p className="section-desc">
                        Book your pet's health check online at PetCuro Hospital. Select your preferred date and time — we'll confirm via WhatsApp.
                    </p>
                </div>

                <div className="appt-wrapper">
                    {/* Step indicator */}
                    <div className="appt-steps" aria-label="Booking steps">
                        {['Select Date & Time', 'Your Details', 'Confirm'].map((s, i) => (
                            <div key={i} className={`step-item ${step > i + 1 ? 'done' : ''} ${step === i + 1 ? 'active' : ''}`}>
                                <div className="step-circle">{step > i + 1 ? '✓' : i + 1}</div>
                                <span className="step-label">{s}</span>
                            </div>
                        ))}
                    </div>

                    <div className="appt-form-area">
                        {/* STEP 1: Calendar */}
                        {step === 1 && (
                            <div className="appt-step">
                                <div className="calendar-wrapper">
                                    <div className="calendar-nav">
                                        <button className="cal-nav-btn" onClick={prevMonth} aria-label="Previous month"><ChevronLeft size={20} /></button>
                                        <h3>{monthNames[month]} {year}</h3>
                                        <button className="cal-nav-btn" onClick={nextMonth} aria-label="Next month"><ChevronRight size={20} /></button>
                                    </div>
                                    <div className="calendar-days-header">
                                        {dayNames.map(d => <div key={d} className={`cal-day-name`}>{d}</div>)}
                                    </div>
                                    <div className="calendar-grid">
                                        {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`}></div>)}
                                        {Array.from({ length: totalDays }, (_, i) => i + 1).map(day => (
                                            <button
                                                key={day}
                                                className={`cal-day ${isDisabled(day) ? 'disabled' : ''} ${isSelected(day) ? 'selected' : ''}`}
                                                onClick={() => selectDate(day)}
                                                disabled={isDisabled(day)}
                                                aria-label={`Select ${monthNames[month]} ${day}, ${year}`}
                                                aria-selected={isSelected(day)}
                                            >
                                                {day}
                                                {new Date(year, month, day).toDateString() === today.toDateString() && <span className="today-dot"></span>}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {selectedDate && (
                                    <div className="time-slots">
                                        <h3 className="slots-title">
                                            <Clock size={18} /> Available Times for {selectedDate.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}
                                        </h3>
                                        <div className="slots-grid">
                                            {timeSlots.map(t => (
                                                <button
                                                    key={t}
                                                    className={`time-slot ${selectedTime === t ? 'selected' : ''}`}
                                                    onClick={() => setSelectedTime(t)}
                                                    aria-pressed={selectedTime === t}
                                                >
                                                    {t}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="appt-nav">
                                    <div></div>
                                    <button
                                        className="btn btn-primary btn-lg"
                                        onClick={() => setStep(2)}
                                        disabled={!selectedDate || !selectedTime}
                                        aria-label="Continue to enter details"
                                    >
                                        Continue →
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* STEP 2: Form */}
                        {step === 2 && (
                            <form onSubmit={(e) => { e.preventDefault(); const errs = validate(); if (Object.keys(errs).length > 0) { setErrors(errs); return; } setStep(3); }} className="appt-step">
                                <div className="appt-form-row">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="ownerName"><User size={14} /> Owner Name *</label>
                                        <input id="ownerName" name="ownerName" className={`form-input ${errors.ownerName ? 'error' : ''}`} placeholder="Your full name" value={form.ownerName} onChange={handleChange} aria-required="true" />
                                        {errors.ownerName && <span className="field-error">{errors.ownerName}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="phone"><Phone size={14} /> Phone / WhatsApp *</label>
                                        <input id="phone" name="phone" className={`form-input ${errors.phone ? 'error' : ''}`} placeholder="10-digit mobile number" value={form.phone} onChange={handleChange} maxLength={10} aria-required="true" />
                                        {errors.phone && <span className="field-error">{errors.phone}</span>}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="email"><Mail size={14} /> Email Address *</label>
                                    <input id="email" name="email" type="email" className={`form-input ${errors.email ? 'error' : ''}`} placeholder="your@email.com" value={form.email} onChange={handleChange} aria-required="true" />
                                    {errors.email && <span className="field-error">{errors.email}</span>}
                                </div>
                                <div className="appt-form-row">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="petName"><Heart size={14} /> Pet Name *</label>
                                        <input id="petName" name="petName" className={`form-input ${errors.petName ? 'error' : ''}`} placeholder="Your pet's name" value={form.petName} onChange={handleChange} aria-required="true" />
                                        {errors.petName && <span className="field-error">{errors.petName}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="petType">Pet Type *</label>
                                        <select id="petType" name="petType" className={`form-select ${errors.petType ? 'error' : ''}`} value={form.petType} onChange={handleChange} aria-required="true">
                                            <option value="">Select pet type</option>
                                            {petTypes.map(t => <option key={t} value={t}>{t}</option>)}
                                        </select>
                                        {errors.petType && <span className="field-error">{errors.petType}</span>}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="reason">Reason for Visit *</label>
                                    <select id="reason" name="reason" className={`form-select ${errors.reason ? 'error' : ''}`} value={form.reason} onChange={handleChange} aria-required="true">
                                        <option value="">Select reason</option>
                                        {reasons.map(r => <option key={r} value={r}>{r}</option>)}
                                    </select>
                                    {errors.reason && <span className="field-error">{errors.reason}</span>}
                                </div>
                                <div className="appt-nav">
                                    <button type="button" className="btn btn-outline" onClick={() => setStep(1)}>← Back</button>
                                    <button type="submit" className="btn btn-primary btn-lg">Review Booking →</button>
                                </div>
                            </form>
                        )}

                        {/* STEP 3: Confirm */}
                        {step === 3 && (
                            <div className="appt-step">
                                <div className="confirm-card">
                                    <h3>🐾 Booking Summary</h3>
                                    <div className="confirm-grid">
                                        <div className="confirm-item"><span>Owner</span><strong>{form.ownerName}</strong></div>
                                        <div className="confirm-item"><span>Phone</span><strong>{form.phone}</strong></div>
                                        <div className="confirm-item"><span>Email</span><strong>{form.email}</strong></div>
                                        <div className="confirm-item"><span>Pet</span><strong>{form.petName} ({form.petType})</strong></div>
                                        <div className="confirm-item"><span>Date</span><strong>{selectedDate?.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</strong></div>
                                        <div className="confirm-item"><span>Time</span><strong>{selectedTime}</strong></div>
                                        <div className="confirm-item confirm-item-full"><span>Reason</span><strong>{form.reason}</strong></div>
                                    </div>
                                    <p className="confirm-note">✅ Booking your appointment will open WhatsApp to notify PetCuro team. We'll confirm your slot shortly!</p>
                                </div>
                                <div className="appt-nav">
                                    <button className="btn btn-outline" onClick={() => setStep(2)} disabled={isSubmitting}>← Edit Details</button>
                                    <button className="btn btn-primary btn-lg" onClick={handleSubmit} disabled={isSubmitting} aria-busy={isSubmitting}>
                                        {isSubmitting ? (
                                            <><Loader2 size={18} className="spin-icon" /> Sending…</>
                                        ) : (
                                            <>Confirm &amp; Notify on WhatsApp 🐾</>
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar Info */}
                    <div className="appt-sidebar">
                        <div className="appt-info-card">
                            <h3>📍 Clinic Info</h3>
                            <p><strong>PetCuro Hospital & Surgery</strong><br />Ganpati Tower, G4 A, Guru Nanak Vihar, Race Course, Dehradun 248001</p>
                            <a href="tel:+919084709800" className="appt-info-link">📞 +91 90847 09800</a>
                        </div>
                        <div className="appt-hours-card">
                            <h3>🕐 Clinic Hours</h3>
                            <table className="appt-hours-table">
                                <tbody>
                                    {[['Mon', '10 AM – 7 PM'], ['Tue', '10 AM – 7 PM'], ['Wed', '10 AM – 7 PM'], ['Thu', 'Holiday ❌'], ['Fri', '10 AM – 7 PM'], ['Sat', '10 AM – 7 PM'], ['Sun', '10 AM – 7 PM']].map(([d, h]) =>
                                        <tr key={d} className={d === 'Thu' ? 'holiday' : ''}><td>{d}</td><td>{h}</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="appt-wa-card">
                            <p>Prefer WhatsApp booking?</p>
                            <a href="https://wa.me/919084709800?text=Hi%20PetCuro!%20I%20want%20to%20book%20an%20appointment." target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp" style={{ width: '100%', justifyContent: 'center' }}>
                                Book via WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
