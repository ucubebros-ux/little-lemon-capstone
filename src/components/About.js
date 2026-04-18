import React from 'react';
import './About.css';

function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="grid">
          <div className="col-6 about-content">
            <h2>About Little Lemon</h2>
            <p>
              Little Lemon is a charming Mediterranean restaurant located in the heart of Chicago. 
              Our mission is to bring authentic Mediterranean cuisine and warm hospitality to our community.
            </p>
            <p>
              Founded in 2020, Little Lemon has quickly become a favorite destination for families, 
              friends, and business colleagues seeking exceptional food and a welcoming atmosphere.
            </p>
            <h3>Our Story</h3>
            <p>
              From humble beginnings, our founders envisioned a space where traditional Mediterranean 
              recipes could be prepared with the finest ingredients. Today, we proudly serve our community 
              with the same passion and dedication that started it all.
            </p>
            <div className="about-highlights">
              <div className="highlight">
                <span className="highlight-number">500+</span>
                <span className="highlight-label">Happy Customers Weekly</span>
              </div>
              <div className="highlight">
                <span className="highlight-number">4.8★</span>
                <span className="highlight-label">Average Rating</span>
              </div>
              <div className="highlight">
                <span className="highlight-number">50+</span>
                <span className="highlight-label">Menu Items</span>
              </div>
            </div>
          </div>
          <div className="col-6 about-image">
            <div className="about-placeholder">
              🏛️ Mediterranean Heritage
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
