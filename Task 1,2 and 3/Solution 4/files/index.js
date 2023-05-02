window.onload = function () {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      const bodyElement = document.querySelector("body");
      if (xhr.status == 200) {
        const movies = JSON.parse(xhr.responseText);
        for (const movie of movies) {
          let article = document.createElement('article');
          article.setAttribute('id', movie.imdbID);
          
          let poster = document.createElement('img');
          poster.src = movie.Poster;
  
          let title = document.createElement('h1');
          title.textContent = movie.Title;
  
          let pbutton = document.createElement('p');
          let button = document.createElement('button');
          button.textContent = "Edit";
          button.onclick = function() {
            location.href = 'edit.html?imdbID=' + movie.imdbID
        }
          pbutton.append(button);
  
          let subtitle = document.createElement('p');
  
          let runtime = document.createElement('span');
          let hours = Math.trunc(movie.Runtime / 60);
          let minutes = movie.Runtime % 60;
          runtime.textContent = "Runtime " + hours + "h " + minutes + "m";
          subtitle.append(runtime);
  
          let bullet = document.createElement('span');
          bullet.textContent = '\u{2022}';
          subtitle.append(bullet);
  
          let date = document.createElement('span');
          let localdate = new Date(movie.Released);
          date.textContent = "Released on " + localdate.toLocaleDateString();
          subtitle.append(date);
  
  
          let genres = document.createElement('p');
          for (i of movie.Genres) {
            let genre = document.createElement('span');
            genre.classList.add('genre');
            genre.textContent = i;
            genres.append(genre);
          }
  
          let plot = document.createElement('p');
          plot.textContent = movie.Plot;
  
  
          let directors = document.createElement('h2');
          directors.textContent = "Directors";
  
          let listOfDirectors = document.createElement('ul');
  
          for (i of movie.Directors) {
            let name = document.createElement('li');
            name.textContent = i;
            listOfDirectors.append(name);
          }
  
  
          let writers = document.createElement('h2');
          writers.textContent = "Writers";
  
          let listOfWriters = document.createElement('ul');
  
          for (i of movie.Writers) {
            let name = document.createElement('li');
            name.textContent = i;
            listOfWriters.append(name);
          }
  
          let actors = document.createElement('h2');
          actors.textContent = "Actors";
  
          let listOfActors = document.createElement('ul');
  
          for (i of movie.Actors) {
            let name = document.createElement('li');
            name.textContent = i;
            listOfActors.append(name);
          }
  
          article.append(poster, title, pbutton, subtitle, genres, plot, directors,
            listOfDirectors, writers, listOfWriters, actors, listOfActors);
          bodyElement.append(article);
        }
  
      } else {
        bodyElement.append(
          "Daten konnten nicht geladen werden, Status " +
          xhr.status +
          " - " +
          xhr.statusText
        );
      }
    };
    xhr.open("GET", "/movies");
    xhr.send();
  };