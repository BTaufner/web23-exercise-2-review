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
    const moviesJSON = Object.values(movieModel);
    
  res.json(moviesJSON)
})

// Configure a 'get' endpoint for a specific movie
app.get('/movies/:imdbID', function (req, res) {
  /* Task 2.1. Remove the line below and add the 
    functionality here */
    const imdbID = req.params.imdbID;
    const movie = movieModel[imdbID];
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

     app.put('/movies/:imdbID', function(req, res) {
      let id = req.params.imdbID
        if(movieModel.hasOwnProperty(id)){
      movieModel[id] = req.body
      res.sendStatus(200)
      }else{
      movieModel[id] = req.body
      res.sendStatus(201)
      res.send(req.body)
    }
    });
    
    
    

app.listen(3000)

console.log("Server now listening on http://localhost:3000/")
