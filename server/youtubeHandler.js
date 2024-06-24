import ytdl from 'ytdl-core';
import fs from 'fs';
import path from 'path';

export async function youtubeHandler(req, res) {
  const { url } = req.body;
  console.log('Received URL:', url);

  try {
    const videoId = ytdl.getURLVideoID(url);
    console.log('Video ID:', videoId);

    const info = await ytdl.getInfo(videoId);
    const videoFormat = ytdl.chooseFormat(info.formats, { quality: '18' });
    console.log('Chosen format:', videoFormat);

    const videoSize = parseInt(videoFormat.contentLength, 10);
    const maxVideoSize = 70 * 1024 * 1024; // 70MB

    if (videoSize > maxVideoSize) {
      return res.status(400).json({ message: `הסרטון גדול מדי (${(videoSize / 1048576).toFixed(1)}MB). אנא נסה סרטון קצר יותר.` });
    }

    const title = info.videoDetails.title;
    const uploadDate = new Date(info.videoDetails.uploadDate).toLocaleDateString();
    const viewCount = info.videoDetails.viewCount;
    const videoStream = ytdl(url, { format: videoFormat });
    const videoPath = path.resolve(`./videos/${videoId}.mp4`);

    const writeStream = fs.createWriteStream(videoPath);
    videoStream.pipe(writeStream);

    writeStream.on('finish', () => {
      console.log('Finished writing video:', videoPath);
      
      fs.access(videoPath, fs.constants.F_OK, (err) => {
        if (err) {
          console.error('Error accessing the video file after writing:', err);
          return res.status(500).json({ message: 'Error accessing the video file after writing.' });
        }
        console.log('Video file accessible:', videoPath);

        setTimeout(() => {
          fs.unlink(videoPath, (err) => {
            if (err) {
              console.error('Error deleting the video:', err);
            } else {
              console.log(`Deleted video ${videoId}.mp4 after 3 minutes`);
            }
          });
        }, 3 * 60 * 1000); // 3 דקות

        res.json({
          videoId,
          title,
          uploadDate,
          viewCount,
          videoPath: `/videos/${videoId}.mp4`,
          message: `הסרטון הוכן בהצלחה (${(videoSize / 1048576).toFixed(1)}MB). הקובץ יימחק לאחר 3 דקות.`
        });
      });
    });

    videoStream.on('error', (err) => {
      console.error('Error downloading the video:', err);
      res.status(500).json({ message: 'הייתה בעיה בהורדת הסרטון. אנא נסה שוב מאוחר יותר.' });
    });

  } catch (error) {
    if (error.statusCode === 410) {
      console.error('Video is no longer available:', error);
      return res.status(410).json({ message: 'הסרטון כבר לא זמין. אנא נסה סרטון אחר.' });
    }
    console.error('Error processing the video:', error);
    res.status(500).json({ message: 'הייתה בעיה בעיבוד הבקשה שלך. אנא נסה שוב מאוחר יותר.' });
  }
}
