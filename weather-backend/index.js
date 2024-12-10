const express = require('express');
const cors = require('cors');
require('dotenv').config(); 
const app = express();

const corsOptions = {
    origin: ['https://weatherappnew-bh46.onrender.com'], 
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions)); 

const apiKey = process.env.VITE_API_KEY; 

app.get('/api/key', (req, res) => {
    res.json({ apiKey }); 
});


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
