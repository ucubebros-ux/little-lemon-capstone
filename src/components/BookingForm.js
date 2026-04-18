import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitBooking } from '../utils/bookingUtils';
import './BookingForm.css';

function BookingForm({ availableTimes, dispatch }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    time: availableTimes.length > 0 ? availableTimes[0] : '17:00',
    guests: 1,
    occasion: 'Birthday',
    name: '',
    email: '',
    phone: ''
  });

  const [errors, setErrors] = useState({});

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setFormData(prev => ({
      ...prev,
      date: selectedDate
    }));
    
    // Update available times
    if (dispatch) {
      dispatch({
        type: 'UPDATE_TIMES',
        date: selectedDate,
        payload: availableTimes
      });
    }
  };

  const handleTimeChange = (e) => {
    setFormData(prev => ({
      ...prev,
      time: e.target.value
    }));
  };

  const handleGuestsChange = (e) => {
    setFormData(prev => ({
      ...prev,
      guests: parseInt(e.target.value)
    }));
  };

  const handleOccasionChange = (e) => {
    setFormData(prev => ({
      ...prev,
      occasion: e.target.value
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$|^\d{3}-\d{3}-\d{4}$|^\(\d{3}\)\s\d{3}-\d{4}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number is invalid';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    if (!formData.time) {
      newErrors.time = 'Time is required';
    }

    if (formData.guests < 1 || formData.guests > 10) {
      newErrors.guests = 'Guests must be between 1 and 10';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const bookingData = {
      date: formData.date,
      time: formData.time,
      guests: formData.guests,
      occasion: formData.occasion,
      name: formData.name,
      email: formData.email,
      phone: formData.phone
    };

    const result = submitBooking(bookingData);

    if (result) {
      // Navigate to confirmed booking page
      navigate('/confirmed', { state: { bookingData } });
    } else {
      setErrors({ submit: 'Booking submission failed. Please try again.' });
    }
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit} aria-label="Booking form">
      <fieldset>
        <legend>Reservation Information</legend>

        <div className="form-group">
          <label htmlFor="name">
            Name
            <span className="required" aria-label="required">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            aria-required="true"
            aria-describedby={errors.name ? 'name-error' : undefined}
            placeholder="Your full name"
          />
          {errors.name && <span className="error-message" id="name-error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">
            Email
            <span className="required" aria-label="required">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            aria-required="true"
            aria-describedby={errors.email ? 'email-error' : undefined}
            placeholder="your.email@example.com"
          />
          {errors.email && <span className="error-message" id="email-error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">
            Phone
            <span className="required" aria-label="required">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            aria-required="true"
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            placeholder="(312) 555-1234"
          />
          {errors.phone && <span className="error-message" id="phone-error">{errors.phone}</span>}
        </div>
      </fieldset>

      <fieldset>
        <legend>Reservation Details</legend>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date">
              Date
              <span className="required" aria-label="required">*</span>
            </label>
            <input
              type="date"
              id="date"
              value={formData.date}
              onChange={handleDateChange}
              required
              aria-required="true"
              aria-describedby={errors.date ? 'date-error' : undefined}
              min={new Date().toISOString().split('T')[0]}
            />
            {errors.date && <span className="error-message" id="date-error">{errors.date}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="time">
              Time
              <span className="required" aria-label="required">*</span>
            </label>
            <select
              id="time"
              value={formData.time}
              onChange={handleTimeChange}
              required
              aria-required="true"
              aria-describedby={errors.time ? 'time-error' : undefined}
            >
              <option value="">Select a time</option>
              {availableTimes && availableTimes.length > 0 ? (
                availableTimes.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))
              ) : (
                <option value="">No times available</option>
              )}
            </select>
            {errors.time && <span className="error-message" id="time-error">{errors.time}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="guests">
              Number of Guests
              <span className="required" aria-label="required">*</span>
            </label>
            <input
              type="number"
              id="guests"
              value={formData.guests}
              onChange={handleGuestsChange}
              required
              aria-required="true"
              aria-describedby={errors.guests ? 'guests-error' : undefined}
              min="1"
              max="10"
            />
            {errors.guests && <span className="error-message" id="guests-error">{errors.guests}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="occasion">
              Occasion
            </label>
            <select
              id="occasion"
              value={formData.occasion}
              onChange={handleOccasionChange}
              aria-label="Select occasion"
            >
              <option value="Birthday">Birthday</option>
              <option value="Anniversary">Anniversary</option>
              <option value="Business">Business Dinner</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
      </fieldset>

      {errors.submit && (
        <div className="error-alert" role="alert">
          {errors.submit}
        </div>
      )}

      <button
        type="submit"
        className="btn btn-primary btn-submit"
        aria-label="Submit booking form"
      >
        Reserve Table
      </button>
    </form>
  );
}

export default BookingForm;
