import React, { useState, useEffect } from "react";
import "./PhoneLinkGenerator.css";

const PhoneLinkGenerator = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [link, setLink] = useState("");
  const [error, setError] = useState("");
  const [isLinkReady, setIsLinkReady] = useState(false);

  const handleGenerateLink = () => {
    if (!validatePhoneNumber(phoneNumber)) {
      setError("המספר שהוזן אינו תקין. אנא בדוק ונסה שוב.");
      return;
    }
    setError("");
    const phoneLink = `tel:${phoneNumber}`;
    setLink(phoneLink);
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

  const validatePhoneNumber = (number) => {
    const phoneRegex = /^\d{1,3}\d{9,10}$/;
    return phoneRegex.test(number);
  };

  return (
    <div className="phone-link-container mx-auto p-8 rounded-lg shadow-lg">
      <div className="phone-link-content w-full md:w-1/2 text-right animate-fade-in">
        <h2 className="phone-link-title text-3xl font-bold mb-6 text-blue-600 text-center">
          מחולל קישור טלפון
        </h2>
        <div className="phone-link-input-group mb-6 text-right">
          <label className="phone-link-label text-lg font-semibold text-gray-800 mb-2">
            מספר טלפון (כולל קוד מדינה)
          </label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="phone-link-input w-full px-4 py-2 border border-gray-300 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="לדוגמה: 972501234567"
          />
          {error && (
            <p className="phone-link-error text-red-500 mt-2">{error}</p>
          )}
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleGenerateLink}
            className="phone-link-generate-button bg-blue-500 text-white px-6 py-3 rounded-lg mb-6 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            קבלת קישור
          </button>
        </div>
        {link && (
          <div className="phone-link-link-container mt-6 text-center">
            <p className="phone-link-link text-gray-800 break-words mb-4 typing-animation">
              {link}
            </p>
            {isLinkReady && (
              <button
                onClick={handleCopyLink}
                className="phone-link-copy-button bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                העתקה
              </button>
            )}
          </div>
        )}
      </div>
      <div className="phone-link-instructions w-full md:w-1/2 text-right animate-fade-in-fast">
        <h3 className="phone-link-instructions-title text-lg font-bold mb-4 text-dark-blue">
          איך להשתמש במחולל קישור טלפון
        </h3>
        <p className="phone-link-instructions-text mb-2 animate-fade-in-fast">
          <strong>היי! רוצים להתקשר בקלות?</strong> הנה מדריך פשוט איך להשתמש
          במחולל הקישור לטלפון שלנו
        </p>
        <p className="phone-link-instructions-text mb-2 animate-fade-in-fast">
          <strong>הזינו את מספר הטלפון</strong>
        </p>
        <ul className="phone-link-instructions-list mb-2 text-right animate-fade-in-fast">
          <li>בשדה הראשון, רשמו את מספר הטלפון כולל קוד המדינה</li>
          <li>לדוגמה: אם המספר שלכם ישראלי, כתבו 972501234567</li>
        </ul>
        <p className="phone-link-instructions-text mb-2 animate-fade-in-fast">
          <strong>לחצו על קבלת קישור</strong>
        </p>
        <ul className="phone-link-instructions-list mb-2 text-right animate-fade-in-fast">
          <li>לחצו על הכפתור קבלת קישור</li>
          <li>אם הכל בסדר, ייווצר קישור טלפון שיופיע מתחת לכפתור</li>
        </ul>
        <p className="phone-link-instructions-text mb-2 animate-fade-in-fast">
          <strong>העתיקו את הקישור</strong>
        </p>
        <ul className="phone-link-instructions-list mb-2 text-right animate-fade-in-fast">
          <li>אחרי שהקישור נוצר, לחצו על כפתור "העתקה" כדי להעתיק אותו ללוח</li>
          <li>תקבלו הודעה שהקישור הועתק ללוח</li>
        </ul>
      </div>
    </div>
  );
};

export default PhoneLinkGenerator;
