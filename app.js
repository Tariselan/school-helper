const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

const db = new sqlite3.Database('database.db');

const morgan = require('morgan');
//app.use(morgan('combined')); // uncomment to turn on server side logging

app.use(bodyParser.json());
app.use(express.static('public'));


//  **MAORI**  //

// Route to fetch words from the 'maori' table
app.get('/maori', (req, res) => {
    db.all('SELECT * FROM maori', (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json(rows);
        }
    });
});

// Route to add a new word to the 'maori' table
app.post('/maori', (req, res) => {
    const { word, meaning } = req.body;
    db.run('INSERT INTO maori (word, meaning) VALUES (?, ?)', [word, meaning], function (err) {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json({ word, meaning });
        }
    });
});

// Route to remove a word from the 'maori' table
app.delete('/maori/:word', (req, res) => {
    const word = req.params.word;
    db.run('DELETE FROM maori WHERE word = ?', word, function(err) {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json({ message: 'Word deleted successfully' });
        }
    });
});

//  **FRENCH**  //
// Route to fetch words from the 'french' table
app.get('/french', (req, res) => {
    db.all('SELECT * FROM french', (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json(rows);
        }
    });
});

// Route to add a new word to the 'french' table
app.post('/french', (req, res) => {
    const { word, meaning } = req.body;
    db.run('INSERT INTO french (word, meaning) VALUES (?, ?)', [word, meaning], function (err) {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json({ word, meaning });
        }
    });
});

// Route to remove a word from the 'french' table
app.delete('/french/:word', (req, res) => {
    const word = req.params.word;
    db.run('DELETE FROM french WHERE word = ?', word, function(err) {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json({ message: 'Word deleted successfully' });
        }
    });
});

// Serve your index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Te motu, kei te wāhi ${PORT} te motu`);
});
