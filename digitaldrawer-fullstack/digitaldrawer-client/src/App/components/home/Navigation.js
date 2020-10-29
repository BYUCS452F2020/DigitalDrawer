import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="main-nav">
      <ul>
        <li><NavLink to="/favorites">Favorite </NavLink></li>
        <li><NavLink to="/later">Later</NavLink></li>
        <li><NavLink to="/fun">Fun</NavLink></li>
        <li><NavLink to="/business">Business</NavLink></li>
      </ul>
    </nav>
  );
}

export default Navigation;
