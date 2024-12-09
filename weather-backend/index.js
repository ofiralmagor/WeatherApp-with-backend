const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Enable CORS
app.use(cors());

// Load API Key from .env
const apiKey = process.env.VITE_API_KEY;

// API Route
app.get('/api/key', (req, res) => {
    res.json({ apiKey }); // Send the API key as JSON
});

// Serve React Static Files
app.use(express.static(path.join(__dirname, 'dist')));

// Handle React's Client-Side Routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start Server
const PORT = process.env.PORT || 3000; // Use Render's PORT variable if available
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
