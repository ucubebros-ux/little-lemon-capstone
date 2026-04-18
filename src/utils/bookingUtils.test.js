import { initializeTimes, updateTimes, submitBooking, getTimeSlots } from '../utils/bookingUtils';

describe('Booking Utils - initializeTimes', () => {
  afterEach(() => {
    delete window.fetchAPI;
  });

  test('should return default times when fetchAPI is not available', () => {
    const result = initializeTimes();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toMatch(/^\d{2}:\d{2}$/);
  });

  test('should call window.fetchAPI if available', () => {
    const mockFetchAPI = jest.fn(() => ['18:00', '19:00', '20:00']);
    window.fetchAPI = mockFetchAPI;

    const result = initializeTimes('2024-12-25');

    expect(mockFetchAPI).toHaveBeenCalledWith('2024-12-25');
    expect(result).toEqual(['18:00', '19:00', '20:00']);
  });

  test('should use today date if no date is provided', () => {
    const mockFetchAPI = jest.fn(() => ['17:00', '18:00']);
    window.fetchAPI = mockFetchAPI;

    initializeTimes();

    expect(mockFetchAPI).toHaveBeenCalled();
    const callArg = mockFetchAPI.mock.calls[0][0];
    expect(callArg).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  test('should return times in correct format', () => {
    const result = initializeTimes('2024-12-25');

    result.forEach(time => {
      expect(time).toMatch(/^\d{2}:\d{2}$/);
    });
  });

  test('should return array of times from evening hours', () => {
    const result = initializeTimes();

    // Check that times are in evening range (17:00 - 21:00)
    result.forEach(time => {
      const [hour] = time.split(':');
      const hourNum = parseInt(hour);
      expect(hourNum).toBeGreaterThanOrEqual(17);
      expect(hourNum).toBeLessThan(22);
    });
  });
});

describe('Booking Utils - updateTimes (Reducer)', () => {
  afterEach(() => {
    delete window.fetchAPI;
  });

  test('should handle UPDATE_TIMES action with payload', () => {
    const initialState = ['17:00', '17:30'];
    const newTimes = ['18:00', '18:30', '19:00'];

    const action = {
      type: 'UPDATE_TIMES',
      payload: newTimes
    };

    const result = updateTimes(initialState, action);

    expect(result).toEqual(newTimes);
  });

  test('should call initializeTimes when payload is not provided', () => {
    const initialState = [];
    const mockFetchAPI = jest.fn(() => ['19:00', '19:30']);
    window.fetchAPI = mockFetchAPI;

    const action = {
      type: 'UPDATE_TIMES',
      date: '2024-12-25',
      payload: undefined
    };

    const result = updateTimes(initialState, action);

    expect(mockFetchAPI).toHaveBeenCalledWith('2024-12-25');
  });

  test('should return current state for unknown action type', () => {
    const initialState = ['17:00', '18:00'];

    const action = {
      type: 'UNKNOWN_ACTION'
    };

    const result = updateTimes(initialState, action);

    expect(result).toEqual(initialState);
  });

  test('should handle empty payload array', () => {
    const initialState = ['17:00'];

    const action = {
      type: 'UPDATE_TIMES',
      payload: []
    };

    const result = updateTimes(initialState, action);

    expect(result).toEqual([]);
  });

  test('should replace entire times array on UPDATE_TIMES', () => {
    const initialState = ['17:00', '17:30', '18:00'];
    const newTimes = ['20:00', '20:30'];

    const action = {
      type: 'UPDATE_TIMES',
      payload: newTimes
    };

    const result = updateTimes(initialState, action);

    expect(result).toEqual(newTimes);
    expect(result).not.toContain('17:00');
  });
});

describe('Booking Utils - submitBooking', () => {
  afterEach(() => {
    delete window.submitAPI;
  });

  test('should call window.submitAPI if available', () => {
    const mockSubmitAPI = jest.fn(() => true);
    window.submitAPI = mockSubmitAPI;

    const formData = {
      date: '2024-12-25',
      time: '19:00',
      guests: 4,
      occasion: 'Birthday'
    };

    const result = submitBooking(formData);

    expect(mockSubmitAPI).toHaveBeenCalledWith(formData);
    expect(result).toBe(true);
  });

  test('should return true when submitAPI is not available', () => {
    const formData = {
      date: '2024-12-25',
      time: '19:00',
      guests: 4
    };

    const result = submitBooking(formData);

    expect(result).toBe(true);
  });

  test('should pass complete form data to submitAPI', () => {
    const mockSubmitAPI = jest.fn(() => true);
    window.submitAPI = mockSubmitAPI;

    const formData = {
      date: '2024-12-25',
      time: '19:00',
      guests: 4,
      occasion: 'Birthday',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '3125551234'
    };

    submitBooking(formData);

    expect(mockSubmitAPI).toHaveBeenCalledWith(formData);
  });

  test('should handle submitAPI returning false', () => {
    const mockSubmitAPI = jest.fn(() => false);
    window.submitAPI = mockSubmitAPI;

    const formData = { date: '2024-12-25', time: '19:00' };
    const result = submitBooking(formData);

    expect(result).toBe(false);
  });
});

describe('Booking Utils - getTimeSlots', () => {
  test('should return array of time strings', () => {
    const result = getTimeSlots();

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  test('should return times in HH:MM format', () => {
    const result = getTimeSlots();

    result.forEach(time => {
      expect(time).toMatch(/^\d{2}:\d{2}$/);
    });
  });

  test('should generate times starting from 17:00', () => {
    const result = getTimeSlots();

    expect(result[0]).toBe('17:00');
  });

  test('should generate times in 30-minute intervals', () => {
    const result = getTimeSlots();

    for (let i = 1; i < result.length; i++) {
      const current = result[i];
      const previous = result[i - 1];

      const [currHour, currMin] = current.split(':').map(Number);
      const [prevHour, prevMin] = previous.split(':').map(Number);

      const currTime = currHour * 60 + currMin;
      const prevTime = prevHour * 60 + prevMin;

      expect(currTime - prevTime).toBe(30);
    }
  });

  test('should end around 21:00 hours', () => {
    const result = getTimeSlots();
    const lastTime = result[result.length - 1];
    const [hour] = lastTime.split(':').map(Number);

    expect(hour).toBeGreaterThanOrEqual(21);
  });

  test('should generate consistent number of slots', () => {
    const result = getTimeSlots();

    // 5 hours (17:00-22:00) with 30-min intervals = 10 slots
    expect(result.length).toBe(10);
  });

  test('should have proper leading zeros in time format', () => {
    const result = getTimeSlots();

    result.forEach(time => {
      const [hour, min] = time.split(':');
      expect(hour).toHaveLength(2);
      expect(min).toHaveLength(2);
      expect(/^\d{2}$/.test(hour)).toBe(true);
      expect(/^\d{2}$/.test(min)).toBe(true);
    });
  });
});
