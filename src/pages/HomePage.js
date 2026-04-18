import React from 'react';
import Hero from '../components/Hero';
import Specials from '../components/Specials';
import Testimonials from '../components/Testimonials';
import About from '../components/About';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-page">
      <Hero />
      <Specials />
      <Testimonials />
      <About />
    </div>
  );
}

export default HomePage;
