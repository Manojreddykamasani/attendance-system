import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-8">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} EduPulse. All rights reserved.
        </p>
        <div className="mt-4 space-x-6">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:text-sky-300">
            Facebook
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:text-sky-300">
            Twitter
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:text-sky-300">
            LinkedIn
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:text-sky-300">
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
