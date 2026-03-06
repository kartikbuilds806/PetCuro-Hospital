import React, { useState } from 'react';
import { Search, CalendarDays } from 'lucide-react';
import './Services.css';

const services = [
    { icon: '🩺', title: 'Veterinarian Consultation', desc: 'Comprehensive health assessments and general check-ups for dogs and cats. Expert diagnosis available in Dehradun.', tag: 'General' },
    { icon: '💉', title: 'Pet Vaccination', desc: 'Complete vaccination schedules for puppies, adult dogs and cats. Pet vaccination services available in Dehradun. Book appointment online.', tag: 'Preventive' },
    { icon: '🩸', title: 'Blood Tests & Diagnostics', desc: 'In-house complete blood count, biochemistry, and pathology tests. Advanced pet diagnostics in Dehradun. Book appointment online.', tag: 'Diagnostics' },
    { icon: '🔬', title: 'Cancer Diagnosis & Chemotherapy', desc: 'Advanced oncology care including cancer screening and chemotherapy protocols for pets in Dehradun. Book appointment online.', tag: 'Oncology' },
    { icon: '💓', title: 'ECG', desc: 'Electrocardiogram for heart health monitoring in dogs and cats. Cardiac diagnostic services available in Dehradun.', tag: 'Cardiology' },
    { icon: '🩻', title: 'In-House X-Ray', desc: 'Digital radiography for accurate skeletal and soft-tissue diagnostics. X-Ray for pets available in Dehradun. Book appointment online.', tag: 'Imaging' },
    { icon: '📡', title: 'Ultrasound (USG)', desc: 'High-resolution ultrasonography for abdominal, reproductive, and cardiac imaging for pets in Dehradun.', tag: 'Imaging' },
    { icon: '🦷', title: 'Dental Scaling', desc: 'Professional dental cleaning and oral health care for dogs and cats. Pet dental services in Dehradun. Book appointment online.', tag: 'Dental' },
    { icon: '✂️', title: 'Grooming', desc: 'Professional pet grooming including bath, haircut, nail trimming, and ear cleaning. Grooming services in Dehradun.', tag: 'Grooming' },
    { icon: '📍', title: 'Microchipping', desc: 'ISO-compliant permanent microchip identification for dogs and cats in Dehradun. Book appointment online.', tag: 'ID & Safety' },
    { icon: '📋', title: 'Pet Health Certificate', desc: 'Official veterinary health certificates for travel, airlines, and for other official purposes in Dehradun.', tag: 'Certificates' },
    { icon: '🔪', title: 'Soft Tissue Surgeries', desc: 'Expert soft tissue and orthopaedic surgeries. Advanced dog surgery in Dehradun by Dr. Atul Uniyal. Book appointment online.', tag: 'Surgery' },
    { icon: '⚕️', title: 'Neutering / Sterilization', desc: 'Safe and effective neutering and spaying procedures for dogs and cats in Dehradun. Book appointment online.', tag: 'Surgery' },
    { icon: '🩺', title: 'Diabetes & Thyroid Treatment', desc: 'Specialized management of metabolic disorders including diabetes and thyroid diseases for pets in Dehradun.', tag: 'Medicine' },
    { icon: '🖥️', title: 'Pet Scan', desc: 'Advanced imaging diagnostics for comprehensive pet health evaluation. Available in Dehradun.', tag: 'Diagnostics' },
    { icon: '🩸', title: 'Blood Transfusion', desc: 'Emergency and elective blood transfusion services for critically ill pets in Dehradun. Book appointment online.', tag: 'Emergency' },
    { icon: '🧫', title: 'Urine Examination', desc: 'Complete urinalysis for kidney function, infections and metabolic assessment for dogs and cats in Dehradun.', tag: 'Diagnostics' },
];

const tags = ['All', ...Array.from(new Set(services.map(s => s.tag)))];

export default function Services() {
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');

    const filtered = services.filter(s =>
        (filter === 'All' || s.tag === filter) &&
        s.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <section className="section-alt services-section" id="services" aria-labelledby="services-title">
            <div className="container">
                <div className="section-header">
                    <span className="section-label green">
                        <span>🏥</span> Our Services
                    </span>
                    <h2 id="services-title" className="section-title">
                        Complete Veterinary Services in Dehradun
                    </h2>
                    <p className="section-desc">
                        From routine check-ups to complex surgeries – PetCuro offers 17+ specialized services at our veterinary hospital near Race Course, Dehradun.
                    </p>
                </div>

                {/* Search & Filter */}
                <div className="services-controls">
                    <div className="services-search">
                        <Search size={18} className="search-icon" aria-hidden="true" />
                        <input
                            type="text"
                            className="form-input search-input"
                            placeholder="Search services..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            aria-label="Search veterinary services"
                        />
                    </div>
                    <div className="services-filters" role="group" aria-label="Filter services by category">
                        {tags.map(tag => (
                            <button
                                key={tag}
                                className={`filter-btn ${filter === tag ? 'active' : ''}`}
                                onClick={() => setFilter(tag)}
                                aria-pressed={filter === tag}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Services Grid */}
                <div className="services-grid" role="list">
                    {filtered.map((service, i) => (
                        <article key={i} className="service-card" role="listitem">
                            <div className="service-icon" aria-hidden="true">{service.icon}</div>
                            <div className="badge badge-blue service-tag">{service.tag}</div>
                            <h3 className="service-title">{service.title}</h3>
                            <p className="service-desc">{service.desc}</p>
                            <button
                                className="service-cta"
                                onClick={() => document.getElementById('appointment')?.scrollIntoView({ behavior: 'smooth' })}
                                aria-label={`Book appointment for ${service.title}`}
                            >
                                <CalendarDays size={14} /> Book Appointment
                            </button>
                        </article>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <div className="no-results">No services found. Try a different search or filter.</div>
                )}

                {/* Bottom CTA */}
                <div className="services-cta-wrap">
                    <p className="services-cta-headline">Book Your Pet's Health Check Today</p>
                    <p className="services-cta-text">Trusted Veterinary Hospital in Dehradun – Expert care for your beloved pets near Race Course.</p>
                    <div className="services-cta-btns">
                        <button className="btn btn-primary btn-lg" onClick={() => document.getElementById('appointment')?.scrollIntoView({ behavior: 'smooth' })} aria-label="Book appointment at PetCuro">
                            <CalendarDays size={18} /> Book Appointment
                        </button>
                        <a href="tel:+919084709800" className="btn btn-outline btn-lg" aria-label="Call PetCuro Hospital">
                            Call Us – +91 90847 09800
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
