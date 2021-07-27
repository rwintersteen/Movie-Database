const express = require('express');
const app = express();
const mysql = require('mysql2');

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '1Bowlingfreak!',
        database: 'movie_db'
    },
    console.log(`Connected to the movie_db database.`)
);

app.get('/api/movies', (req, res) => {
    db.query('SELECT * FROM movies', (err, results) => {
        if(err) {
            throw new Error (err);
        } else {
            res.json(results);
        }
    })
});

app.post('/api/add-movie', (req, res) => {
    db.query(`INSERT INTO movies (movie_name) VALUES ("${req.body.movie_name}")`, (err, results) => {
        if(err) {
            throw new Error (err);
        } else {
            res.json("Successfully added a movie!");
        }
    })
});
