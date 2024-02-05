const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const db = new sqlite3.Database('database.db');

const morgan = require('morgan');
//app.use(morgan('combined')); // uncomment to turn on server side logging

app.use(bodyParser.json());
app.use(express.static('public'));

// Your routes and app logic go here...
app.get('/words', (req, res) => {
    // Fetch words from the database and send them to the client
});

app.post('/words', (req, res) => {
    // Add a new word to the database
});

// Serve your index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
