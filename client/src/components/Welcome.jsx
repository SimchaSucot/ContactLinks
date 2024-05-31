// Welcome.jsx
import React from 'react';
import './Welcome.css'; // Assuming you have a CSS file for custom styles
import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <div className="bg-blue-50 text-blue-900 leading-relaxed flex items-center justify-center min-h-screen relative m-0 p-0">
      <div className="absolute inset-0 bg-logo bg-cover bg-center"></div>
      <div className="relative max-w-4xl mx-auto p-4 text-center mt-0" style={{ marginTop: '-3cm' }}>
        <h1 className="text-4xl md:text-6xl font-bold fade-in">ברוכים הבאים ל</h1>
        <h1 className="text-4xl md:text-6xl font-bold fade-in">Contact Links</h1>
        <p className="mt-4 text-xl md:text-2xl scroll-text">
          האתר שלנו מספק דרך קלה ליצור ולשתף קישורי קשר חשובים. תוכלו לשמור את כל הקישורים שלכם במקום אחד,
          ולשתף אותם בקלות עם אחרים. המערכת מאפשרת לנהל קישורים בצורה חכמה ויעילה, עם ממשק משתמש מודרני ודינמי
        </p>
        <p className="mt-4 text-xl md:text-2xl scroll-text">
          בין אם אתם אנשי מקצוע שרוצים לשתף קישורים ללקוחות, או פשוט משתמשים פרטיים שמחפשים דרך נוחה ליצור את קישורי הקשר שלכם
           כאן הפתרון המושלם עבורכם
        </p>
        <div className="floating-buttons mt-8 flex-row-reverse">
          <Link to="/email-link" className="menu-button fade-in-delay">קישור לאימייל</Link>
          <Link to="/whatsapp-link" className="menu-button fade-in-delay">קישור לוואצאפ</Link>
          <Link to="/phone-link" className="menu-button fade-in-delay">קישור לטלפון</Link>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
