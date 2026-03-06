import React, { useState } from 'react';
import { CheckCircle2, MessageSquare } from 'lucide-react';
import './Enquiry.css';

const categories = [
    'Veterinarian',
    'Pet Clinic',
    'Pet Food Dealers',
    'Dog Food Retailers',
    'On-Call Veterinary Doctor',
];

export default function Enquiry() {
    const [form, setForm] = useState({ category: '', name: '', mobile: '' });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
        if (errors[e.target.name]) setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    };

    const validate = () => {
        const e = {};
        if (!form.category) e.category = 'Please select a category';
        if (!form.name.trim()) e.name = 'Name is required';
        if (!form.mobile.trim() || !/^\d{10}$/.test(form.mobile)) e.mobile = 'Enter valid 10-digit number';
        return e;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) { setErrors(errs); return; }
        setSubmitted(true);
        // WhatsApp notification
        const msg = encodeURIComponent(`🔔 *New Enquiry – PetCuro*\n\nCategory: ${form.category}\nName: ${form.name}\nMobile: ${form.mobile}`);
        setTimeout(() => window.open(`https://wa.me/919084709800?text=${msg}`, '_blank'), 800);
    };

    if (submitted) {
        return (
            <section className="section-alt enquiry-section" id="enquiry" aria-label="Enquiry submitted">
                <div className="container enquiry-success">
                    <CheckCircle2 size={56} style={{ color: 'var(--secondary)', marginBottom: 16 }} />
                    <h2>Enquiry Received!</h2>
                    <p>Thank you <strong>{form.name}</strong>! We'll contact you on <strong>{form.mobile}</strong> shortly.</p>
                    <button className="btn btn-primary" onClick={() => { setSubmitted(false); setForm({ category: '', name: '', mobile: '' }); }}>
                        Send Another Enquiry
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section className="section-alt enquiry-section" id="enquiry" aria-labelledby="enquiry-title">
            <div className="container enquiry-inner">
                <div className="enquiry-left">
                    <span className="section-label green"><MessageSquare size={14} /> Quick Enquiry</span>
                    <h2 id="enquiry-title" className="section-title">Have a Question?</h2>
                    <div className="divider"></div>
                    <p style={{ color: 'var(--gray-600)', lineHeight: 1.8, marginBottom: 24 }}>
                        Looking for a veterinarian in Dehradun, pet food supplier, or an on-call vet?
                        Drop your details below — our team will get back to you promptly.
                    </p>
                    <div className="enquiry-info-pills">
                        <div className="enq-pill">📞 +91 90847 09800</div>
                        <div className="enq-pill">📍 Race Course, Dehradun</div>
                        <div className="enq-pill">⏰ Mon–Sun: 10 AM – 7 PM</div>
                    </div>
                </div>

                <form className="enquiry-form-card" onSubmit={handleSubmit} aria-label="Send enquiry to PetCuro">
                    <h3 className="enquiry-form-title">Send Us a Message</h3>

                    <div className="form-group">
                        <label className="form-label" htmlFor="enquiry-category">I'm looking for *</label>
                        <select id="enquiry-category" name="category" className={`form-select ${errors.category ? 'error' : ''}`} value={form.category} onChange={handleChange} aria-required="true">
                            <option value="">Select category...</option>
                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        {errors.category && <span className="field-error">{errors.category}</span>}
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="enquiry-name">Your Name *</label>
                        <input id="enquiry-name" name="name" className={`form-input ${errors.name ? 'error' : ''}`} placeholder="Full name" value={form.name} onChange={handleChange} aria-required="true" />
                        {errors.name && <span className="field-error">{errors.name}</span>}
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="enquiry-mobile">Mobile Number *</label>
                        <input id="enquiry-mobile" name="mobile" className={`form-input ${errors.mobile ? 'error' : ''}`} placeholder="10-digit mobile number" value={form.mobile} onChange={handleChange} maxLength={10} aria-required="true" />
                        {errors.mobile && <span className="field-error">{errors.mobile}</span>}
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                        Send Enquiry → Get Callback
                    </button>

                    <p className="enquiry-privacy">
                        🔒 Your details are safe with us. We'll never share your information.
                    </p>
                </form>
            </div>
        </section>
    );
}
