# Testing Guide - Little Lemon Restaurant App

This guide explains how to run and understand the test suite for the Little Lemon Restaurant Capstone Project.

## 📋 Test Overview

The project includes two main test suites:

1. **BookingForm.test.js** - Component testing with React Testing Library
2. **bookingUtils.test.js** - Utility and reducer function testing

## 🚀 Running Tests

### Run All Tests
```bash
npm test -- --watchAll=false
```

### Run Specific Test File
```bash
npm test BookingForm.test.js -- --watchAll=false
npm test bookingUtils.test.js -- --watchAll=false
```

### Run Tests in Watch Mode
```bash
npm test
```
(Press `q` to quit, `a` to run all tests again)

### Run Tests with Coverage Report
```bash
npm test -- --coverage --watchAll=false
```

## 📊 Test Suite Details

### 1. BookingForm Component Tests (`src/components/BookingForm.test.js`)

#### Purpose
Tests the BookingForm component's rendering, validation, accessibility, and user interactions.

#### Test Groups

##### A. Rendering and Static Text
Tests that ensure the form renders correctly with all required elements.

```
✓ renders booking form with all required fields
✓ renders submit button with correct text
✓ displays all legend texts
✓ renders form with correct initial values
```

**What it validates:**
- All form fields are present in the DOM
- Legend headings are displayed
- Default values are set correctly (guests=1, occasion=Birthday)

##### B. HTML5 Validation Attributes
Tests that verify all HTML5 validation attributes are properly set.

```
✓ name input has required attribute
✓ email input has required and email type attributes
✓ phone input has required and tel type attributes
✓ date input has required and date type attributes with min date
✓ time select has required attribute
✓ guests input has required, min and max attributes
✓ occasion select does not have required attribute
✓ all required fields are marked with required indicator
```

**What it validates:**
- `required` attribute on required fields
- `type="email"` on email input
- `type="tel"` on phone input
- `type="date"` on date input
- `min="1"` and `max="10"` on guests input
- `min` attribute is set on date input (prevents past dates)

##### C. Accessibility Attributes (ARIA)
Tests that ensure proper ARIA attributes for screen readers and assistive technology.

```
✓ form has aria-label
✓ all inputs have proper aria-describedby for error messages
✓ submit button has aria-label
```

**ARIA Attributes Tested:**
- `aria-label` on form element
- `aria-required="true"` on required inputs
- `aria-describedby` references error message IDs
- `aria-label` on submit button

**Why it matters:**
- Screen reader users can understand form purpose
- Error messages are properly associated with inputs
- Buttons are labeled for accessibility

##### D. Available Times Display
Tests that verify time slots are rendered correctly.

```
✓ displays all available time slots in select
✓ handles empty available times gracefully
```

**What it validates:**
- All available times appear in the dropdown
- "No times available" message shown when empty

##### E. Form Interactions
Tests user interactions with the form.

```
✓ updates form state when inputs change
✓ calls dispatch when date changes
```

**What it validates:**
- Form state updates when user types
- Date changes trigger the reducer dispatch

##### F. Form Validation
Tests the client-side validation logic.

```
✓ prevents submission with empty required fields
✓ validates email format
✓ validates guest count between 1 and 10
```

**What it validates:**
- Form won't submit without required fields
- Email format validation (must have @ and domain)
- Guest count validation (1-10 only)

### 2. Booking Utils Tests (`src/utils/bookingUtils.test.js`)

#### Purpose
Tests utility functions for booking including reducer functions and API integration.

#### Test Groups

##### A. initializeTimes Tests
Tests the initialization of available times.

```
✓ should return default times when fetchAPI is not available
✓ should call window.fetchAPI if available
✓ should use today date if no date is provided
✓ should return times in correct format
✓ should return array of times from evening hours
```

**What it validates:**
- Fallback times when fetchAPI unavailable
- fetchAPI is called with correct date parameter
- Default to today's date
- Time format is HH:MM
- Times are in evening range (17:00-21:00)

##### B. updateTimes Reducer Tests
Tests the reducer function for updating available times.

```
✓ should handle UPDATE_TIMES action with payload
✓ should call initializeTimes when payload is not provided
✓ should return current state for unknown action type
✓ should handle empty payload array
✓ should replace entire times array on UPDATE_TIMES
```

**What it validates:**
- Reducer properly handles UPDATE_TIMES action
- New times completely replace old times
- Fallback to initializeTimes when needed
- Unknown actions return current state unchanged

**Reducer Pattern Used:**
```javascript
const action = {
  type: 'UPDATE_TIMES',
  payload: ['18:00', '18:30', '19:00']
};

const newState = updateTimes(currentState, action);
```

##### C. submitBooking Tests
Tests the booking submission function.

```
✓ should call window.submitAPI if available
✓ should return true when submitAPI is not available
✓ should pass complete form data to submitAPI
✓ should handle submitAPI returning false
```

**What it validates:**
- API function is called with booking data
- Booking data includes all required fields
- Function returns boolean result from API

##### D. getTimeSlots Tests
Tests the time slot generation utility.

```
✓ should return array of time strings
✓ should return times in HH:MM format
✓ should generate times starting from 17:00
✓ should generate times in 30-minute intervals
✓ should end around 21:00 hours
✓ should generate consistent number of slots
✓ should have proper leading zeros in time format
```

**What it validates:**
- Returns array of properly formatted times
- Generates 10 time slots (5 hours × 2 per hour)
- 30-minute intervals between slots
- Leading zeros (e.g., "09:00" not "9:00")

## 🔧 Mock Functions

The tests use mock functions defined in `setupTests.js`:

```javascript
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
```

## ✅ Test Checklist

Before considering testing complete, verify:

- [ ] All HTML5 validation attributes are tested
- [ ] ARIA attributes are tested for accessibility
- [ ] Form rendering includes all fields
- [ ] Reducer functions handle all action types
- [ ] API integration with fetchAPI and submitAPI works
- [ ] Error messages display correctly
- [ ] Form validation prevents invalid submissions
- [ ] Available times display correctly
- [ ] Tests pass without errors

## 🐛 Debugging Tests

### Run a Single Test
```javascript
// Add .only to run just one test
test.only('name input has required attribute', () => {
  // test code
});
```

### Skip a Test
```javascript
// Add .skip to skip a test
test.skip('should be fixed later', () => {
  // test code
});
```

### View Detailed Output
```bash
npm test -- --verbose --watchAll=false
```

### Check Test Coverage
```bash
npm test -- --coverage --watchAll=false
```

## 📝 Test Requirements by Meta Capstone

The tests satisfy these requirements:

✅ **BookingForm Static Text Rendering**
- Tests verify all form labels and legend texts render
- Button text "Reserve Table" is present

✅ **HTML5 Validation Attributes**
- Tests verify `required` attributes on required fields
- Tests check `min="1"` and `max="10"` on guests
- Tests verify `type` attributes (email, tel, date, number)
- Tests check date input has `min` attribute

✅ **ARIA Attributes**
- Tests verify `aria-label` on form and button
- Tests check `aria-required="true"` on required inputs
- Tests validate `aria-describedby` for error messages

✅ **Reducer Functions**
- initializeTimes tested with and without fetchAPI
- updateTimes reducer tested with UPDATE_TIMES action
- State management with useReducer verified

✅ **API Integration**
- window.fetchAPI integration tested
- window.submitAPI integration tested
- Form data passed correctly to APIs

## 🎓 Learning Resources

- [Jest Documentation](https://jestjs.io)
- [React Testing Library Docs](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Accessibility Testing](https://www.w3.org/WAI/test-evaluate/)

## ⚠️ Common Issues

### Issue: "Cannot find module 'react-router-dom'"
**Solution**: Run `npm install react-router-dom`

### Issue: Tests timeout
**Solution**: Increase timeout in test:
```javascript
test('test name', async () => {
  // test code
}, 10000); // 10 second timeout
```

### Issue: Mock not working
**Solution**: Clear mocks between tests:
```javascript
beforeEach(() => {
  jest.clearAllMocks();
});
```

## 📞 Support

For questions about the tests:
1. Check the test comments and descriptions
2. Review the test assertions
3. Run tests in verbose mode for more details
4. Check the setupTests.js for mock configurations

---

**Happy Testing!** 🧪
