import React from 'react';
import logo from '../assets/logo.png'
import './Header.css';

function Header({ onCreateJob }) {
  return (
    <header className="header">
     <img className="nav-logo"src={logo}/>
      <nav className="nav-links">
        <ul>
          <li>Home</li>
          <li>Find Jobs</li>
          <li>Find Talents</li>
          <li>About us</li>
          <li>Testimonials</li>
        </ul>
      </nav>
      <button className="create-jobs-btn" onClick={onCreateJob}>Create Jobs</button>
    </header>
  );
}

export default Header;