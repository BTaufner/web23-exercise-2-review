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
app.get('/movies', (req, res) => {
  res.status(200);
  res.json(Object.values(movieModel));
})

// Configure a 'get' endpoint for a specific movie
app.get('/movies/:imdbID', (req, res) => {
  if (!req.params.imdbID) {
    res.sendStatus(404);
    return;
  }
  const resultMovie = movieModel[req.params.imdbID];
  if (resultMovie) {
    res.status(200);
    res.json(resultMovie);
  } else {
    res.sendStatus(204);
  }
})

app.put('/movies/:imdbID', (req, res) => {
  res.status(200)
  if(!req.params.imdbID){
    res.sendStatus(404);
    return;
  }
  if(!movieModel[req.params.imdbID]){
    res.status(201);
  }
  const newMovie = req.body

  movieModel[req.params.imdbID] = newMovie;
  res.json(newMovie);
})

/* Task 3.1 and 3.2.
   - Add a new PUT endpoint
   - Check whether the movie sent by the client already exists 
     and continue as described in the assignment */

app.listen(3000)

console.log("Server now listening on http://localhost:3000/")
