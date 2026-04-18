import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="grid">
          <div className="col-6 hero-content">
            <h2>Welcome to Little Lemon</h2>
            <p className="hero-subtitle">
              Discover authentic Mediterranean cuisine in the heart of Chicago. 
              From traditional recipes to innovative dishes, we bring you the 
              flavors of the Mediterranean.
            </p>
            <Link to="/booking" className="btn btn-primary">
              Reserve Your Table
            </Link>
          </div>
          <div className="col-6 hero-image">
            <div className="hero-placeholder">
              🍋 Mediterranean Flavors
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
