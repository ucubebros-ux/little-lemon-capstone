// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

/**
 * Mock functions for testing booking functionality
 * These are the window functions expected by the booking utilities
 */

// Mock fetchAPI - returns available times for a given date
window.fetchAPI = jest.fn((date) => {
  const defaultTimes = [
    '17:00', '17:30', '18:00', '18:30', '19:00',
    '19:30', '20:00', '20:30', '21:00'
  ];
  return defaultTimes;
});

// Mock submitAPI - submits booking data
window.submitAPI = jest.fn((data) => {
  return true;
});
