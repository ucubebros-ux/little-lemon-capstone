import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="container flex-between">
        <div className="logo">
          <h1>🍋 Little Lemon</h1>
        </div>
        <div className="tagline">
          <p>Mediterranean Restaurant & Bar</p>
        </div>
      </div>
    </header>
  );
}

export default Header;
