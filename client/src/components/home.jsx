import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        console.log('User is signed in:', user);
        console.log('Profile Picture URL:', user.photoURL);
      } else {
        console.log('No user is signed in');
      }
    });
    return () => unsubscribe();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const openSignupModal = () => {
    setIsSignupModalOpen(true);
    setIsLoginModalOpen(false);
  };

  const closeSignupModal = () => {
    setIsSignupModalOpen(false);
  };

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      setUser(null);
      console.log('User signed out');
    }).catch((error) => {
      console.error('Error signing out:', error);
    });
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
              { text: 'הורדת שירים מיוטיוב', path: '/youTube-downloader' },
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
          <div className="flex items-center">
            <button
              className="md:hidden text-gray-700 focus:outline-none mr-2"
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
            {user && (
              <img
                src={user.photoURL || 'default-profile.png'}
                alt="Profile"
                className="h-8 w-8 rounded-full md:hidden"
                onError={(e) => e.target.src = 'default-profile.png'}
              />
            )}
          </div>
          <div className="hidden md:flex items-center flex-row-reverse">
            {user ? (
              <>
                <img src={user.photoURL || 'default-profile.png'} alt="Profile" className="h-8 w-8 rounded-full mr-2" onError={(e) => e.target.src = 'default-profile.png'} />
                <span className="text-gray-700 ml-4 px-3 py-2 rounded-md text-sm font-medium">
                  שלום, {user.displayName}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white hover:bg-red-700 ml-4 px-3 py-2 rounded-md text-sm font-medium"
                >
                  התנתקות
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={openLoginModal}
                  className="bg-pink-500 text-white hover:bg-pink-700 ml-4 px-3 py-2 rounded-md text-sm font-medium"
                >
                  כניסה
                </button>
                <button
                  onClick={openSignupModal}
                  className="border border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white ml-4 px-3 py-2 rounded-md text-sm font-medium"
                >
                  הצטרפות
                </button>
              </>
            )}
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
                { text: 'הורדת שירים מיוטיוב', path: '/youTube-downloader' },
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
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white hover:bg-red-700 mb-2 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    התנתקות
                  </button>
                ) : (
                  <>
                    <button
                      onClick={openLoginModal}
                      className="bg-pink-500 text-white hover:bg-pink-700 mb-2 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      כניסה
                    </button>
                    <button
                      onClick={openSignupModal}
                      className="border border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      הצטרפות
                    </button>
                  </>
                )}
              </div>
            </div>
          </nav>
        )}
      </header>
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
      {isLoginModalOpen && <LoginModal onClose={closeLoginModal} openSignupModal={openSignupModal} />}
      {isSignupModalOpen && <SignupModal onClose={closeSignupModal} />}
    </div>
  );
};

export default Home;
