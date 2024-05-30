// EmailLinkGenerator.jsx

import React, { useState } from "react";

const EmailLinkGenerator = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [link, setLink] = useState("");
  const [error, setError] = useState("");

  const handleGenerateLink = () => {
    if (!validateEmail(emailAddress)) {
      setError("כתובת האימייל שהוזנה אינה תקינה. אנא בדוק ונסה שוב.");
      return;
    }
    setError("");
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    const emailLink = `mailto:${emailAddress}?subject=${encodedSubject}&body=${encodedBody}`;
    setLink(emailLink);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(link);
    alert("הקישור הועתק ללוח");
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="flex flex-wrap justify-center items-start max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <div className="flex w-full md:flex-row flex-col">
        <div className="w-full md:w-1/2 bg-gray-200 p-4 rounded-lg md:mr-4 mb-4 md:mb-0 text-right">
          <h2 className="text-3xl font-bold mb-6 text-blue-600 text-center">
            מחולל קישור אימייל
          </h2>
          <div className="mb-6 text-right">
            <label className="block text-lg font-semibold text-gray-800 mb-2">
              כתובת אימייל
            </label>
            <input
              type="text"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="לדוגמה: someone@example.com"
            />
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
          <div className="mb-6 text-right">
            <label className="block text-lg font-semibold text-gray-800 mb-2">
              נושא
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="הקלד את נושא ההודעה כאן"
            />
          </div>
          <div className="mb-6 text-right">
            <label className="block text-lg font-semibold text-gray-800 mb-2">
              הודעה
            </label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="הקלד את ההודעה כאן"
            />
          </div>
          <div className="flex justify-center">
          <button
            onClick={handleGenerateLink}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg mb-6 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            קבלת קישור
          </button>
          </div>
          {link && (
            <div className="mt-6 text-center">
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
        <div className="w-full md:w-1/2 bg-gray-100 p-4 rounded-lg md:ml-4 mb-4 md:mb-0 text-right">
          <h3 className="text-xl font-bold mb-4 text-blue-500">
            איך להשתמש במחולל קישור לאימייל
          </h3>
          <p className="mb-2">
            <strong>היי! רוצים לשלוח אימייל בקלות?</strong> הנה מדריך פשוט איך להשתמש במחולל הקישור לאימייל שלנו
          </p>
          <p className="mb-2">
            <strong>הזינו את כתובת האימייל</strong>
          </p>
          <ul className="list-none mb-2 text-right">
            <li>בשדה הראשון, רשמו את כתובת האימייל שאליה אתם רוצים לשלוח את ההודעה</li>
          </ul>
          <p className="mb-2">
            <strong>כתבו את נושא ההודעה</strong>
          </p>
          <ul className="list-none mb-2 text-right">
            <li>בשדה השני, כתבו את נושא ההודעה שלכם</li>
          </ul>
          <p className="mb-2">
            <strong>כתבו את תוכן ההודעה</strong>
          </p>
          <ul className="list-none mb-2 text-right">
            <li>בשדה השלישי, כתבו את תוכן ההודעה שאתם רוצים לשלוח</li>
          </ul>
          <p className="mb-2">
            <strong>לחצו על קבלת קישור</strong>
          </p>
          <ul className="list-none mb-2 text-right">
            <li>לחצו על הכפתור קבלת קישור</li>
            <li>אם הכל בסדר, ייווצר קישור לאימייל שיופיע מתחת לכפתור</li>
          </ul>
          <p className="mb-2">
            <strong>העתיקו את הקישור</strong>
          </p>
          <ul className="list-none mb-2 text-right">
            <li>אחרי שהקישור נוצר, לחצו על כפתור "העתקה" כדי להעתיק אותו ללוח</li>
            <li>תקבלו הודעה שהקישור הועתק ללוח</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EmailLinkGenerator;
