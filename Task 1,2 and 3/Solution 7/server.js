const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const movies = require('./movie-model.js')

const app = express()

// Parse urlencoded bodies
app.use(bodyParser.json())

// Serve static content in directory 'files'
app.use(express.static(path.join(__dirname, 'files')))

// Configure a 'get' endpoint for all movies..
app.get("/movies", function (req, res) {
  if (Object.keys(movies).length === 0) {
    res.sendStatus(404)
  } else {
    res.json(Object.values(movies))
  }
})

app.get("/movies/:imdbID", function (req, res) {
  const movie = movies[req.params.imdbID]
  if (movie) {
    res.json(movie)
  } else {
    res.sendStatus(404)
  }
})

/* Task 3.1 and 3.2.
   - Add a new PUT endpoint
   - Check whether the movie sent by the client already exists
     and continue as described in the assignment */

app.put("/movies/:imdbID", function (req, res) {
  const imdbID = req.params.imdbID
  const movie = req.body

  if (movies[imdbID]) {
    // The movie already exists, update its properties
    movies[imdbID] = movie
    res.sendStatus(200)
  } else {
    // The movie doesn't exist, create a new entry
    movies[imdbID] = movie
    res.sendStatus(201)
  }
})

app.listen(3000)

console.log("Server now listening on http://localhost:3000/")
