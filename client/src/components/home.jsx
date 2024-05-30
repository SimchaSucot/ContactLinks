// Home.jsx

import React, { useState } from 'react';
import Welcome from './Welcome';
import EmailLinkGenerator from './EmailLinkGenerator';
import WhatsappLinkGenerator from './WhatsappLinkGenerator';
import PhoneLinkGenerator from './PhoneLinkGenerator';

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
              <img src="/logo/logo_contactLinks_4.webp" alt="Logo" className="h-12" />
            </div>
          </div>
          <nav className="flex flex-1 justify-center flex-row-reverse space-x-reverse space-x-6">
            {[
              { text: 'ראשי', component: 'welcome' },
              { text: 'קישור לאימייל', component: 'emailLinkGenerator' },
              { text: 'קישור לוואצאפ', component: 'whatsappLinkGenerator' },
              { text: 'קישור לטלפון', component: 'phoneLinkGenerator' },
            //   { text: 'תפוצה חכמה באימייל/וואצאפ', component: 'smartDistribution' },
            //   { text: 'כפתור 6', component: 'button6' },
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
        {activeComponent === 'emailLinkGenerator' && <EmailLinkGenerator />}
        {activeComponent === 'whatsappLinkGenerator' && <WhatsappLinkGenerator />}
        {activeComponent === 'phoneLinkGenerator' && <PhoneLinkGenerator />}
        {/* הוסף עוד תנאים עבור הקומפוננטות הנוספות */}
      </main>
    </div>
  );
};

export default Home;
