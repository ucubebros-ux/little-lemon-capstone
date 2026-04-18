import React from 'react';
import './Testimonials.css';

function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Food Critic',
      text: 'Exceptional Mediterranean cuisine with authentic flavors. The service is impeccable!',
      rating: 5
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Regular Customer',
      text: 'A hidden gem in Chicago! Best place for a romantic dinner. Highly recommended!',
      rating: 5
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Chef',
      text: 'The quality of ingredients is outstanding. This is real Mediterranean cooking.',
      rating: 5
    },
    {
      id: 4,
      name: 'David Thompson',
      role: 'Business Traveler',
      text: 'Perfect spot for business lunch. Great atmosphere and delicious food.',
      rating: 5
    }
  ];

  return (
    <section className="testimonials">
      <div className="container">
        <h2>What Our Customers Say</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="star">⭐</span>
                ))}
              </div>
              <p className="testimonial-text">"{testimonial.text}"</p>
              <div className="testimonial-author">
                <strong>{testimonial.name}</strong>
                <p className="testimonial-role">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
