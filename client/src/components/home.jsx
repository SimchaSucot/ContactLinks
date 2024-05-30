import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center flex-row-reverse">
          <div className="flex items-center">
            <div className="mr-6">
              <img src="/logo/logo_contactLinks_4.webp" alt="Logo" className="h-12" />
            </div>
          </div>
          <nav className="hidden md:flex flex-1 justify-center flex-row-reverse space-x-reverse space-x-6">
            {[
              { text: 'ראשי', path: '/' },
              { text: 'קישור לאימייל', path: '/email-link' },
              { text: 'קישור לוואצאפ', path: '/whatsapp-link' },
              { text: 'קישור לטלפון', path: '/phone-link' },
            ].map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition duration-300 hover:bg-blue-500 hover:text-white"
                onClick={closeMenu}
              >
                {item.text}
              </Link>
            ))}
          </nav>
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
          <div className="hidden md:flex items-center">
            <a href="#login" className="text-gray-700 hover:text-gray-900 ml-4 px-3 py-2 rounded-md text-sm font-medium">התחבר</a>
            <a href="#signup" className="text-gray-700 hover:text-gray-900 ml-4 px-3 py-2 rounded-md text-sm font-medium">הרשמה</a>
          </div>
        </div>
        {isMenuOpen && (
          <nav className="md:hidden bg-white shadow-lg absolute top-0 right-0 w-full z-50">
            <div className="container mx-auto px-4 py-4">
              {[
                { text: 'ראשי', path: '/' },
                { text: 'קישור לאימייל', path: '/email-link' },
                { text: 'קישור לוואצאפ', path: '/whatsapp-link' },
                { text: 'קישור לטלפון', path: '/phone-link' },
              ].map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="block text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition duration-300 hover:bg-blue-500 hover:text-white"
                  onClick={closeMenu}
                >
                  {item.text}
                </Link>
              ))}
              <div className="flex flex-col mt-4">
                <a href="#login" className="text-gray-700 hover:text-gray-900 mb-2 px-3 py-2 rounded-md text-sm font-medium">התחבר</a>
                <a href="#signup" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">הרשמה</a>
              </div>
            </div>
          </nav>
        )}
      </header>
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Home;
