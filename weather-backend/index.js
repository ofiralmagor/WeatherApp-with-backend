const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();

const apiKey = process.env.VITE_API_KEY; // API Key from .env

// Allow access from frontend URL
const frontendUrl = process.env.FRONTEND_URL || '*'; // Default to '*' for local development
app.use(cors({
    origin: frontendUrl, // Allow requests from the frontend domain
}));


app.get('/api/key', (req, res) => {
    res.json({ apiKey }); // Return API key as JSON
});

// Dynamic port binding
const port = process.env.PORT || 3000; // Use Render's dynamic port or fallback to 3000
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
