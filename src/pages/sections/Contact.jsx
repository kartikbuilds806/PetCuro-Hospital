import React from 'react';
import { MapPin, Phone, Clock, Instagram, MessageSquare } from 'lucide-react';
import './Contact.css';

const hours = [
    ['Monday', '10:00 AM – 7:00 PM', false],
    ['Tuesday', '10:00 AM – 7:00 PM', false],
    ['Wednesday', '10:00 AM – 7:00 PM', false],
    ['Thursday', '10:00 AM – 7:00 PM', false],
    ['Friday', '10:00 AM – 7:00 PM', false],
    ['Saturday', '10:00 AM – 7:00 PM', false],
    ['Sunday', '10:00 AM – 7:00 PM', false],
];

export default function Contact() {
    const waUrl = `https://wa.me/919084709800?text=${encodeURIComponent('Hi PetCuro! I need help with my pet.')}`;

    return (
        <section className="section contact-section" id="contact" aria-labelledby="contact-title">
            <div className="container">
                <div className="section-header">
                    <span className="section-label"><MapPin size={14} /> Find Us</span>
                    <h2 id="contact-title" className="section-title">
                        Veterinary Hospital Near You in Dehradun
                    </h2>
                    <p className="section-desc">
                        We're conveniently located near Race Course, Dehradun — your trusted pet hospital near me for all veterinary needs in Uttarakhand.
                    </p>
                </div>

                <div className="contact-grid">
                    {/* Map */}
                    <div className="map-wrapper">
                        <iframe
                            title="PetCuro Hospital location on Google Maps – Race Course Dehradun"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3444.2!2d78.0407!3d30.3165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDE5JzA0LjAiTiA3OMKwMDInMjQuMiJF!5e0!3m2!1sen!2sin!4v1680000000&q=Ganpati+Tower,+Race+Course,+Dehradun"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            aria-label="Google Maps showing PetCuro Hospital location in Race Course Dehradun"
                        />
                    </div>

                    {/* Info */}
                    <div className="contact-info">
                        {/* Address */}
                        <div className="contact-card">
                            <div className="contact-card-icon" aria-hidden="true"><MapPin size={22} /></div>
                            <div>
                                <h3 className="contact-card-title">Our Address</h3>
                                <p className="contact-card-text">Ganpati Tower, G4 A, Guru Nanak Vihar, Race Course, Dehradun, Uttarakhand 248001</p>
                                <a href="https://maps.google.com/?q=Ganpati+Tower+Race+Course+Dehradun" target="_blank" rel="noopener noreferrer" className="contact-card-link">Open in Google Maps →</a>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="contact-card">
                            <div className="contact-card-icon" aria-hidden="true"><Phone size={22} /></div>
                            <div>
                                <h3 className="contact-card-title">Phone & WhatsApp</h3>
                                <a href="tel:+919084709800" className="contact-phone">+91 90847 09800</a>
                                <p className="contact-card-text" style={{ marginTop: 4 }}>Available Mon–Sun (except Thursday)</p>
                            </div>
                        </div>

                        {/* Social */}
                        <div className="contact-card">
                            <div className="contact-card-icon contact-card-icon-green" aria-hidden="true"><Instagram size={22} /></div>
                            <div>
                                <h3 className="contact-card-title">Follow Us on Instagram</h3>
                                <a href="https://www.instagram.com/petcurohospital" target="_blank" rel="noopener noreferrer" className="contact-card-link">@petcurohospital</a>
                                <p className="contact-card-text" style={{ marginTop: 4 }}>Pet care tips, stories & updates</p>
                            </div>
                        </div>

                        {/* Hours Table */}
                        <div className="contact-hours">
                            <div className="contact-hours-header">
                                <Clock size={18} /> Business Hours
                            </div>
                            <table className="hours-table-contact">
                                <tbody>
                                    {hours.map(([day, time, holiday]) => (
                                        <tr key={day} className={holiday ? 'holiday' : ''}>
                                            <td>{day}</td>
                                            <td>{holiday ? '❌ ' : '✅ '}{time}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* CTA Buttons */}
                        <div className="contact-btns">
                            <a href="tel:+919084709800" className="btn btn-primary" aria-label="Call PetCuro Hospital">
                                <Phone size={18} /> Call Now
                            </a>
                            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp" aria-label="WhatsApp PetCuro">
                                <MessageSquare size={18} /> WhatsApp Us
                            </a>
                        </div>
                    </div>
                </div>

                {/* Emergency Banner */}
                <div className="emergency-banner" role="alert" aria-live="polite">
                    <div className="emergency-icon" aria-hidden="true">🚨</div>
                    <div>
                        <strong>Pet Emergency?</strong> Don't wait! Call us immediately at <a href="tel:+919084709800">+91 90847 09800</a> — Emergency veterinary support in Dehradun.
                    </div>
                </div>
            </div>
        </section>
    );
}
