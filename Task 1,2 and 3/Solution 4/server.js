const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const movieModel = require('./movie-model.js');

const app = express();

// Parse urlencoded bodies
app.use(bodyParser.json()); 

// Serve static content in directory 'files'
app.use(express.static(path.join(__dirname, 'files')));

// Configure a 'get' endpoint for all movies..
app.get('/movies', function (req, res) {
  res.send(Object.values(movieModel));
})

// Configure a 'get' endpoint for a specific movie
app.get('/movies/:imdbID', function (req, res) {
  const imdbID = req.params.imdbID;
  const movie = movieModel[imdbID];
  if (!movie)
    res.sendStatus(404);
  else
    res.send(movie);
})

app.put('/movies/:imdbID', function (req,res) {
  const imdbID = req.params.imdbID;
  const movieData = req.body;

  if (movieModel.hasOwnProperty(imdbID)) {
    movieModel[imdbID] = movieData;
    res.sendStatus(200);
  } else {
    movieModel[imdbID] = movieData;
    res.status(201).json(movieData);
  }
}) 



app.listen(3000)

console.log("Server now listening on http://localhost:3000/")
