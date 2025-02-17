import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { logout, user } = useAuth();

  const isActive = (path) => {
    return location.pathname === path ? 'bg-blue-800' : '';
  };

  return (
    <nav className="bg-gray-800 shadow-lg sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <span className="text-white font-semibold text-xl hidden sm:block">Employee Management</span>
          </Link>
          
          {/* Desktop menu */}
          <div className="hidden md:flex space-x-4">
            <Link to="/" className={`nav-link ${isActive('/add')}`}>
              Dashboard
            </Link>
            <Link to="/add" className={`nav-link ${isActive('/')}`}>
              Add Employee
            </Link>
            {user && (
              <button 
                onClick={logout} 
                className="text-gray-300 hover:text-white bg-blue-800 px-3 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-700 py-2 px-4 animate-fade-in">
          <Link 
            to="/" 
            className={`block py-2 px-4 text-white rounded ${isActive('/add')}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link 
            to="/add" 
            className={`block py-2 px-4 text-white rounded ${isActive('/')}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Add Employee
          </Link>
          {user && (
            <button 
              onClick={() => {
                logout();
                setIsMenuOpen(false);
              }} 
              className="block w-full text-left py-2 px-4 bg-blue-800 text-white bg-blue rounded hover:bg-gray-600 "
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;