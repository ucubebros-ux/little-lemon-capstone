/**
 * Booking utility functions for managing available times
 * Uses fetchAPI and submitAPI window functions
 */

/**
 * Initialize available times for a given date
 * @param {string} selectedDate - The selected date in YYYY-MM-DD format
 * @returns {string[]} Array of available time slots
 */
export const initializeTimes = (selectedDate = null) => {
  const date = selectedDate || new Date().toISOString().split('T')[0];
  
  // Check if fetchAPI is available (provided by the testing framework)
  if (typeof window !== 'undefined' && window.fetchAPI) {
    return window.fetchAPI(date);
  }
  
  // Fallback default times
  return [
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'
  ];
};

/**
 * Update available times based on selected date
 * Reducer function for useReducer hook
 * @param {string[]} state - Current available times
 * @param {object} action - Action object with type and payload
 * @returns {string[]} Updated available times
 */
export const updateTimes = (state, action) => {
  switch (action.type) {
    case 'UPDATE_TIMES':
      return action.payload || initializeTimes(action.date);
    default:
      return state;
  }
};

/**
 * Submit booking form data
 * Uses the submitAPI window function
 * @param {object} formData - Booking form data
 * @returns {boolean} Success status
 */
export const submitBooking = (formData) => {
  if (typeof window !== 'undefined' && window.submitAPI) {
    return window.submitAPI(formData);
  }
  
  // Fallback: log and return true
  console.log('Booking submitted:', formData);
  return true;
};

/**
 * Generate time slots for the booking form
 * @returns {string[]} Array of time strings in HH:MM format
 */
export const getTimeSlots = () => {
  const slots = [];
  for (let hour = 17; hour < 22; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      slots.push(timeString);
    }
  }
  return slots;
};
