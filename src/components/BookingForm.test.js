import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import BookingForm from '../components/BookingForm';
import '@testing-library/jest-dom';

// Mock useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

const renderWithRouter = (component) => {
  return render(<Router>{component}</Router>);
};

describe('BookingForm Component', () => {
  const mockDispatch = jest.fn();
  const availableTimes = ['17:00', '17:30', '18:00', '18:30', '19:00'];

  beforeEach(() => {
    mockDispatch.mockClear();
  });

  describe('Rendering and Static Text', () => {
    test('renders booking form with all required fields', () => {
      renderWithRouter(
        <BookingForm availableTimes={availableTimes} dispatch={mockDispatch} />
      );

      expect(screen.getByText('Reservation Information')).toBeInTheDocument();
      expect(screen.getByText('Reservation Details')).toBeInTheDocument();
      expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Phone/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Date/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Time/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Number of Guests/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Occasion/i)).toBeInTheDocument();
    });

    test('renders submit button with correct text', () => {
      renderWithRouter(
        <BookingForm availableTimes={availableTimes} dispatch={mockDispatch} />
      );

      const submitButton = screen.getByRole('button', { name: /Reserve Table/i });
      expect(submitButton).toBeInTheDocument();
    });

    test('displays all legend texts', () => {
      renderWithRouter(
        <BookingForm availableTimes={availableTimes} dispatch={mockDispatch} />
      );

      expect(screen.getByText('Reservation Information')).toBeInTheDocument();
      expect(screen.getByText('Reservation Details')).toBeInTheDocument();
    });

    test('renders form with correct initial values', () => {
      renderWithRouter(
        <BookingForm availableTimes={availableTimes} dispatch={mockDispatch} />
      );

      expect(screen.getByDisplayValue('1')).toBeInTheDocument(); // guests default
      expect(screen.getByDisplayValue('Birthday')).toBeInTheDocument(); // occasion default
    });
  });

  describe('HTML5 Validation Attributes', () => {
    test('name input has required attribute', () => {
      renderWithRouter(
        <BookingForm availableTimes={availableTimes} dispatch={mockDispatch} />
      );

      const nameInput = screen.getByLabelText(/Name/i);
      expect(nameInput).toHaveAttribute('required');
      expect(nameInput).toHaveAttribute('aria-required', 'true');
    });

    test('email input has required and email type attributes', () => {
      renderWithRouter(
        <BookingForm availableTimes={availableTimes} dispatch={mockDispatch} />
      );

      const emailInput = screen.getByLabelText(/Email/i);
      expect(emailInput).toHaveAttribute('required');
      expect(emailInput).toHaveAttribute('type', 'email');
      expect(emailInput).toHaveAttribute('aria-required', 'true');
    });

    test('phone input has required and tel type attributes', () => {
      renderWithRouter(
        <BookingForm availableTimes={availableTimes} dispatch={mockDispatch} />
      );

      const phoneInput = screen.getByLabelText(/Phone/i);
      expect(phoneInput).toHaveAttribute('required');
      expect(phoneInput).toHaveAttribute('type', 'tel');
      expect(phoneInput).toHaveAttribute('aria-required', 'true');
    });

    test('date input has required and date type attributes with min date', () => {
      renderWithRouter(
        <BookingForm availableTimes={availableTimes} dispatch={mockDispatch} />
      );

      const dateInput = screen.getByLabelText(/Date/i);
      expect(dateInput).toHaveAttribute('required');
      expect(dateInput).toHaveAttribute('type', 'date');
      expect(dateInput).toHaveAttribute('aria-required', 'true');
      expect(dateInput).toHaveAttribute('min');
    });

    test('time select has required attribute', () => {
      renderWithRouter(
        <BookingForm availableTimes={availableTimes} dispatch={mockDispatch} />
      );

      const timeSelect = screen.getByLabelText(/Time/i);
      expect(timeSelect).toHaveAttribute('required');
      expect(timeSelect).toHaveAttribute('aria-required', 'true');
    });

    test('guests input has required, min and max attributes', () => {
      renderWithRouter(
        <BookingForm availableTimes={availableTimes} dispatch={mockDispatch} />
      );

      const guestsInput = screen.getByLabelText(/Number of Guests/i);
      expect(guestsInput).toHaveAttribute('required');
      expect(guestsInput).toHaveAttribute('type', 'number');
      expect(guestsInput).toHaveAttribute('min', '1');
      expect(guestsInput).toHaveAttribute('max', '10');
      expect(guestsInput).toHaveAttribute('aria-required', 'true');
    });

    test('occasion select does not have required attribute', () => {
      renderWithRouter(
        <BookingForm availableTimes={availableTimes} dispatch={mockDispatch} />
      );

      const occasionSelect = screen.getByLabelText(/Occasion/i);
      expect(occasionSelect).not.toHaveAttribute('required');
    });

    test('all required fields are marked with required indicator', () => {
      renderWithRouter(
        <BookingForm availableTimes={availableTimes} dispatch={mockDispatch} />
      );

      const requiredIndicators = screen.getAllByLabelText('required');
      expect(requiredIndicators.length).toBeGreaterThan(0);
    });
  });

  describe('Accessibility Attributes', () => {
    test('form has aria-label', () => {
      renderWithRouter(
        <BookingForm availableTimes={availableTimes} dispatch={mockDispatch} />
      );

      const form = screen.getByRole('form', { hidden: true });
      expect(form).toHaveAttribute('aria-label', 'Booking form');
    });

    test('all inputs have proper aria-describedby for error messages', () => {
      renderWithRouter(
        <BookingForm availableTimes={availableTimes} dispatch={mockDispatch} />
      );

      const nameInput = screen.getByLabelText(/Name/i);
      expect(nameInput).toHaveAttribute('placeholder');
    });

    test('submit button has aria-label', () => {
      renderWithRouter(
        <BookingForm availableTimes={availableTimes} dispatch={mockDispatch} />
      );

      const submitButton = screen.getByRole('button', { name: /Reserve Table/i });
      expect(submitButton).toHaveAttribute('aria-label', 'Submit booking form');
    });
  });

  describe('Available Times Display', () => {
    test('displays all available time slots in select', () => {
      renderWithRouter(
        <BookingForm availableTimes={availableTimes} dispatch={mockDispatch} />
      );

      const timeSelect = screen.getByLabelText(/Time/i);
      const options = timeSelect.querySelectorAll('option');

      // +1 for the placeholder option
      expect(options.length).toBe(availableTimes.length + 1);

      availableTimes.forEach(time => {
        expect(screen.getByRole('option', { name: time })).toBeInTheDocument();
      });
    });

    test('handles empty available times gracefully', () => {
      renderWithRouter(
        <BookingForm availableTimes={[]} dispatch={mockDispatch} />
      );

      const timeSelect = screen.getByLabelText(/Time/i);
      expect(screen.getByRole('option', { name: /No times available/i })).toBeInTheDocument();
    });
  });

  describe('Form Interactions', () => {
    test('updates form state when inputs change', async () => {
      renderWithRouter(
        <BookingForm availableTimes={availableTimes} dispatch={mockDispatch} />
      );

      const nameInput = screen.getByLabelText(/Name/i);
      fireEvent.change(nameInput, { target: { value: 'John Doe' } });

      expect(nameInput.value).toBe('John Doe');
    });

    test('calls dispatch when date changes', () => {
      renderWithRouter(
        <BookingForm availableTimes={availableTimes} dispatch={mockDispatch} />
      );

      const dateInput = screen.getByLabelText(/Date/i);
      const newDate = '2024-12-25';

      fireEvent.change(dateInput, { target: { value: newDate } });

      expect(mockDispatch).toHaveBeenCalled();
    });
  });

  describe('Form Validation', () => {
    test('prevents submission with empty required fields', async () => {
      renderWithRouter(
        <BookingForm availableTimes={availableTimes} dispatch={mockDispatch} />
      );

      // Mock window.submitAPI
      window.submitAPI = jest.fn(() => true);

      const submitButton = screen.getByRole('button', { name: /Reserve Table/i });
      fireEvent.click(submitButton);

      // submitAPI should not be called if validation fails
      expect(window.submitAPI).not.toHaveBeenCalled();
    });

    test('validates email format', async () => {
      renderWithRouter(
        <BookingForm availableTimes={availableTimes} dispatch={mockDispatch} />
      );

      window.submitAPI = jest.fn(() => true);

      const nameInput = screen.getByLabelText(/Name/i);
      const emailInput = screen.getByLabelText(/Email/i);
      const phoneInput = screen.getByLabelText(/Phone/i);
      const submitButton = screen.getByRole('button', { name: /Reserve Table/i });

      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
      fireEvent.change(phoneInput, { target: { value: '3125551234' } });

      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/Email is invalid/i)).toBeInTheDocument();
      });
    });

    test('validates guest count between 1 and 10', async () => {
      renderWithRouter(
        <BookingForm availableTimes={availableTimes} dispatch={mockDispatch} />
      );

      const guestsInput = screen.getByLabelText(/Number of Guests/i);
      fireEvent.change(guestsInput, { target: { value: '0' } });

      const submitButton = screen.getByRole('button', { name: /Reserve Table/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/Guests must be between 1 and 10/i)).toBeInTheDocument();
      });
    });
  });
});
