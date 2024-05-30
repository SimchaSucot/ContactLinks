import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center flex-row-reverse">
          <div className="flex items-center">
            <div className="mr-6">
              <img src="/logo/logo_contactLinks_4.webp" alt="Logo" className="h-12" />
            </div>
          </div>
          <nav className="flex flex-1 justify-center flex-row-reverse space-x-reverse space-x-6">
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
              >
                {item.text}
              </Link>
            ))}
          </nav>
          <div className="flex items-center">
            <a href="#login" className="text-gray-700 hover:text-gray-900 ml-4 px-3 py-2 rounded-md text-sm font-medium">התחבר</a>
            <a href="#signup" className="text-gray-700 hover:text-gray-900 ml-4 px-3 py-2 rounded-md text-sm font-medium">הרשמה</a>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Home;
