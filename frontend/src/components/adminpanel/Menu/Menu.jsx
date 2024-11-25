import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Menu = () => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const activePath = pathname.split('/').at(-1);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div>
      {/* Hamburger Icon for Mobile */}
      <div
        className="fixed top-5 left-5 z-50 md:hidden cursor-pointer"
        onClick={toggleMenu}
      >
        <div className="w-8 h-1 bg-gray-800 mb-1"></div>
        <div className="w-8 h-1 bg-gray-800 mb-1"></div>
        <div className="w-8 h-1 bg-gray-800"></div>
      </div>

      {/* Sidebar Menu */}
      <nav
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white z-40 transform 
                    ${
                      isOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:translate-x-0 transition-transform duration-300`}
      >
        <ul className="list-none text-lg mt-16 space-y-2">
          <li
            className={`pl-5 py-3 cursor-pointer border-l-4 hover:bg-gray-600 hover:border-orange-600 
                            ${
                              activePath === 'dashboard'
                                ? 'bg-gray-700 border-lime-600'
                                : 'border-gray-800'
                            }`}
          >
            <Link to="/dashboard" onClick={() => setIsOpen(false)}>
              Dashboard
            </Link>
          </li>
          <li
            className={`pl-5 py-3 cursor-pointer border-l-4 hover:bg-gray-600 hover:border-orange-600 
                            ${
                              activePath === 'all-users'
                                ? 'bg-gray-700 border-lime-600'
                                : 'border-gray-800'
                            }`}
          >
            <Link to="/dashboard/all-users" onClick={() => setIsOpen(false)}>
              Users
            </Link>
          </li>
          <li
            className={`pl-5 py-3 cursor-pointer border-l-4 hover:bg-gray-600 hover:border-orange-600 
                            ${
                              ['tours', 'create-tour'].includes(activePath)
                                ? 'bg-gray-700 border-lime-600'
                                : 'border-gray-800'
                            }`}
          >
            <Link to="/dashboard/tours" onClick={() => setIsOpen(false)}>
              Tours
            </Link>
          </li>
          <li
            className={`pl-5 py-3 cursor-pointer border-l-4 hover:bg-gray-600 hover:border-orange-600 
                            ${
                              activePath === 'orders'
                                ? 'bg-gray-700 border-lime-600'
                                : 'border-gray-800'
                            }`}
          >
            <Link to="/dashboard/orders" onClick={() => setIsOpen(false)}>
              Orders
            </Link>
          </li>
        </ul>
      </nav>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={toggleMenu}
        ></div>
      )}
    </div>
  );
};

export default Menu;
