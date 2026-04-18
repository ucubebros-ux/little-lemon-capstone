# Little Lemon Restaurant - React Capstone Project

A modern, responsive Mediterranean restaurant web application built with React, featuring a booking system with advanced state management, comprehensive form validation, and full accessibility support.

## Project Overview

This project implements a complete restaurant web application for "Little Lemon," a Mediterranean restaurant in Chicago. The application includes:

- **Homepage** with Hero section, Featured Specials, Customer Testimonials, and About section
- **Advanced Booking System** with date/time selection and guest management
- **Responsive Design** using 12-column grid system and Flexbox
- **Full Accessibility** with ARIA attributes and semantic HTML
- **Comprehensive Testing** with Jest and React Testing Library

## Architecture

### Components Structure

```
src/
├── components/
│   ├── Header.js/css           # Header with branding
│   ├── Nav.js/css              # Navigation bar
│   ├── Footer.js/css           # Footer with contact info
│   ├── Hero.js/css             # Hero section
│   ├── Specials.js/css         # Weekly specials showcase
│   ├── Testimonials.js/css     # Customer testimonials
│   ├── About.js/css            # About Little Lemon
│   └── BookingForm.js/css      # Booking form component
├── pages/
│   ├── HomePage.js/css         # Homepage composition
│   ├── BookingPage.js/css      # Booking page layout
│   └── ConfirmedBooking.js/css # Booking confirmation
├── utils/
│   └── bookingUtils.js         # Booking utilities & reducer
├── App.js/css                  # Main app with routing
└── index.js                    # React entry point
```

## Design System

### Little Lemon Branding Colors

- **Primary Green**: `#495E57` - Main brand color
- **Primary Yellow**: `#F4CE14` - Accent color
- **Secondary Light**: `#E7F3E8` - Light backgrounds
- **Secondary Dark**: `#333333` - Text color
- **Light Gray**: `#F5F5F5` - Subtle backgrounds

### Layout System

- **12-Column Grid**: Responsive grid system for flexible layouts
- **Flexbox**: For component alignment and spacing
- **Border Radius**: 8px for consistent rounded corners
- **Responsive Breakpoints**: 768px (tablet) and 480px (mobile)

## Features

### 1. Homepage

- **Hero Section**: Welcome message with call-to-action button
- **Specials**: Showcase of weekly special dishes with pricing
- **Testimonials**: 5-star customer reviews
- **About**: Restaurant information and highlights

### 2. Booking System

A complete reservation system with:

#### Form Fields

- **Personal Information**:
  - Name (required, text input)
  - Email (required, email validation)
  - Phone (required, phone validation)

- **Reservation Details**:
  - Date (required, HTML5 date picker, min = today)
  - Time (required, dropdown with dynamic options)
  - Number of Guests (required, 1-10 range)
  - Occasion (Birthday/Anniversary/Business/Other)

#### State Management

- **useReducer** in App.js for managing available times
- **initializeTimes**: Fetches initial available times
- **updateTimes**: Updates times based on selected date
- **submitBooking**: Submits reservation data

### 3. Validation

- **HTML5 Validation**: Built-in form validation
- **Custom Validation**: Email format, phone format, guest count range
- **Error Messages**: Clear, user-friendly error feedback
- **Visual Feedback**: Color-coded validation states

### 4. Accessibility

- **ARIA Attributes**:
  - `aria-label` on form and buttons
  - `aria-required` on required inputs
  - `aria-describedby` for error messages
  - `role="alert"` for error containers

- **Semantic HTML**: `<header>`, `<nav>`, `<main>`, `<footer>`
- **Keyboard Navigation**: Full keyboard support
- **Color Contrast**: WCAG AA compliant
- **Focus Indicators**: Clear focus states

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd little-lemon

# Install dependencies
npm install
```

### Running the Application

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

The application will open at [http://localhost:3000](http://localhost:3000)

## Testing

The project includes comprehensive unit tests using Jest and React Testing Library:

### Test Suites

1. **BookingForm.test.js**
   - Render tests for form components
   - HTML5 validation attribute checks
   - ARIA accessibility attributes
   - Form interaction tests
   - Validation logic tests

2. **bookingUtils.test.js**
   - `initializeTimes` function tests
   - `updateTimes` reducer tests
   - `submitBooking` API integration tests
   - `getTimeSlots` utility tests

### Running Tests

```bash
# Run all tests
npm test

# Run tests without watch mode
npm test -- --watchAll=false

# Run specific test file
npm test BookingForm.test.js

# Run with coverage
npm test -- --coverage
```

### Test Coverage

- Form static text rendering
- HTML5 validation attributes (required, min, max, type, etc.)
- ARIA attributes (aria-label, aria-required, aria-describedby)
- Reducer function logic
- API integration with fetchAPI and submitAPI
- Form validation and error handling

## API Integration

The application uses two window functions for backend integration:

### window.fetchAPI(date)

Fetches available time slots for a given date.

```javascript
// Example usage in reducer
const availableTimes = window.fetchAPI("2024-12-25");
// Returns: ['17:00', '17:30', '18:00', ...]
```

### window.submitAPI(formData)

Submits booking form data to the server.

```javascript
const formData = {
  date: "2024-12-25",
  time: "19:00",
  guests: 4,
  occasion: "Birthday",
  name: "John Doe",
  email: "john@example.com",
  phone: "(312) 555-1234",
};

const result = window.submitAPI(formData);
// Returns: true if successful
```

## Responsive Design

The application is fully responsive with optimized layouts for:

- **Desktop** (1200px+): Full 12-column grid layout
- **Tablet** (769px - 1024px): 6-8 column layouts
- **Mobile** (320px - 768px): Single column stack layout

### Breakpoints

```css
@media (max-width: 768px) {
  /* Tablet and down */
}
@media (max-width: 480px) {
  /* Mobile */
}
```

## Project Scripts

```bash
npm start       # Start development server
npm test        # Run test suite
npm run build   # Create production build
npm run eject   # Eject from CRA (one-way operation)
```

## Styling Approach

### CSS Organization

- **Component-level CSS**: Each component has its own CSS file
- **Global Styles**: App.css contains design system and utilities
- **CSS Grid & Flexbox**: Modern layout techniques
- **CSS Variables**: For consistent theming

### Utility Classes

- `.grid` - 12-column grid container
- `.col-{1-12}` - Column span classes
- `.flex`, `.flex-center`, `.flex-between`, `.flex-column` - Flexbox utilities
- `.btn`, `.btn-primary`, `.btn-secondary` - Button styles
- `gap-{1-3}`, `mt-{1-4}`, `mb-{1-4}`, `p-{1-4}` - Spacing utilities

## Meta Capstone Requirements Compliance

**Project Setup**

- React with functional components
- Boilerplate removed (logo.svg, default App.js)

**Architecture**

- Semantic HTML structure with `<header>`, `<nav>`, `<main>`, `<footer>`
- Separate components for each section

**Routing**

- react-router-dom v7 configured
- Routes for Homepage (/) and Booking Page (/booking)
- Confirmation page route (/confirmed)

**Homepage Components**

- Hero, Specials, Testimonials, About components

**Booking System**

- BookingPage and BookingForm components
- All required form fields with validation
- useReducer for state management
- API integration with window functions
- Navigation to ConfirmedBooking on success

**Validation & Accessibility**

- HTML5 validation (required, min/max, type checking)
- Custom validation (email, phone, guest count)
- ARIA attributes on all interactive elements
- Error messages with aria-describedby

**Styling**

- 12-column grid and Flexbox layouts
- Little Lemon branding colors
- 8px rounded corners
- Responsive design

**Testing**

- Jest and React Testing Library configured
- Tests for BookingForm rendering
- Tests for reducer functions
- Tests for validation attributes

## 🚦 Running the Application

```bash
# Development mode with hot reload
npm start

# Access the app at http://localhost:3000

# Test the booking flow:
1. Navigate to "Book a Table" from nav
2. Fill in reservation details
3. Select date and time
4. Submit form
5. View confirmation with booking details
```

## Additional Resources

- [React Documentation](https://react.dev)
- [React Router Docs](https://reactrouter.com)
- [Testing Library Docs](https://testing-library.com)
- [WCAG Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## License

This project is part of the Meta Front-End Developer Capstone course.

---

**Built with for Little Lemon Restaurant**

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
