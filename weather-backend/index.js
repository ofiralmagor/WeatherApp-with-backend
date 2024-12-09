const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();  

const app = express();

app.use(cors());

const apiKey = process.env.VITE_API_KEY;


app.get('/api/key', (req, res) => {
    res.json({ apiKey });
});



const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
