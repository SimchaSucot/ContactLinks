// SignupModal.jsx
import React, { useState } from 'react';
import LoginWithGoogle from './LoginWithGoogle';

const SignupModal = ({ onClose }) => {
  const [isGoogleLogin, setIsGoogleLogin] = useState(false);

  const toggleGoogleLogin = () => {
    setIsGoogleLogin(!isGoogleLogin);
  };

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {isGoogleLogin ? (
        <LoginWithGoogle onClose={onClose} />
      ) : (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
          onClick={handleOutsideClick}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <h2 className="text-2xl font-semibold mb-4 text-center">הרשמה</h2>
            <form>
              <div className="mb-4 text-right">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  שם
                </label>
                <input
                  type="text"
                  id="name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right"
                  placeholder="הכנס שם"
                />
              </div>
              <div className="mb-4 text-right">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  מייל
                </label>
                <input
                  type="email"
                  id="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right"
                  placeholder="הכנס מייל"
                />
              </div>
              <div className="mb-4 text-right">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                  טלפון
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right"
                  placeholder="הכנס טלפון"
                />
              </div>
              <div className="mb-6 text-right">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  סיסמא
                </label>
                <input
                  type="password"
                  id="password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline text-right"
                  placeholder="******"
                />
              </div>
              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  הרשמה
                </button>
              </div>
            </form>
            <div className="mt-6">
              <button
                onClick={toggleGoogleLogin}
                className="flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="google"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 488 512"
                >
                  <path
                    fill="currentColor"
                    d="M488 261.8C488 403.3 391.1 502.7 244.7 502.7 108.9 502.7 0 393.8 0 257S108.9 11.3 244.7 11.3c66.1 0 125.2 24.8 171.2 64.7l-69.4 69.5c-23-21.3-54.5-34.4-101.8-34.4-86.9 0-157.4 72.4-157.4 159.4s70.5 159.4 157.4 159.4c84.6 0 130.6-46.3 136-111.8H244.7V261.8H488z"
                  ></path>
                </svg>
                הרשמה עם גוגל
              </button>
            </div>
            <button
              className="absolute top-0 right-0 mt-4 mr-4 text-gray-700 hover:text-gray-900"
              onClick={onClose}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SignupModal;
