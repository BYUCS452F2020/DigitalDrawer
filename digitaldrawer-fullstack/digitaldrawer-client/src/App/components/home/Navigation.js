import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="main-nav">
      <ul>
        <li><NavLink activeStyle={{background: "#6cddf1"}} to="/favorites">Favorite</NavLink></li>
        <li><NavLink activeStyle={{background: "#f38e56"}} to="/later">Later</NavLink></li>
        <li><NavLink activeStyle={{background: "#dbd063"}} to="/fun">Fun</NavLink></li>
        <li><NavLink activeStyle={{background: "#fc7abf"}} to="/business">Business</NavLink></li>
        <li><NavLink activeStyle={{background: "#76bc63"}} to="/addBookmark">+Add</NavLink></li>
      </ul>
    </nav>
  );
}

export default Navigation;
