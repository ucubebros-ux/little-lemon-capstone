# Component Documentation - Little Lemon Restaurant

Complete documentation for all React components in the Little Lemon Restaurant application.

## 📚 Table of Contents

1. [Layout Components](#layout-components)
2. [Page Components](#page-components)
3. [Feature Components](#feature-components)
4. [Utilities](#utilities)

---

## Layout Components

### Header Component

**File**: `src/components/Header.js`

**Purpose**: Displays the application header with restaurant branding

**Features**:

- Restaurant name with emoji logo (🍋)
- Tagline "Mediterranean Restaurant & Bar"
- Green background with yellow accent
- Responsive design

**Props**: None

**Usage**:

```jsx
import Header from "./components/Header";

<Header />;
```

**Styling**:

- Color: Primary green (#495E57)
- Tagline color: Primary yellow (#F4CE14)
- Responsive font sizes

---

### Navigation Component

**File**: `src/components/Nav.js`

**Purpose**: Main navigation bar with links to all sections

**Features**:

- Links to Home, Booking, About, Contact
- React Router integration
- Sticky positioning
- Responsive menu

**Links**:

- Home (/)
- Book a Table (/booking)
- About (#about)
- Contact (#contact)

**Props**: None

**Usage**:

```jsx
import Nav from "./components/Nav";

<Nav />;
```

**Accessibility**:

- `aria-label="Main navigation"` on nav element
- Keyboard focusable links
- Visual focus indicators

---

### Footer Component

**File**: `src/components/Footer.js`

**Purpose**: Application footer with contact and company information

**Features**:

- About section
- Operating hours
- Contact information
- Social media links
- Copyright notice

**Props**: None

**Usage**:

```jsx
import Footer from "./components/Footer";

<Footer />;
```

**Content Sections**:

1. About Little Lemon
2. Hours (Mon-Thu, Fri-Sat, Sunday)
3. Contact (Phone, Email, Address)
4. Social Media (Facebook, Instagram, Twitter)

---

## Page Components

### HomePage

**File**: `src/pages/HomePage.js`

**Purpose**: Main landing page composition

**Structure**:

```
HomePage
├── Hero
├── Specials
├── Testimonials
└── About
```

**Props**: None

**Usage**:

```jsx
import HomePage from "./pages/HomePage";

<Route path="/" element={<HomePage />} />;
```

**Purpose of Each Section**:

- **Hero**: Attracts users with welcome message and CTA
- **Specials**: Showcases featured menu items
- **Testimonials**: Builds trust with customer reviews
- **About**: Tells restaurant story

---

### BookingPage

**File**: `src/pages/BookingPage.js`

**Purpose**: Booking reservation page with form and information

**Props**:

```javascript
{
  availableTimes: Array,    // Array of available time slots
  dispatch: Function        // Reducer dispatch function
}
```

**Features**:

- Booking form with all necessary fields
- Restaurant contact information
- Hours and location details
- Responsive layout

**Usage**:

```jsx
import BookingPage from "./pages/BookingPage";

<Route
  path="/booking"
  element={<BookingPage availableTimes={availableTimes} dispatch={dispatch} />}
/>;
```

**Information Displayed**:

- Phone number
- Restaurant location
- Operating hours
- Booking form with validation

---

### ConfirmedBooking

**File**: `src/pages/ConfirmedBooking.js`

**Purpose**: Confirmation page after successful booking

**Features**:

- Success icon and message
- Booking details display
- Navigation buttons
- Confirmation instructions

**Props**: None (uses React Router location state)

**Usage**:

```jsx
import ConfirmedBooking from "./pages/ConfirmedBooking";

<Route path="/confirmed" element={<ConfirmedBooking />} />;
```

**Display Information**:

- Customer name
- Email
- Phone
- Reservation date (formatted)
- Time
- Number of guests
- Occasion

**Navigation Options**:

- Back to Home
- Make Another Reservation

---

## Feature Components

### Hero Component

**File**: `src/components/Hero.js`

**Purpose**: Eye-catching introduction section on homepage

**Features**:

- Welcome heading and description
- Call-to-action button
- Image placeholder with emoji
- Gradient background

**Props**: None

**Usage**:

```jsx
import Hero from "./components/Hero";

<Hero />;
```

**Content**:

- Title: "Welcome to Little Lemon"
- Description of Mediterranean cuisine
- Button: "Reserve Your Table" → /booking

**Styling**:

- Gradient: Primary green to darker green
- Large responsive heading (48px → 24px mobile)
- 50/50 split layout (content/image)

---

### Specials Component

**File**: `src/components/Specials.js`

**Purpose**: Showcase weekly special dishes

**Features**:

- 4-card grid layout
- Dish name, description, and price
- "Order Now" buttons
- View All button
- Hover animations

**Props**: None

**Usage**:

```jsx
import Specials from "./components/Specials";

<Specials />;
```

**Dishes Displayed**:

1. Grilled Salmon - $22.99 (🐟)
2. Bruschetta - $8.99 (🍞)
3. Greek Salad - $12.99 (🥗)
4. Pasta Primavera - $15.99 (🍝)

**Features**:

- Card hover effect (lift animation)
- Yellow price highlight
- Responsive: 4 cols → 2 cols → 1 col

---

### Testimonials Component

**File**: `src/components/Testimonials.js`

**Purpose**: Display customer reviews and ratings

**Features**:

- Star ratings (5 stars each)
- Customer name and role
- Review text in quotes
- Card-based layout

**Props**: None

**Usage**:

```jsx
import Testimonials from "./components/Testimonials";

<Testimonials />;
```

**Testimonials Included**:

1. Sarah Johnson (Food Critic) - 5⭐
2. Michael Chen (Regular Customer) - 5⭐
3. Emily Rodriguez (Chef) - 5⭐
4. David Thompson (Business Traveler) - 5⭐

**Features**:

- Auto-responsive grid
- Hover effects
- Border accent (yellow)
- Responsive: 4 cols → 2 cols → 1 col

---

### About Component

**File**: `src/components/About.js`

**Purpose**: Tell the restaurant's story and highlight achievements

**Features**:

- Restaurant history
- Highlights section with statistics
- Image placeholder
- 50/50 content/image layout

**Props**: None

**Usage**:

```jsx
import About from "./components/About";

<About />;
```

**Content Sections**:

1. Main description of Little Lemon
2. The story behind founding
3. Key statistics:
   - 500+ Happy Customers Weekly
   - 4.8★ Average Rating
   - 50+ Menu Items

**Layout**:

- Left: Text content
- Right: Image placeholder (🏛️)

---

### BookingForm Component

**File**: `src/components/BookingForm.js`

**Purpose**: Main form for making restaurant reservations

**Props**:

```javascript
{
  availableTimes: Array,    // Array of available time slots
  dispatch: Function        // Reducer dispatch function
}
```

**Features**:

- Complete form validation
- HTML5 validation attributes
- ARIA accessibility labels
- Error message display
- Date picker with min date (today)
- Dynamic time selector
- Guest count range (1-10)
- Occasion dropdown

**Form Fields**:

#### Personal Information Section

1. **Name** (required)
   - Type: Text
   - Validation: Not empty
   - ARIA: aria-required, aria-label

2. **Email** (required)
   - Type: Email
   - Validation: Email format
   - Pattern: user@domain.com

3. **Phone** (required)
   - Type: Tel
   - Validation: Phone format
   - Accepts: 10 digits or formatted

#### Reservation Details Section

4. **Date** (required)
   - Type: Date picker
   - Min: Today's date
   - Validation: Required, future date

5. **Time** (required)
   - Type: Dropdown select
   - Options: Dynamic from availableTimes
   - Validation: Required

6. **Number of Guests** (required)
   - Type: Number
   - Min: 1
   - Max: 10
   - Validation: Range 1-10

7. **Occasion**
   - Type: Dropdown select
   - Options: Birthday, Anniversary, Business, Other
   - Default: Birthday
   - Validation: Optional

**Validation**:

- HTML5 validation (required, min, max, type)
- Custom email validation
- Custom phone validation
- Guest count range validation
- Error messages for each field

**Accessibility**:

- `aria-label` on form element
- `aria-required="true"` on required inputs
- `aria-describedby` linking to error messages
- Semantic `<fieldset>` and `<legend>`
- Proper label associations

**Usage**:

```jsx
import BookingForm from "./components/BookingForm";

<BookingForm availableTimes={availableTimes} dispatch={dispatch} />;
```

**Event Handlers**:

- `handleDateChange`: Updates form and dispatches updateTimes
- `handleTimeChange`: Updates selected time
- `handleGuestsChange`: Updates guest count
- `handleInputChange`: Updates text inputs
- `validateForm`: Validates all fields
- `handleSubmit`: Submits booking to API

**State Management**:

- `formData`: Stores all form input values
- `errors`: Stores validation error messages

**Navigation**:

- On successful submission → /confirmed page
- Passes booking data via React Router state

---

## Utilities

### bookingUtils.js

**File**: `src/utils/bookingUtils.js`

**Purpose**: Utility functions for booking system management

#### 1. initializeTimes(selectedDate)

**Description**: Initialize available times for a given date

**Parameters**:

```javascript
selectedDate: string; // Optional, format: YYYY-MM-DD
```

**Returns**: `Array<string>` - Array of time strings in HH:MM format

**Implementation**:

```javascript
export const initializeTimes = (selectedDate = null) => {
  const date = selectedDate || new Date().toISOString().split("T")[0];

  if (typeof window !== "undefined" && window.fetchAPI) {
    return window.fetchAPI(date);
  }

  return [
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
  ];
};
```

**Usage**:

```javascript
import { initializeTimes } from "../utils/bookingUtils";

// Initialize with today's date
const times = initializeTimes();

// Initialize with specific date
const times = initializeTimes("2024-12-25");
```

#### 2. updateTimes(state, action)

**Description**: Reducer function for managing available times state

**Parameters**:

```javascript
state: Array<string>  // Current available times
action: {
  type: string,     // 'UPDATE_TIMES'
  payload: Array,   // New times array
  date: string      // Date for fallback
}
```

**Returns**: `Array<string>` - Updated times array

**Implementation**:

```javascript
export const updateTimes = (state, action) => {
  switch (action.type) {
    case "UPDATE_TIMES":
      return action.payload || initializeTimes(action.date);
    default:
      return state;
  }
};
```

**Usage with useReducer**:

```javascript
const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);

// Update times when date changes
dispatch({
  type: "UPDATE_TIMES",
  date: newDate,
  payload: availableTimes,
});
```

#### 3. submitBooking(formData)

**Description**: Submit booking form data to API

**Parameters**:

```javascript
formData: {
  date: string,
  time: string,
  guests: number,
  occasion: string,
  name: string,
  email: string,
  phone: string
}
```

**Returns**: `boolean` - Success status

**Implementation**:

```javascript
export const submitBooking = (formData) => {
  if (typeof window !== "undefined" && window.submitAPI) {
    return window.submitAPI(formData);
  }

  console.log("Booking submitted:", formData);
  return true;
};
```

**Usage**:

```javascript
import { submitBooking } from "../utils/bookingUtils";

const handleSubmit = (formData) => {
  const success = submitBooking(formData);
  if (success) {
    navigate("/confirmed");
  }
};
```

#### 4. getTimeSlots()

**Description**: Generate time slots for the entire booking day

**Parameters**: None

**Returns**: `Array<string>` - Array of 10 time slots from 17:00 to 21:00

**Implementation**:

```javascript
export const getTimeSlots = () => {
  const slots = [];
  for (let hour = 17; hour < 22; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
      slots.push(timeString);
    }
  }
  return slots;
};
```

**Returns**: ['17:00', '17:30', '18:00', ..., '21:00']

---

## State Management

### useReducer in App.js

**Implementation**:

```javascript
const [availableTimes, dispatch] = useReducer(
  updateTimes,
  [], // initial state
  initializeTimes, // init function
);
```

**Flow**:

1. On component mount: `initializeTimes()` called
2. Date changes: dispatch action with new date
3. `updateTimes()` reducer returns new times
4. Component re-renders with updated times

**Props Passed Down**:

```javascript
<BookingPage availableTimes={availableTimes} dispatch={dispatch} />
```

---

## Responsive Design

### Breakpoints

```css
/* Desktop: 1200px+ */
Default grid layout (12 columns)

/* Tablet: 769px - 1024px */
@media (max-width: 768px)
Reduced columns, adjusted font sizes

/* Mobile: 320px - 768px */
@media (max-width: 480px)
Single column, minimum font sizes
```

### Component Responsiveness

- **Hero**: Text reduces from 48px to 28px, 50/50 to full-width
- **Specials**: 4 cards → 2 cards → 1 card
- **Testimonials**: Auto-fit grid with minimum 250px columns
- **BookingForm**: Fields stack on mobile
- **Footer**: 4 columns → 2 columns → 1 column

---

## Styling System

### CSS Variables (in App.css)

```css
--primary-green: #495e57 --primary-yellow: #f4ce14 --secondary-light: #e7f3e8
  --secondary-dark: #333333 --light-gray: #f5f5f5 --white: #ffffff
  --border-radius: 8px;
```

### Utility Classes

```css
.grid              /* 12-column grid */
.col-{1-12}        /* Column spans */
.flex              /* Flexbox container */
.flex-center       /* Center content */
.flex-between      /* Space-between layout */
.btn, .btn-primary /* Button styles */
.gap-{1-3}         /* Gap utilities */
.mt-{1-4}          /* Margin-top */
.mb-{1-4}          /* Margin-bottom */
.p-{1-4}           /* Padding */
```

---

## Accessibility Features

### ARIA Attributes

- `aria-label` - Labels for buttons and forms
- `aria-required` - Mark required form fields
- `aria-describedby` - Link inputs to error messages
- `role="alert"` - Error messages and alerts

### Semantic HTML

- `<header>` - Header section
- `<nav>` - Navigation bar
- `<main>` - Main content
- `<footer>` - Footer section
- `<fieldset>` - Form grouping
- `<legend>` - Field group labels

### Keyboard Navigation

- All interactive elements keyboard accessible
- Tab order follows visual flow
- Focus indicators visible

### Color Contrast

- WCAG AA compliant
- Text meets minimum contrast ratios
- Status indicators not color-only

---

## File Structure Summary

```
src/
├── components/
│   ├── About/          (Story & Highlights)
│   ├── BookingForm/    (Main booking form)
│   ├── Footer/         (Footer with contact)
│   ├── Header/         (Branding header)
│   ├── Hero/           (Welcome section)
│   ├── Nav/            (Navigation bar)
│   ├── Specials/       (Featured dishes)
│   └── Testimonials/   (Customer reviews)
├── pages/
│   ├── BookingPage/    (Booking page layout)
│   ├── ConfirmedBooking/ (Confirmation page)
│   └── HomePage/       (Homepage composition)
├── utils/
│   └── bookingUtils/   (Utility functions)
├── App.js              (Main app with routing)
├── App.css             (Global styles)
└── index.js            (React entry point)
```

---

**Last Updated**: April 2024
**Version**: 1.0.0
**Status**: ✅ Production Ready
