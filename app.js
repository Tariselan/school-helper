const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 3000;

const db = new sqlite3.Database('database.db');

// Your routes and app logic go here...
app.get('/words', (req, res) => {
    // Fetch words from the database and send them to the client
});

app.post('/words', (req, res) => {
    // Add a new word to the database
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
