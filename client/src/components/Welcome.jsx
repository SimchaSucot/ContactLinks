import React from "react";

const Welcome = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white max-w-4xl mx-auto p-8 rounded-lg shadow-lg text-center transform transition duration-500 hover:scale-105">
        <h1 className="text-4xl text-gray-800 mb-4 font-bold">
          ברוכים הבאים לאתר קישורים קלים לתקשורת
        </h1>
        <p className="text-xl text-gray-700 mb-6">
          האתר שלנו נועד לעזור לכם ליצור קישורים מהירים ויעילים לתקשורת עם אנשים
          חשובים בחייכם.
        </p>
        <ul className="list-none p-0 space-y-4">
          <li className="bg-blue-600 text-white py-4 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
            יצירת קישורים ישירים למספרי טלפון
          </li>
          <li className="bg-green-600 text-white py-4 px-6 rounded-lg shadow-md hover:bg-green-700 transition duration-300">
            שליחת הודעות בוואטסאפ בלחיצת כפתור
          </li>
          <li className="bg-red-600 text-white py-4 px-6 rounded-lg shadow-md hover:bg-red-700 transition duration-300">
            שליחת מיילים בצורה מהירה
          </li>
          <li className="bg-purple-600 text-white py-4 px-6 rounded-lg shadow-md hover:bg-purple-700 transition duration-300">
            הוספת קישורים לרשתות חברתיות כמו פייסבוק, לינקדאין, טוויטר ועוד
          </li>
        </ul>
        <p className="text-xl text-gray-700 mt-6">
          באתר תוכלו להגדיר את הקישורים שלכם בצורה פשוטה ומהירה, ולשתף אותם עם
          כל מי שתרצו.
        </p>
        <a
          href="#"
          className="inline-block bg-gradient-to-r from-green-400 to-blue-500 text-white mt-6 py-3 px-8 rounded-lg shadow-lg hover:from-green-500 hover:to-blue-600 transition duration-300 transform hover:-translate-y-1"
        >
          התחל עכשיו
        </a>
      </div>
    </div>
  );
};

export default Welcome;
