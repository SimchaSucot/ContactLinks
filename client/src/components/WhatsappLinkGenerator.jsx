import React, { useState, useEffect } from "react";
import "./WhatsappLinkGenerator.css";

const WhatsappLinkGenerator = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [link, setLink] = useState("");
  const [error, setError] = useState("");
  const [isLinkReady, setIsLinkReady] = useState(false);

  const handleGenerateLink = () => {
    if (!validatePhoneNumber(phoneNumber)) {
      setError("המספר שהוזן אינו תקין. אנא בדוק ונסה שוב.");
      return;
    }
    setError("");
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    setLink(whatsappLink);
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
    const phoneRegex = /^\d{1,3}\d{9,10}$/; // בדיקה שמספר הטלפון כולל קוד מדינה ומורכב מ-10-12 ספרות
    return phoneRegex.test(number);
  };

  return (
    <div className="whatsapp-link-container mx-auto p-8 rounded-lg shadow-lg">
      <div className="whatsapp-link-content w-full md:w-1/2 text-right animate-fade-in">
        <h2 className="whatsapp-link-title text-3xl font-bold mb-6 text-blue-600 text-center">
          מחולל קישור וואצאפ
        </h2>
        <div className="whatsapp-link-input-group mb-6 text-right">
          <label className="whatsapp-link-label text-lg font-semibold text-gray-800 mb-2">
            מספר וואצאפ (כולל קוד מדינה)
          </label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="whatsapp-link-input w-full px-4 py-2 border border-gray-300 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="לדוגמה: 972501234567"
          />
          {error && (
            <p className="whatsapp-link-error text-red-500 mt-2">{error}</p>
          )}
        </div>
        <div className="whatsapp-link-input-group mb-6 text-right">
          <label className="whatsapp-link-label text-lg font-semibold text-gray-800 mb-2">
            הודעה
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="whatsapp-link-input w-full px-4 py-2 border border-gray-300 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="הקלד את ההודעה כאן"
          />
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleGenerateLink}
            className="whatsapp-link-generate-button bg-blue-500 text-white px-6 py-3 rounded-lg mb-6 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            קבלת קישור
          </button>
        </div>
        {link && (
          <div className="whatsapp-link-link-container mt-6 text-center">
            <p className="whatsapp-link-link text-gray-800 break-words mb-4 typing-animation">
              {link}
            </p>
            {isLinkReady && (
              <button
                onClick={handleCopyLink}
                className="whatsapp-link-copy-button bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                העתקה
              </button>
            )}
          </div>
        )}
      </div>
      <div className="whatsapp-link-instructions w-full md:w-1/2 text-right animate-fade-in-fast">
        <h3 className="whatsapp-link-instructions-title text-lg font-bold mb-4 text-dark-blue">
          איך להשתמש במחולל קישור לוואצאפ
        </h3>
        <p className="whatsapp-link-instructions-text mb-2 animate-fade-in-fast">
          <strong>היי! רוצים לשלוח הודעת וואצאפ בקלות?</strong> הנה מדריך פשוט
          איך להשתמש במחולל הקישור לוואצאפ שלנו
        </p>
        <p className="whatsapp-link-instructions-text mb-2 animate-fade-in-fast">
          <strong>הזינו את מספר הוואצאפ</strong>
        </p>
        <ul className="whatsapp-link-instructions-list mb-2 text-right animate-fade-in-fast">
          <li>בשדה הראשון, רשמו את מספר הוואצאפ כולל קוד המדינה</li>
          <li>לדוגמה: אם המספר שלכם ישראלי, כתבו 972501234567</li>
        </ul>
        <p className="whatsapp-link-instructions-text mb-2 animate-fade-in-fast">
          <strong>כתבו את ההודעה</strong>
        </p>
        <ul className="whatsapp-link-instructions-list mb-2 text-right animate-fade-in-fast">
          <li>בשדה השני, כתבו את ההודעה שאתם רוצים לשלוח</li>
          <li>אפשר להקליד כל טקסט שתרצו לשלוח למספר הוואצאפ</li>
          <li>אפשר גם לשלוח ללא הודעה</li>
        </ul>
        <p className="whatsapp-link-instructions-text mb-2 animate-fade-in-fast">
          <strong>לחצו על קבלת קישור</strong>
        </p>
        <ul className="whatsapp-link-instructions-list mb-2 text-right animate-fade-in-fast">
          <li>לחצו על הכפתור קבלת קישור</li>
          <li>אם הכל בסדר, ייווצר קישור לוואצאפ שיופיע מתחת לכפתור</li>
        </ul>
        <p className="whatsapp-link-instructions-text mb-2 animate-fade-in-fast">
          <strong>העתיקו את הקישור</strong>
        </p>
        <ul className="whatsapp-link-instructions-list mb-2 text-right animate-fade-in-fast">
          <li>אחרי שהקישור נוצר, לחצו על כפתור "העתקה" כדי להעתיק אותו ללוח</li>
          <li>תקבלו הודעה שהקישור הועתק ללוח</li>
        </ul>
      </div>
    </div>
  );
};

export default WhatsappLinkGenerator;
