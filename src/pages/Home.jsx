import React, { useState } from 'react';
import Hero from './sections/Hero.jsx';
import About from './sections/About.jsx';
import Services from './sections/Services.jsx';
import WhyChooseUs from './sections/WhyChooseUs.jsx';
import Reviews from './sections/Reviews.jsx';
import Appointment from './sections/Appointment.jsx';
import Enquiry from './sections/Enquiry.jsx';
import Contact from './sections/Contact.jsx';

export default function Home() {
    return (
        <main id="main" role="main">
            <Hero />
            <About />
            <Services />
            <WhyChooseUs />
            <Reviews />
            <Appointment />
            <Enquiry />
            <Contact />
        </main>
    );
}
