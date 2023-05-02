window.onload = function () {
    const xhr = new XMLHttpRequest()
    xhr.onload = function () {
      const bodyElement = document.querySelector("body")
      if (xhr.status == 200) {
        const movies = JSON.parse(xhr.responseText);
        for (const movie of movies) {
          let movieString = "";
          movieString += `
                          <article id="${movie.imdbID}">
                              <img src="${movie.Poster}">
                              <h1>${movie.Title}</h1>
                              <p><button type="button" onclick="location.href='edit.html?imdbID=${movie.imdbID}'">Edit</button></p>
                              <p><span>Runtime ${Math.floor(movie.Runtime / 60)}h ${movie.Runtime % 60}min</span><span>•</span><span>Released on ${new Date(movie.Released).toLocaleDateString()
          }</span></p>
                              <p>`;
          for (const genre of movie.Genres) {
            movieString += `<span class="genre">${genre}</span>`;
          }
          movieString += `</p>
                              <p>${movie?.Plot}</p>
                              <h2>Directors</h2>
                              <ul>`;
          for (const director of movie?.Directors) {
            movieString += `<li>${director}</li>`;
          }
          movieString += `</ul>
                              <h2>Writers</h2>
                              <ul>`
  
          for (const writer of movie?.Writers) {
            movieString += `<li>${writer}</li>`;
          }
          movieString += `</ul>
                              <h2>Actors</h2>
                              <ul>`;
  
          for (const actor of movie?.Actors) {
            movieString += `<li>${actor}</li>`;
          }
          movieString += `</ul>
                      </article>`;
          bodyElement.innerHTML += movieString;
        }
      } else {
        bodyElement.append("Daten konnten nicht geladen werden, Status " + xhr.status + " - " + xhr.statusText)
      }
    }
    xhr.open("GET", "/movies")
    xhr.send()
  };