import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import fs from 'fs';
import { youtubeHandler } from './youtubeHandler.js';

const app = express();
const PORT = 3000;

// מקבל את הנתיב לספרייה הנוכחית
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// הגדרת CORS
app.use(cors());

app.use(express.json());
app.use('/videos', express.static(path.join(__dirname, 'videos')));

// יצירת ספריית 'videos' אם היא לא קיימת
const videosDir = path.join(__dirname, 'videos');
if (!fs.existsSync(videosDir)) {
  fs.mkdirSync(videosDir);
}

app.post('/download', youtubeHandler);

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
