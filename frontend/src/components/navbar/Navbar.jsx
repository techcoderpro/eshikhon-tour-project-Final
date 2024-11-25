import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-indigo-950 text-white py-4">
      {/* Navbar Container */}
      <div className="flex items-center justify-between px-6">
        {/* Logo */}
        <div className="text-2xl font-bold">MySite</div>

        {/* Hamburger Icon */}
        <div
          className="md:hidden flex flex-col cursor-pointer"
          onClick={toggleMenu}
        >
          <div className="w-6 h-1 bg-white mb-1"></div>
          <div className="w-6 h-1 bg-white mb-1"></div>
          <div className="w-6 h-1 bg-white"></div>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-6 text-lg">
          <li className="hover:bg-indigo-900 px-4 py-2 rounded transition">
            <Link to="/">Tours</Link>
          </li>
          <li className="hover:bg-indigo-900 px-4 py-2 rounded transition">
            <Link to="/login">Login</Link>
          </li>
          <li className="hover:bg-indigo-900 px-4 py-2 rounded transition">
            <Link to="/registration">Registration</Link>
          </li>
        </ul>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <ul className="md:hidden flex flex-col items-center bg-indigo-950 text-lg py-4 space-y-4">
          <li className="hover:bg-indigo-900 px-4 py-2 rounded transition">
            <Link to="/" onClick={toggleMenu}>
              Tours
            </Link>
          </li>
          <li className="hover:bg-indigo-900 px-4 py-2 rounded transition">
            <Link to="/login" onClick={toggleMenu}>
              Login
            </Link>
          </li>
          <li className="hover:bg-indigo-900 px-4 py-2 rounded transition">
            <Link to="/registration" onClick={toggleMenu}>
              Registration
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
