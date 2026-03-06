import React from 'react';
import { Phone, MessageCircle, CalendarDays, ChevronDown, Star, Award, Shield } from 'lucide-react';
import './Hero.css';

export default function Hero() {
    const waUrl = `https://wa.me/919084709800?text=${encodeURIComponent('Hi! I would like to book an appointment at PetCuro Hospital.')}`;

    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    const stats = [
        { value: '500+', label: 'Pets Treated' },
        { value: '5★', label: 'Rated Clinic' },
        { value: '7 Days', label: 'Open Weekly' },
        { value: '10+ Yrs', label: 'Experience' },
    ];

    return (
        <section className="hero" id="hero" aria-labelledby="hero-title">
            {/* Background decorations */}
            <div className="hero-blob hero-blob-1" aria-hidden="true"></div>
            <div className="hero-blob hero-blob-2" aria-hidden="true"></div>

            <div className="container hero-inner">
                {/* Left Content */}
                <div className="hero-content">
                    <div className="hero-badge" aria-label="Location">
                        <span className="hero-badge-dot"></span>
                        Best Veterinary Hospital in Dehradun
                    </div>

                    <h1 id="hero-title" className="hero-title">
                        Veterinary Hospital in Dehradun –
                        <span className="hero-title-highlight"> PetCuro Hospital</span>
                    </h1>

                    <p className="hero-desc">
                        Expert veterinary care, advanced diagnostics, surgery, and compassionate treatment for dogs, cats, and rescued animals. Trusted by hundreds of pet parents across Dehradun and Uttarakhand.
                    </p>

                    {/* CTA Buttons */}
                    <div className="hero-ctas">
                        <button className="btn btn-primary btn-lg" onClick={() => scrollToSection('appointment')} aria-label="Book an appointment at PetCuro">
                            <CalendarDays size={20} />
                            Book Appointment
                        </button>
                        <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-lg" aria-label="WhatsApp PetCuro Hospital">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                            WhatsApp Now
                        </a>
                        <a href="tel:+919084709800" className="btn btn-outline btn-lg" aria-label="Call PetCuro Hospital now">
                            <Phone size={20} />
                            Call Now
                        </a>
                    </div>

                    {/* Trust badges */}
                    <div className="hero-trust">
                        <div className="trust-pill"><Shield size={14} /> Emergency Support</div>
                        <div className="trust-pill"><Award size={14} /> Expert Surgeon</div>
                        <div className="trust-pill"><Star size={14} fill="currentColor" /> 4.9 Rated</div>
                    </div>
                </div>

                {/* Right Visual */}
                <div className="hero-visual" aria-hidden="true">
                    <div className="hero-image-wrapper">
                        <div className="hero-image-card">
                            <img src="/assets/hospital.jpg" alt="PetCuro veterinary hospital in Dehradun – modern clean facility" className="hero-img" />
                            <div className="hero-img-badge hero-img-badge-1">
                                <span className="badge-emoji">🐕</span>
                                <div>
                                    <div className="badge-title">Expert Dog Care</div>
                                    <div className="badge-sub">in Dehradun</div>
                                </div>
                            </div>
                            <div className="hero-img-badge hero-img-badge-2">
                                <span className="badge-emoji">🐱</span>
                                <div>
                                    <div className="badge-title">Cat Clinic</div>
                                    <div className="badge-sub">Near You</div>
                                </div>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="hero-stats">
                            {stats.map(s => (
                                <div key={s.label} className="hero-stat-item">
                                    <div className="stat-value">{s.value}</div>
                                    <div className="stat-label">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <button className="scroll-indicator" onClick={() => scrollToSection('about')} aria-label="Scroll to about section">
                <ChevronDown size={24} />
            </button>
        </section>
    );
}
