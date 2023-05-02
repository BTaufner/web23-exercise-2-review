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
  /* Task 1.2. Remove the line below and eturn the movies from 
     the model as an array */
    res.send(Object.values(movieModel));
})

// Configure a 'get' endpoint for a specific movie
app.get('/movies/:imdbID', function (req, res) {
  /* Task 2.1. Remove the line below and add the 
    functionality here */
  const movie = Object.values(movieModel).find(movie => movie.imdbID === req.params.imdbID);
  if (movie) {
    res.send(movie);
  } else {
    res.sendStatus(404);
  }
})

/* Task 3.1 and 3.2.
   - Add a new PUT endpoint
   - Check whether the movie sent by the client already exists 
     and continue as described in the assignment */
app.put('/movies/:imdbID', (req, res) => {
  const imdbID = req.params.imdbID;
  const movieDetails = req.body;
  let existingMovie = false;

  for (const key in movieModel){
    if (movieModel.hasOwnProperty(key)){
      const movie = movieModel[key];
      if (movie.imdbID === imdbID) {
        existingMovie = true;
        movie.imdbID = movieDetails.imdbID;
        movie.Title = movieDetails.Title;
        movie.Released = movieDetails.Released;
        movie.Runtime = movieDetails.Runtime;
        movie.Genres = movieDetails.Genres;
        movie.Directors = movieDetails.Directors;
        movie.Writers = movieDetails.Writers;
        movie.Actors = movieDetails.Actors;
        movie.Plot = movieDetails.Plot;
        movie.Poster = movieDetails.Poster;
        movie.Metascore = movieDetails.Metascore;
        movie.imdbRating = movieDetails.imdbRating;
      }
    };
  }
  if (existingMovie) {
    res.status(200).json(movieModel);
  } else {
    movieModel[movieDetails.imdbID] = movieDetails;
    res.status(201).json(movieDetails);
  }
});    

app.listen(3000)

console.log("Server now listening on http://localhost:3000/")
