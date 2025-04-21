// server.js
require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors()); // Enable CORS for frontend connection
app.use(express.json()); // Parse JSON requests

// Database Connection (MongoDB Atlas - from your CPD plan)
mongoose.connect(process.env.MONGODB_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes (Example: Study Groups API - Week 2 CRUD focus)
const studyGroupRouter = require('./routes/studyGroups');
app.use('/api/study-groups', studyGroupRouter);

// Test Route (Week 2: Verify server is running)
app.get('/', (req, res) => {
  res.send('Campus Collaboration Backend is running!');
});

// Start Server (Week 2: Environment Setup)
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});