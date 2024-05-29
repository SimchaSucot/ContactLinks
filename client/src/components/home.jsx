// Home.jsx

import React, { useState } from 'react';
import Welcome from './Welcome';
// import WhatsappGenerator from './WhatsappGenerator';
import WhatsappLinkGenerator from './WhatsappLinkGenerator';

const Home = () => {
  const [activeButton, setActiveButton] = useState(null);
  const [activeComponent, setActiveComponent] = useState('welcome');

  const handleButtonClick = (componentName, index) => {
    setActiveButton(index);
    setActiveComponent(componentName);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center flex-row-reverse">
          <div className="flex items-center">
            <div className="mr-6">
              <img src="path_to_logo.png" alt="Logo" className="h-10" />
            </div>
          </div>
          <nav className="flex flex-1 justify-center flex-row-reverse space-x-reverse space-x-6">
            {[
              { text: 'ראשי', component: 'welcome' },
              { text: 'מחולל אימייל', component: 'emailGenerator' },
              { text: 'קישור וואצאפ', component: 'whatsappLinkGenerator' },
              { text: 'מחולל טלפון', component: 'phoneGenerator' },
              { text: 'תפוצה חכמה באימייל/וואצאפ', component: 'smartDistribution' },
              { text: 'כפתור 6', component: 'button6' },
            ].map((item, index) => (
              <a
                key={index}
                href="#!"
                onClick={() => handleButtonClick(item.component, index)}
                className={`text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition duration-300 ${
                  activeButton === index ? 'bg-blue-500 text-white' : 'hover:bg-blue-500 hover:text-white'
                }`}
              >
                {item.text}
              </a>
            ))}
          </nav>
          <div className="flex items-center">
            <a href="#login" className="text-gray-700 hover:text-gray-900 ml-4 px-3 py-2 rounded-md text-sm font-medium">התחבר</a>
            <a href="#signup" className="text-gray-700 hover:text-gray-900 ml-4 px-3 py-2 rounded-md text-sm font-medium">הרשמה</a>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {activeComponent === 'welcome' && <Welcome />}
        {activeComponent === 'whatsappLinkGenerator' && <WhatsappLinkGenerator />}
        {/* הוסף עוד תנאים עבור הקומפוננטות הנוספות */}
      </main>
    </div>
  );
};

export default Home;
