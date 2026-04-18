import React, { useReducer } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Nav from './components/Nav';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import ConfirmedBooking from './pages/ConfirmedBooking';
import { initializeTimes, updateTimes } from './utils/bookingUtils';

function App() {
  const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);

  return (
    <Router>
      <Header />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route 
            path="/booking" 
            element={<BookingPage availableTimes={availableTimes} dispatch={dispatch} />} 
          />
          <Route path="/confirmed" element={<ConfirmedBooking />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
