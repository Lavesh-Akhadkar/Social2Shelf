import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-[#212121] w-full text-[#F7F7F7]">
      {/* Navbar Container */}
      <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <img
            className="w-24 rounded-lg"
            src="../megaLogo.jpg"
            alt="Logo"
          />
        </div>

        {/* Hamburger Icon for Small Screens */}
        <button
          onClick={toggleMenu}
          className="inline-flex items-center p-2 text-[#F7F7F7] rounded-lg md:hidden hover:bg-[#7E57C2] focus:outline-none focus:ring-2 focus:ring-[#7E57C2]"
        >
          <span className="sr-only">Open Menu</span>
          <i className="bi bi-list text-2xl"></i>
        </button>

        {/* Navbar Links (Hidden on Small Screens) */}
        <div className="hidden md:flex items-center space-x-8">
          <NavLink
            to="home"
            className={({ isActive }) =>
              `flex items-center space-x-2 px-3 py-2 rounded-md ${isActive ? 'bg-[#7E57C2]' : ''}`
            }
          >
            <i className="bi bi-house-fill text-xl"></i>
            <span>Home</span>
          </NavLink>
          <NavLink
            to="analytics"
            className={({ isActive }) =>
              `flex items-center space-x-2 px-3 py-2 rounded-md ${isActive ? 'bg-[#7E57C2]' : ''}`
            }
          >
            <i className="bi bi-bar-chart-line-fill text-xl"></i>
            <span>Analytics</span>
          </NavLink>
          <NavLink
            to="account"
            className={({ isActive }) =>
              `flex items-center space-x-2 px-3 py-2 rounded-md ${isActive ? 'bg-[#7E57C2]' : ''}`
            }
          >
            <i className="bi bi-person-fill text-xl"></i>
            <span>Account</span>
          </NavLink>
          <div className="flex items-center space-x-2 px-3 py-2 rounded-md">
            <i className="bi bi-box-arrow-left text-xl"></i>
            <span>Log Out</span>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Shown When Hamburger Icon is Clicked) */}
      {isMenuOpen && (
        <div className="flex flex-col md:hidden space-y-2 p-4">
          <NavLink
            to="home"
            className={({ isActive }) =>
              `flex items-center space-x-2 px-3 py-2 rounded-md ${isActive ? 'bg-[#7E57C2]' : ''}`
            }
            onClick={() => setIsMenuOpen(false)} // Close menu on link click
          >
            <i className="bi bi-house-fill text-xl"></i>
            <span>Home</span>
          </NavLink>
          <NavLink
            to="analytics"
            className={({ isActive }) =>
              `flex items-center space-x-2 px-3 py-2 rounded-md ${isActive ? 'bg-[#7E57C2]' : ''}`
            }
            onClick={() => setIsMenuOpen(false)} // Close menu on link click
          >
            <i className="bi bi-bar-chart-line-fill text-xl"></i>
            <span>Analytics</span>
          </NavLink>
          <NavLink
            to="account"
            className={({ isActive }) =>
              `flex items-center space-x-2 px-3 py-2 rounded-md ${isActive ? 'bg-[#7E57C2]' : ''}`
            }
            onClick={() => setIsMenuOpen(false)} // Close menu on link click
          >
            <i className="bi bi-person-fill text-xl"></i>
            <span>Account</span>
          </NavLink>
          <div className="flex items-center space-x-2 px-3 py-2 rounded-md">
            <i className="bi bi-box-arrow-left text-xl"></i>
            <span>Log Out</span>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
