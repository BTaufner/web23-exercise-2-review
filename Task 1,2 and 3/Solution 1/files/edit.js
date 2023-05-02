function setMovie(movie) {

    for (const element of document.forms[0].elements) {
      const name = element.id;
      const value = movie[name];
      
      if (name === "Genres") {
        const options = element.options;
        for (let index = 0; index < options.length; index++) {
          const option = options[index];
          option.selected = value.indexOf(option.value) >= 0;
        }
      } else {
        element.value = value;
      }
    }
  }
  
  function getMovie() {
    const movie = {};
  
    const elements = Array.from(document.forms[0].elements).filter(element => element.id)
  
    for (const element of elements) {
      const name = element.id;
  
      let value;
  
      if (name === "Genres") {
        value = [];
        const options = element.options;
        for (let index = 0; index < options.length; index++) {
          const option = options[index];
          if (option.selected) {
            value.push(option.value);
          }
        }
      } else if (name === "Metascore" || name === "Runtime" || name === "imdbRating") {
          value = Number(element.value);
      } else if (name === "Actors" || name === "Directors" || name === "Writers") {
        value = element.value.split(",").map((item) => item.trim());
      } else {
        value = element.value;
      }
  
      movie[name] = value;
    }
  
    return movie;
  }
  
  function putMovie() {
    /* Task 3.3. 
      - Get the movie data using getMovie()
      - Configure the XMLHttpRequest to make a PUT to /movies/:imdbID
      - Set the 'Content-Type' appropriately for JSON data
      - Configure the function below as the onload event handler
      - Send the movie data as JSON
    */
    const movieData = getMovie();
    const imdbID = movieData.imdbID;
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', `/movies/` + imdbID);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
      if (xhr.status == 200 || xhr.status === 204) {
        location.href = 'index.html'
      } else {
        alert("Saving of movie data failed. Status code was " + xhr.status)
      }
    }
    xhr.send(JSON.stringify(movieData));
  }
  
  /** Loading and setting the movie data for the movie with the passed imdbID */
  const imdbID = new URLSearchParams(window.location.search).get("imdbID");
  
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "/movies/" + imdbID);
  xhr.onload = function() {
    if (xhr.status === 200) {
      setMovie(JSON.parse(xhr.responseText));
    } else {
      alert("Loading of movie data failed. Status was " + xhr.status + " - " + xhr.statusText);
    } 
  }
  
  xhr.send()