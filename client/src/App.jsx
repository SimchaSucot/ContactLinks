// import './tailwind.css';
// import Home from "./components/home";

// export default function App() {
//   return (
//     <>
//       <Home />
//     </>
//   );
// }
// App.jsx
import './tailwind.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home';
import EmailLinkGenerator from './components/EmailLinkGenerator';
import WhatsappLinkGenerator from './components/WhatsappLinkGenerator';
import PhoneLinkGenerator from './components/PhoneLinkGenerator';
import Welcome from './components/Welcome';
import YouTubeDownloader from './components/YouTubeDownloader';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Welcome />} />
          <Route path="email-link" element={<EmailLinkGenerator />} />
          <Route path="whatsapp-link" element={<WhatsappLinkGenerator />} />
          <Route path="phone-link" element={<PhoneLinkGenerator />} />
          <Route path="youTube-downloader" element={<YouTubeDownloader />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
