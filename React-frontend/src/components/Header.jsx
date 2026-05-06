import React from 'react';

const Header = ({ name, title, location, email, phone, onNavigate }) => {
  return (
    <header className="header">
      <div className="header-content">
        <h1>{name}</h1>
        <p>{title}</p>
        <div className="contact-row">
          <span>{location}</span>
          <span>•</span>
          <span>{email}</span>
          <span>•</span>
          <span>{phone}</span>
        </div>
        <nav>
          <button onClick={() => onNavigate('about')}>About</button>
          <button onClick={() => onNavigate('skills')}>Skills</button>
          <button onClick={() => onNavigate('projects')}>Projects</button>
          <button onClick={() => onNavigate('publications')}>Publications</button>
          <button onClick={() => onNavigate('certifications')}>Certifications</button>
          <button onClick={() => onNavigate('contact')}>Contact</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;