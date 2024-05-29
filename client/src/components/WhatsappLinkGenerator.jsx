// WhatsappLinkGenerator.jsx

import React, { useState } from 'react';

const WhatsappLinkGenerator = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [link, setLink] = useState('');
  const [error, setError] = useState('');

  const handleGenerateLink = () => {
    if (!validatePhoneNumber(phoneNumber)) {
      setError('המספר שהוזן אינו תקין. אנא בדוק ונסה שוב.');
      return;
    }
    setError('');
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    setLink(whatsappLink);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(link);
    alert('הקישור הועתק ללוח');
  };

  const validatePhoneNumber = (number) => {
    const phoneRegex = /^\d{1,3}\d{9,10}$/; // בדיקה שמספר הטלפון כולל קוד מדינה ומורכב מ-10-12 ספרות
    return phoneRegex.test(number);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg text-center">
      <h2 className="text-3xl font-bold mb-6 text-blue-600">מחולל קישור וואצאפ</h2>
      <div className="mb-6 text-right">
        <label className="block text-lg font-semibold text-gray-800 mb-2">מספר וואצאפ (כולל קוד מדינה)</label>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="לדוגמה: 972501234567"
        />
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
      <div className="mb-6 text-right">
        <label className="block text-lg font-semibold text-gray-800 mb-2">הודעה</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="הקלד את ההודעה כאן"
        />
      </div>
      <button
        onClick={handleGenerateLink}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg mb-6 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        קבלת קישור
      </button>
      {link && (
        <div className="mt-6">
          <p className="text-gray-800 break-words mb-4">{link}</p>
          <button
            onClick={handleCopyLink}
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            העתקה
          </button>
        </div>
      )}
    </div>
  );
};

export default WhatsappLinkGenerator;
