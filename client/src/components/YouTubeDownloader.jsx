import React, { useState } from 'react';
import axios from 'axios';
import './YouTubeDownloader.css';

const YouTubeDownloader = () => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [videoInfo, setVideoInfo] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!url) {
      setError('אנא הזן קישור.');
      return;
    }
    setError('');
    setIsDownloading(true);

    try {
      const response = await axios.post('https://contactlinks.onrender.com/download', { url });
      const data = response.data;

      if (response.status !== 200) {
        setError(data.message);
        setIsDownloading(false);
        return;
      }

      setVideoInfo({
        title: data.title,
        uploadDate: data.uploadDate,
        viewCount: data.viewCount,
        videoPath: data.videoPath,
      });

      setIsDownloading(false);
    } catch (error) {
      setError('התרחשה שגיאה בעיבוד בקשתך. אנא נסה שוב מאוחר יותר.');
      setIsDownloading(false);
    }
  };

  const handleDownloadClick = async () => {
    try {
      const response = await axios.get(`https://contactlinks.onrender.com${videoInfo.videoPath}`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', videoInfo.title ? `${videoInfo.title}.mp4` : 'video.mp4');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      setError('התרחשה שגיאה בהורדת הסרטון.');
    }
  };

  const handleShareClick = async () => {
    try {
      const response = await axios.get(`https://contactlinks.onrender.com${videoInfo.videoPath}`, {
        responseType: 'blob',
      });
      const file = new File([response.data], videoInfo.title ? `${videoInfo.title}.mp4` : 'video.mp4', { type: 'video/mp4' });

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result.split(',')[1];
        const blobUrl = `data:video/mp4;base64,${base64data}`;
        
        if (navigator.share) {
          navigator.share({
            title: videoInfo.title,
            files: [file],
          }).catch((error) => console.error('Error sharing:', error));
        } else {
          alert('שיתוף קבצים לא נתמך בדפדפן זה.');
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      setError('התרחשה שגיאה בהורדת הסרטון לשיתוף.');
    }
  };

  return (
    <div className="youtube-downloader-container mx-auto p-8 rounded-lg shadow-lg">
      <div className="youtube-downloader-content w-full md:w-1/2 text-right animate-fade-in">
        <h2 className="youtube-downloader-title text-3xl font-bold mb-6 text-blue-600 text-center">
          מחולל הורדת סרטוני יוטיוב
        </h2>
        <div className="youtube-downloader-input-group mb-6 text-right">
          <label className="youtube-downloader-label text-lg font-semibold text-gray-800 mb-2">
            קישור לסרטון יוטיוב
          </label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="youtube-downloader-input w-full px-4 py-2 border border-gray-300 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="לדוגמה: https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          />
          {error && (
            <p className="youtube-downloader-error text-red-500 mt-2">{error}</p>
          )}
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleDownload}
            className="youtube-downloader-button bg-blue-500 text-white px-6 py-3 rounded-lg mb-6 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isDownloading}
          >
            {isDownloading ? 'מוריד...' : 'הורד סרטון'}
          </button>
        </div>
        {videoInfo && (
          <div className="youtube-downloader-info mt-6 text-center">
            <p className="youtube-downloader-title text-gray-800 break-words mb-4">
              *כותרת הסרטון:* {videoInfo.title}
            </p>
            <p className="youtube-downloader-upload-date text-gray-800 break-words mb-4">
              *תאריך יציאת הסרטון:* {videoInfo.uploadDate}
            </p>
            <p className="youtube-downloader-view-count text-gray-800 break-words mb-4">
              *מספר צפיות:* {videoInfo.viewCount}
            </p>
            <div className="flex justify-center gap-4">
              <a
                href={`https://contactlinks.onrender.com${videoInfo.videoPath}`}
                target="_blank"
                rel="noopener noreferrer"
                className="youtube-downloader-view-link bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                פתח את הסרטון
              </a>
              <button
                onClick={handleDownloadClick}
                className="youtube-downloader-download-link bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                הורד לזיכרון המחשב
              </button>
              <button
                onClick={handleShareClick}
                className="youtube-downloader-share-link bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                שתף
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="youtube-downloader-instructions w-full md:w-1/2 text-right animate-fade-in-fast">
        <h3 className="youtube-downloader-instructions-title text-lg font-bold mb-4 text-dark-blue">
          איך להשתמש במחולל הורדת סרטוני יוטיוב
        </h3>
        <p className="youtube-downloader-instructions-text mb-2 animate-fade-in-fast">
          <strong>היי! רוצים להוריד סרטון יוטיוב בקלות?</strong> הנה מדריך פשוט איך להשתמש במחולל ההורדה שלנו
        </p>
        <p className="youtube-downloader-instructions-text mb-2 animate-fade-in-fast">
          <strong>הזינו את קישור הסרטון</strong>
        </p>
        <ul className="youtube-downloader-instructions-list mb-2 text-right animate-fade-in-fast">
          <li>בשדה הקישור, רשמו את קישור הסרטון מיוטיוב</li>
          <li>לדוגמה: https://www.youtube.com/watch?v=dQw4w9WgXcQ</li>
        </ul>
        <p className="youtube-downloader-instructions-text mb-2 animate-fade-in-fast">
          <strong>לחצו על כפתור ההורדה</strong>
        </p>
        <ul className="youtube-downloader-instructions-list mb-2 text-right animate-fade-in-fast">
          <li>לחצו על הכפתור "הורד סרטון"</li>
          <li>המערכת תתחיל להוריד את הסרטון ותקבלו מידע על הסרטון שהורדתם</li>
        </ul>
        <p className="youtube-downloader-instructions-text mb-2 animate-fade-in-fast">
          <strong>הורידו את הסרטון למחשב</strong>
        </p>
        <ul className="youtube-downloader-instructions-list mb-2 text-right animate-fade-in-fast">
          <li>לאחר ההורדה, תוכלו להוריד את הסרטון למחשב על ידי לחיצה על כפתור "הורד למחשב"</li>
        </ul>
      </div>
    </div>
  );
};

export default YouTubeDownloader;
