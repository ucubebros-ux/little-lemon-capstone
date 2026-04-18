import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './ConfirmedBooking.css';

function ConfirmedBooking() {
  const location = useLocation();
  const bookingData = location.state?.bookingData || {};

  return (
    <section className="confirmed-booking">
      <div className="container">
        <div className="confirmation-card">
          <div className="confirmation-icon">
            ✓
          </div>
          <h1>Booking Confirmed!</h1>
          <p className="confirmation-message">
            Thank you for your reservation. We're looking forward to serving you!
          </p>

          {bookingData && Object.keys(bookingData).length > 0 ? (
            <div className="booking-details">
              <h2>Your Reservation Details</h2>
              <div className="details-grid">
                <div className="detail-item">
                  <span className="detail-label">Name:</span>
                  <span className="detail-value">{bookingData.name}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Email:</span>
                  <span className="detail-value">{bookingData.email}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Phone:</span>
                  <span className="detail-value">{bookingData.phone}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Date:</span>
                  <span className="detail-value">
                    {new Date(bookingData.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Time:</span>
                  <span className="detail-value">{bookingData.time}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Guests:</span>
                  <span className="detail-value">{bookingData.guests}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Occasion:</span>
                  <span className="detail-value">{bookingData.occasion}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="no-details">
              <p>Booking details will appear here when you complete a reservation.</p>
            </div>
          )}

          <div className="confirmation-actions">
            <Link to="/" className="btn btn-primary">
              Back to Home
            </Link>
            <Link to="/booking" className="btn btn-secondary">
              Make Another Reservation
            </Link>
          </div>

          <div className="confirmation-footer">
            <p>
              A confirmation email has been sent to <strong>{bookingData.email}</strong>
            </p>
            <p>
              If you need to modify your reservation, please call us at 
              <strong> (312) 555-LEMON</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ConfirmedBooking;
