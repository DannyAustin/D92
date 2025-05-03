import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth';
import { logout } from '../api';

const Navbar = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div>
        <Link to="/dashboard" aria-label="Go to Dashboard">Dashboard</Link>
        <Link to="/summary" aria-label="Go to Summary">Summary</Link>
        <Link to="/reports" aria-label="Go to Reports">Reports</Link>
      </div>
      <button onClick={handleLogout} aria-label="Log out">Logout</button>
    </nav>
  );
};

export default Navbar;
