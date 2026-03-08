import React from 'react';
import { CheckCircle2, Award, Heart, Stethoscope, AlertCircle, Users } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './About.css';

export default function About() {
    const imgRef = useScrollReveal();
    const contentRef = useScrollReveal();
    const highlights = [
        { icon: <Award size={18} />, text: 'Expert Veterinary Surgeon – Dr. Atul Uniyal' },
        { icon: <Heart size={18} />, text: 'Compassionate & ethical care for every pet' },
        { icon: <AlertCircle size={18} />, text: 'Emergency support available' },
        { icon: <Users size={18} />, text: 'Care for stray & rescued animals' },
        { icon: <Stethoscope size={18} />, text: 'Advanced diagnostics & modern equipment' },
        { icon: <CheckCircle2 size={18} />, text: 'Personalized treatment plans for every pet' },
    ];

    return (
        <section className="section about-section" id="about" aria-labelledby="about-title">
            <div className="container about-inner">
                {/* Left: Image */}
                <div className="about-image-col img-reveal" ref={imgRef}>
                    <div className="about-img-wrapper">
                        <img
                            src="/assets/download.jpg"
                            alt="Dr. Atul Uniyal – Veterinary Surgeon at PetCuro Hospital Dehradun"
                            className="about-img"
                        />
                        <div className="about-exp-card">
                            <div className="about-exp-value">Expert</div>
                            <div className="about-exp-label">Veterinary Surgeon</div>
                        </div>
                        <div className="about-trust-card">
                            <span className="trust-star">⭐⭐⭐⭐⭐</span>
                            <div>Trusted by 500+ Pet Parents</div>
                        </div>
                    </div>
                </div>

                {/* Right: Content */}
                <div className="about-content-col content-reveal" ref={contentRef}>
                    <span className="section-label">
                        <Heart size={14} /> About PetCuro
                    </span>

                    <h2 id="about-title" className="section-title">
                        Leading Veterinary Hospital in Dehradun
                    </h2>
                    <div className="divider"></div>

                    <p className="about-intro">
                        <strong>PetCuro Hospital and Surgery (V-Care Pet Clinic)</strong> is the best veterinary clinic in Dehradun, trusted by hundreds of pet parents near Race Course for advanced, compassionate veterinary care.
                    </p>

                    <p className="about-text">
                        Led by <strong>Dr. Atul Uniyal</strong>, a highly qualified <strong>Veterinary Surgeon</strong>, we offer a full spectrum of
                        pet health services — from routine check-ups and vaccinations to complex surgeries and emergency care.
                        Our clinic near Race Course, Dehradun, is equipped with modern diagnostic tools including in-house X-Ray,
                        ECG, and Ultrasound, ensuring accurate diagnosis and fast treatment for your beloved companions.
                    </p>

                    <p className="about-text">
                        We believe every pet deserves the best care. Whether it's your pampered dog, your cat, or a stray animal
                        in need — our doors are always open. We're more than a pet hospital near you; we're your pet's health partner.
                    </p>

                    <ul className="about-highlights" aria-label="Clinic highlights">
                        {highlights.map((h, i) => (
                            <li key={i} className="about-highlight-item">
                                <span className="hl-icon">{h.icon}</span>
                                <span>{h.text}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="about-doctor-card">
                        <div className="doctor-avatar" aria-hidden="true">👨‍⚕️</div>
                        <div>
                            <div className="doctor-name">Dr. Atul Uniyal</div>
                            <div className="doctor-title">Veterinary Surgeon, PetCuro Hospital & Surgery</div>
                            <div className="doctor-location">📍 Race Course, Dehradun, Uttarakhand</div>
                        </div>
                    </div>

                    <a href="tel:+919084709800" className="btn btn-primary btn-lg" aria-label="Book consultation with Dr. Atul Uniyal">
                        Book Your Pet's Health Check Today
                    </a>
                    <p className="about-cta-sub">Trusted Veterinary Hospital in Dehradun – Near Race Course</p>
                </div>
            </div>
        </section>
    );
}
