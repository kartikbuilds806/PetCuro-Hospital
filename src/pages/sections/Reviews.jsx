import React from 'react';
import './Reviews.css';

const reviews = [
    {
        name: 'Priya Sharma',
        location: 'Dehradun',
        time: 'Yesterday, 10:42 AM',
        text: 'Dr. Atul Uniyal is simply the best vet in Dehradun! My dog Bruno had a serious infection and PetCuro treated him so well. The staff is caring, the clinic is clean, and the treatment was very effective. Highly recommend this pet hospital near Race Course!',
        rating: 5,
        pet: '🐕 Dog Parent',
    },
    {
        name: 'Rahul Mehra',
        location: 'Rajpur Road, Dehradun',
        time: '2 days ago, 3:15 PM',
        text: 'Got my cat vaccinated at PetCuro Hospital. The experience was smooth and quick. Dr. Atul explained everything clearly and my cat Mittens felt very calm. Best cat clinic in Dehradun! Will definitely come back for regular check-ups.',
        rating: 5,
        pet: '🐱 Cat Parent',
    },
    {
        name: 'Sunita Rawat',
        location: 'Patel Nagar, Dehradun',
        time: '1 week ago',
        text: 'PetCuro performed surgery on my dog Sheru and the recovery has been fantastic! I was very worried but Dr. Uniyal and the team were so professional and reassuring throughout. Best dog surgery in Dehradun. Thank you so much PetCuro!',
        rating: 5,
        pet: '🐕 Dog Parent',
    },
    {
        name: 'Ankit Verma',
        location: 'Clement Town, Dehradun',
        time: '2 weeks ago',
        text: 'Amazing experience at PetCuro! Brought my rescue puppy for a full check-up, vaccination, and microchipping. The team was extremely gentle and loving. The best veterinary clinic near me in Dehradun. Very affordable and trustworthy!',
        rating: 5,
        pet: '🐕 Dog Parent',
    },
];

function StarRating({ rating }) {
    return (
        <div className="star-rating" aria-label={`${rating} out of 5 stars`}>
            {Array.from({ length: 5 }, (_, i) => (
                <span key={i} className={i < rating ? 'star filled' : 'star'} aria-hidden="true">★</span>
            ))}
        </div>
    );
}

export default function Reviews() {
    return (
        <section className="section-alt reviews-section" id="reviews" aria-labelledby="reviews-title">
            <div className="container">
                <div className="section-header">
                    <span className="section-label"><span>⭐</span> Reviews</span>
                    <h2 id="reviews-title" className="section-title">
                        What Pet Parents Say About PetCuro in Dehradun
                    </h2>
                    <p className="section-desc">
                        Trusted by hundreds of pet parents in Dehradun, Uttarakhand. Real stories from real families.
                    </p>
                </div>

                {/* Overall rating badge */}
                <div className="overall-rating">
                    <div className="rating-big">4.9</div>
                    <div className="rating-details">
                        <StarRating rating={5} />
                        <div className="rating-text">Based on 127+ reviews</div>
                        <div className="rating-sub">Google · WhatsApp · Word of Mouth</div>
                    </div>
                </div>

                <div className="reviews-grid">
                    {reviews.map((r, i) => (
                        <article key={i} className="review-bubble" aria-label={`Review by ${r.name}`}>
                            {/* WhatsApp-style header */}
                            <div className="review-header">
                                <div className="reviewer-avatar" aria-hidden="true">
                                    {r.name.charAt(0)}
                                </div>
                                <div>
                                    <div className="reviewer-name">{r.name}</div>
                                    <div className="reviewer-loc">📍 {r.location}</div>
                                </div>
                                <div className="review-time">{r.time}</div>
                            </div>

                            {/* Message bubble */}
                            <div className="review-message">
                                <p>{r.text}</p>
                                <div className="review-check" aria-hidden="true">✓✓</div>
                            </div>

                            {/* Footer */}
                            <div className="review-footer">
                                <StarRating rating={r.rating} />
                                <span className="review-pet">{r.pet}</span>
                            </div>
                        </article>
                    ))}
                </div>

                {/* CTA */}
                <div className="reviews-cta">
                    <p>Have a great experience? Share it with us!</p>
                    <a
                        href="https://wa.me/919084709800?text=Hi%20PetCuro!%20I%20would%20like%20to%20share%20my%20experience."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-whatsapp btn-lg"
                        aria-label="Share your review on WhatsApp"
                    >
                        Share Your Experience on WhatsApp
                    </a>
                </div>
            </div>
        </section>
    );
}
