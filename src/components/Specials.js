import React from 'react';
import './Specials.css';

function Specials() {
  const specials = [
    {
      id: 1,
      name: 'Grilled Salmon',
      description: 'Fresh Atlantic salmon grilled with lemon herbs and seasonal vegetables',
      price: '$22.99',
      image: '🐟'
    },
    {
      id: 2,
      name: 'Bruschetta',
      description: 'Toasted bread with fresh tomatoes, garlic, basil, and olive oil',
      price: '$8.99',
      image: '🍞'
    },
    {
      id: 3,
      name: 'Greek Salad',
      description: 'Crisp lettuce, feta cheese, olives, and Mediterranean vegetables',
      price: '$12.99',
      image: '🥗'
    },
    {
      id: 4,
      name: 'Pasta Primavera',
      description: 'Fresh pasta with seasonal vegetables in light olive oil sauce',
      price: '$15.99',
      image: '🍝'
    }
  ];

  return (
    <section className="specials">
      <div className="container">
        <div className="specials-header">
          <h2>This Week's Specials!</h2>
          <button className="btn btn-primary">View All</button>
        </div>
        <div className="grid">
          {specials.map((special) => (
            <div key={special.id} className="col-3 special-card">
              <div className="special-image">{special.image}</div>
              <div className="special-content">
                <h3>{special.name}</h3>
                <p>{special.description}</p>
                <div className="special-footer">
                  <span className="special-price">{special.price}</span>
                  <button className="btn-small">Order Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Specials;
