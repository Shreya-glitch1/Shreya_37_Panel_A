import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Header.css';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/dashboard" className="logo">
          Personal Finance Manager
        </Link>
        
        {user && (
          <nav className="nav-menu">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/budget">Budget</Link>
            <Link to="/analytics">Analytics</Link>
            <span className="user-name">Welcome, {user.name}</span>
            <button onClick={handleLogout} className="btn-logout">
              Logout
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
