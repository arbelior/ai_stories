const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const storyRoutes = require('./routes/story.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Log the absolute path of uploads directory
const uploadsPath = path.join(__dirname, '../uploads');
console.log('Uploads directory absolute path:', uploadsPath);

// Serve static files from the uploads directory
app.use('/uploads', express.static(uploadsPath));

// Add a test route to check if files exist
app.get('/check-file/:filename', (req, res) => {
  const filePath = path.join(uploadsPath, req.params.filename);
  if (fs.existsSync(filePath)) {
    res.send(`File exists at ${filePath}`);
  } else {
    res.send(`File does not exist at ${filePath}`);
  }
});

// Routes
app.use('/api', storyRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 