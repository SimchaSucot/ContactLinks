import React, { useState, useEffect } from "react";
import "./EmailLinkGenerator.css";

const EmailLinkGenerator = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [link, setLink] = useState("");
  const [error, setError] = useState("");
  const [isLinkReady, setIsLinkReady] = useState(false);

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
    setIsLinkReady(false);
  };

  useEffect(() => {
    if (link) {
      const timer = setTimeout(() => {
        setIsLinkReady(true);
      }, link.length * 50); // זמן הקלדה משוער לפי אורך הקישור
      return () => clearTimeout(timer);
    }
  }, [link]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(link);
    alert("הקישור הועתק ללוח");
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="email-link-container mx-auto p-8 rounded-lg shadow-lg">
      <div className="email-link-content w-full md:w-1/2 text-right animate-fade-in">
        <h2 className="email-link-title text-3xl font-bold mb-6 text-blue-600 text-center">
          מחולל קישור אימייל
        </h2>
        <div className="email-link-input-group mb-6 text-right">
          <label className="email-link-label text-lg font-semibold text-gray-800 mb-2">
            כתובת אימייל
          </label>
          <input
            type="text"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            className="email-link-input w-full px-4 py-2 border border-gray-300 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="לדוגמה: someone@example.com"
          />
          {error && (
            <p className="email-link-error text-red-500 mt-2">{error}</p>
          )}
        </div>
        <div className="email-link-input-group mb-6 text-right">
          <label className="email-link-label text-lg font-semibold text-gray-800 mb-2">
            נושא
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="email-link-input w-full px-4 py-2 border border-gray-300 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="הקלד את נושא ההודעה כאן"
          />
        </div>
        <div className="email-link-input-group mb-6 text-right">
          <label className="email-link-label text-lg font-semibold text-gray-800 mb-2">
            הודעה
          </label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="email-link-input w-full px-4 py-2 border border-gray-300 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="הקלד את ההודעה כאן"
          />
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleGenerateLink}
            className="email-link-generate-button bg-blue-500 text-white px-6 py-3 rounded-lg mb-6 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            קבלת קישור
          </button>
        </div>
        {link && (
          <div className="email-link-link-container mt-6 text-center">
            <p className="email-link-link text-gray-800 break-words mb-4 typing-animation">
              {link}
            </p>
            {isLinkReady && (
              <button
                onClick={handleCopyLink}
                className="email-link-copy-button bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                העתקה
              </button>
            )}
          </div>
        )}
      </div>
      <div className="email-link-instructions w-full md:w-1/2 text-right animate-fade-in-fast">
        <h3 className="email-link-instructions-title text-lg font-bold mb-4 text-dark-blue">
          איך להשתמש במחולל קישור לאימייל
        </h3>
        <p className="email-link-instructions-text mb-2 animate-fade-in-fast">
          <strong>היי! רוצים לשלוח אימייל בקלות?</strong> הנה מדריך פשוט איך
          להשתמש במחולל הקישור לאימייל שלנו
        </p>
        <p className="email-link-instructions-text mb-2 animate-fade-in-fast">
          <strong>הזינו את כתובת האימייל</strong>
        </p>
        <ul className="email-link-instructions-list mb-2 text-right animate-fade-in-fast">
          <li>
            בשדה הראשון, רשמו את כתובת האימייל שאליה אתם רוצים לשלוח את ההודעה
          </li>
        </ul>
        <p className="email-link-instructions-text mb-2 animate-fade-in-fast">
          <strong>כתבו את נושא ההודעה</strong>
        </p>
        <ul className="email-link-instructions-list mb-2 text-right animate-fade-in-fast">
          <li>בשדה השני, כתבו את נושא ההודעה שלכם</li>
        </ul>
        <p className="email-link-instructions-text mb-2 animate-fade-in-fast">
          <strong>כתבו את תוכן ההודעה</strong>
        </p>
        <ul className="email-link-instructions-list mb-2 text-right animate-fade-in-fast">
          <li>בשדה השלישי, כתבו את תוכן ההודעה שאתם רוצים לשלוח</li>
        </ul>
        <p className="email-link-instructions-text mb-2 animate-fade-in-fast">
          <strong>לחצו על קבלת קישור</strong>
        </p>
        <ul className="email-link-instructions-list mb-2 text-right animate-fade-in-fast">
          <li>לחצו על הכפתור קבלת קישור</li>
          <li>אם הכל בסדר, ייווצר קישור לאימייל שיופיע מתחת לכפתור</li>
        </ul>
        <p className="email-link-instructions-text mb-2 animate-fade-in-fast">
          <strong>העתיקו את הקישור</strong>
        </p>
        <ul className="email-link-instructions-list mb-2 text-right animate-fade-in-fast">
          <li>אחרי שהקישור נוצר, לחצו על כפתור "העתקה" כדי להעתיק אותו ללוח</li>
          <li>תקבלו הודעה שהקישור הועתק ללוח</li>
        </ul>
      </div>
    </div>
  );
};

export default EmailLinkGenerator;
