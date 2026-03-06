import React from 'react';
import { Phone, Mail, MapPin, Instagram, Clock, Heart } from 'lucide-react';
import './Footer.css';

export default function Footer() {
    const services = [
        'Veterinarian Consultation', 'Pet Vaccination', 'Blood Tests & Diagnostics',
        'Soft Tissue Surgery', 'Dental Scaling', 'Grooming', 'X-Ray & Ultrasound'
    ];
    const phone = '919084709800';
    const waMsg = encodeURIComponent('Hi! I need information about PetCuro Hospital services.');

    return (
        <footer className="footer" role="contentinfo">
            <div className="container">
                <div className="footer-grid">
                    {/* Brand */}
                    <div className="footer-brand">
                        <div className="footer-logo">🐾 PetCuro</div>
                        <p className="footer-tagline">Hospital & Surgery (V-Care Pet Clinic)</p>
                        <p className="footer-desc">Trusted veterinary care in Dehradun, offering expert surgical care, advanced diagnostics, and compassionate treatment for your beloved pets.</p>
                        <div className="footer-social">
                            <a href="https://www.instagram.com/petcurohospital" target="_blank" rel="noopener noreferrer" aria-label="PetCuro Instagram">
                                <Instagram size={20} />
                            </a>
                            <a href={`https://wa.me/${phone}?text=${waMsg}`} target="_blank" rel="noopener noreferrer" aria-label="PetCuro WhatsApp">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                            </a>
                            <a href="tel:+919084709800" aria-label="Call PetCuro">
                                <Phone size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Services */}
                    <div className="footer-col">
                        <h3 className="footer-col-title">Our Services</h3>
                        <ul className="footer-links">
                            {services.map(s => <li key={s}><span className="footer-link-dot">•</span> {s} in Dehradun</li>)}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="footer-col">
                        <h3 className="footer-col-title">Contact Us</h3>
                        <div className="footer-contact-list">
                            <div className="footer-contact-item">
                                <MapPin size={16} />
                                <span>Ganpati Tower, G4 A, Guru Nanak Vihar, Race Course, Dehradun, Uttarakhand 248001</span>
                            </div>
                            <div className="footer-contact-item">
                                <Phone size={16} />
                                <a href="tel:+919084709800">+91 90847 09800</a>
                            </div>
                            <div className="footer-contact-item">
                                <Clock size={16} />
                                <span>Mon–Wed, Fri–Sun: 10 AM – 7 PM<br />Thursday: Doctor Holiday</span>
                            </div>
                        </div>
                    </div>

                    {/* Hours */}
                    <div className="footer-col">
                        <h3 className="footer-col-title">Clinic Hours</h3>
                        <table className="hours-table">
                            <tbody>
                                {[
                                    ['Monday', '10:00 AM – 7:00 PM'],
                                    ['Tuesday', '10:00 AM – 7:00 PM'],
                                    ['Wednesday', '10:00 AM – 7:00 PM'],
                                    ['Thursday', 'Doctor Holiday ❌'],
                                    ['Friday', '10:00 AM – 7:00 PM'],
                                    ['Saturday', '10:00 AM – 7:00 PM'],
                                    ['Sunday', '10:00 AM – 7:00 PM'],
                                ].map(([day, hrs]) => (
                                    <tr key={day} className={day === 'Thursday' ? 'holiday' : ''}>
                                        <td>{day}</td>
                                        <td>{hrs}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="footer-seo">Veterinary Hospital in Dehradun | Best Pet Clinic Near Race Course | PetCuro Hospital &amp; Surgery</p>
                    <p>© {new Date().getFullYear()} PetCuro Hospital and Surgery (V-Care Pet Clinic) – Veterinary Care in Dehradun. All Rights Reserved.</p>
                    <p className="footer-love">Made with <Heart size={14} style={{ display: 'inline', color: '#EF4444', verticalAlign: 'middle' }} /> for Pets</p>
                </div>
            </div>
        </footer>
    );
}
