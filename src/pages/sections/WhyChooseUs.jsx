import React from 'react';
import { User, Microscope, Clock, Sparkles, Heart, MapPin } from 'lucide-react';
import './WhyChooseUs.css';

const reasons = [
    {
        icon: <User size={28} />,
        emoji: '👨‍⚕️',
        title: 'Experienced Veterinary Surgeon in Dehradun',
        desc: 'Dr. Atul Uniyal brings expert surgical skills and compassionate care to every patient. Your pets are in the safest hands.',
        color: 'blue',
    },
    {
        icon: <Microscope size={28} />,
        emoji: '🔬',
        title: 'Advanced Diagnostics & Modern Equipment',
        desc: 'In-house X-Ray, ECG, Ultrasound, blood tests and more — everything your pet needs for accurate diagnosis, right here in Dehradun.',
        color: 'green',
    },
    {
        icon: <Clock size={28} />,
        emoji: '⏰',
        title: 'Emergency & Support Available',
        desc: 'Unexpected health issue? PetCuro is here for you. Emergency veterinary support available in Dehradun. Call +91 90847 09800.',
        color: 'orange',
    },
    {
        icon: <Sparkles size={28} />,
        emoji: '✨',
        title: 'Clean & Hygienic Facility',
        desc: "Our veterinary hospital near Race Course, Dehradun, maintains the highest hygiene standards. Your pet's safety is our top priority.",
        color: 'purple',
    },
    {
        icon: <Heart size={28} />,
        emoji: '❤️',
        title: 'Compassionate Care for Every Pet',
        desc: 'We treat every pet like our own — with love, patience, and expert care. Trusted by hundreds of pet parents in Dehradun.',
        color: 'pink',
    },
    {
        icon: <MapPin size={28} />,
        emoji: '📍',
        title: 'Conveniently Located Near You',
        desc: 'Easily accessible at Race Course, Dehradun — your go-to pet hospital near you for all veterinary needs.',
        color: 'blue',
    },
];

export default function WhyChooseUs() {
    return (
        <section className="section why-section" id="why-us" aria-labelledby="why-title">
            <div className="container">
                <div className="why-top">
                    <div className="why-header">
                        <span className="section-label"><Heart size={14} /> Why PetCuro</span>
                        <h2 id="why-title" className="section-title">
                            Why Choose PetCuro – The Best Pet Clinic Near You in Dehradun?
                        </h2>
                        <p className="section-desc">
                            Trusted by hundreds of pet parents in Dehradun, PetCuro combines surgical expertise, modern equipment, and genuine love for animals.
                        </p>
                    </div>
                    <div className="why-quote">
                        <blockquote>
                            "Every pet deserves the best care. At PetCuro, we treat your animals like family."
                        </blockquote>
                        <cite>– Dr. Atul Uniyal, Veterinary Surgeon</cite>
                    </div>
                </div>

                <div className="why-grid">
                    {reasons.map((r, i) => (
                        <article key={i} className={`why-card why-card-${r.color}`} aria-label={r.title}>
                            <div className="why-emoji" aria-hidden="true">{r.emoji}</div>
                            <div className="why-num" aria-hidden="true">0{i + 1}</div>
                            <h3 className="why-card-title">{r.title}</h3>
                            <p className="why-card-desc">{r.desc}</p>
                        </article>
                    ))}
                </div>

                <div className="why-bottom-cta">
                    <p>"Trusted by hundreds of pet parents in Dehradun — <strong>book your pet's health check today!</strong>"</p>
                    <div className="why-bottom-btns">
                        <button className="btn btn-primary btn-lg" onClick={() => document.getElementById('appointment')?.scrollIntoView({ behavior: 'smooth' })} aria-label="Book health check appointment">
                            Book Health Check
                        </button>
                        <a href="tel:+919084709800" className="btn btn-outline btn-lg">
                            Call +91 90847 09800
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
