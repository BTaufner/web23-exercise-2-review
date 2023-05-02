const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const movies = require('./movie-model.js');

const app = express();

// Parse urlencoded bodies
app.use(bodyParser.json()); 

// Serve static content in directory 'files'
app.use(express.static(path.join(__dirname, 'files')));

app.get('/movies', (req, res) => {
  Object.keys(movies).length === 0 ? res.sendStatus(404) : res.json(Object.values(movies));
});

app.get('/movies/:imdbID', (req, res) => {
  const movie = movies[req.params.imdbID];
  movie ? res.json(movie) : res.sendStatus(404);
});

app.put('/movies/:imdbID', (req, res) => {
  const { imdbID } = req.params;
  const movie = req.body;

  const status = movies[imdbID] ? 200 : 201;
  movies[imdbID] = movie;
  res.sendStatus(status);
});

app.listen(3000)

console.log("Server now listening on http://localhost:3000/")
