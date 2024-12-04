const express = require('express');
const cors = require('cors');// מידל וור שמאפשר גישה ממקורות אחרים. 
require('dotenv').config(); //מאפשר לגשת לקובץ .env ולהשתמש במידע בו
const app = express();

const corsOptions = {
    origin: 'https://weatherappnew-bh46.onrender.com', 
};

app.use(cors(corsOptions));
 // מאפשר לכל הדומיינים לגשת לשרת כברירת מחדל.


const apiKey = process.env.VITE_API_KEY; // טוען את ה API key מהקובץ .env


app.get('/api/key', (req, res) => {
    res.json({ apiKey }); // לוקח את האובייקט { apiKey } ממיר אותו לפורמט של גייסון ושולח אותו כתגובה 
});


//מפעיל את השרת
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});