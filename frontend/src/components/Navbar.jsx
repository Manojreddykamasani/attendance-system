import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-gray-800 text-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Website Name / Logo */}
        <div className="text-2xl font-bold">
          <Link to="/" className="text-sky-500 hover:text-sky-300">EduPulse</Link>
        </div>

        {/* Desktop Navbar items */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-sky-300">Home</Link>
          <Link to="/about" className="hover:text-sky-300">About</Link>
          <Link to="/services" className="hover:text-sky-300">Services</Link>
          <Link to="/contact" className="hover:text-sky-300">Contact</Link>
        </div>

        {/* Login Button for desktop */}
        <div className="hidden md:block">
          <button 
            onClick={() => console.log("Login clicked")} // You can implement this function later
            className="bg-sky-500 hover:bg-sky-400 text-white py-2 px-4 rounded-lg transition-all">
            Login
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-700 p-4">
          <Link to="/" className="block text-white py-2">Home</Link>
          <Link to="/about" className="block text-white py-2">About</Link>
          <Link to="/services" className="block text-white py-2">Services</Link>
          <Link to="/contact" className="block text-white py-2">Contact</Link>

          {/* Mobile Login Button */}
          <button 
            onClick={() => console.log("Login clicked")} 
            className="bg-sky-500 hover:bg-sky-400 text-white w-full py-2 px-4 rounded-lg mt-4">
            Login
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
