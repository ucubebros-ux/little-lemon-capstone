import React from 'react';
import BookingForm from '../components/BookingForm';
import './BookingPage.css';

function BookingPage({ availableTimes, dispatch }) {
  return (
    <section className="booking-page">
      <div className="container">
        <div className="booking-header">
          <h1>Reserve Your Table</h1>
          <p>
            Join us for an unforgettable Mediterranean dining experience. 
            Book your table today!
          </p>
        </div>

        <div className="booking-content">
          <BookingForm availableTimes={availableTimes} dispatch={dispatch} />
        </div>

        <div className="booking-info">
          <div className="info-box">
            <h3>📞 Call Us</h3>
            <p>(312) 555-LEMON</p>
          </div>
          <div className="info-box">
            <h3>📍 Visit Us</h3>
            <p>Chicago, Illinois</p>
          </div>
          <div className="info-box">
            <h3>🕐 Hours</h3>
            <p>Mon-Sun: 5:00 PM - 10:00 PM</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BookingPage;
