import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="grid">
          <div className="col-3">
            <h4>About Little Lemon</h4>
            <p>
              Discover authentic Mediterranean cuisine in the heart of Chicago.
              Experience fresh flavors and warm hospitality.
            </p>
          </div>
          <div className="col-3">
            <h4>Hours</h4>
            <ul className="footer-list">
              <li>Mon - Thu: 11AM - 10PM</li>
              <li>Fri - Sat: 11AM - 11PM</li>
              <li>Sunday: 12PM - 10PM</li>
            </ul>
          </div>
          <div className="col-3">
            <h4>Contact</h4>
            <ul className="footer-list">
              <li>📞 (312) 555-LEMON</li>
              <li>📧 info@littlelemon.com</li>
              <li>📍 Chicago, IL</li>
            </ul>
          </div>
          <div className="col-3">
            <h4>Follow Us</h4>
            <ul className="footer-list footer-social">
              <li><a href="#facebook">Facebook</a></li>
              <li><a href="#instagram">Instagram</a></li>
              <li><a href="#twitter">Twitter</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-divider"></div>
        <div className="footer-bottom">
          <p>&copy; 2024 Little Lemon. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
