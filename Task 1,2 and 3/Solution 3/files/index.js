window.onload = function () {
  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    const bodyElement = document.querySelector("body");
    if (xhr.status == 200) {
      const movies = JSON.parse(xhr.responseText);
      for (const movie of movies) {
        const movieContainer = createMovieContainer(movie);
        bodyElement.appendChild(movieContainer);
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

function createMovieContainer(movie) {
  const container = document.createElement("article");
  container.id = movie.imdbID;

  const elementsToAppend = [
    createPoster(movie.Title, movie.Poster),
    createMovieTitle(movie.Title),
    createEditButton(movie.imdbID),
    createMovieDetails(movie.Runtime, movie.Released),
    createGenres(movie.Genres),
    createPlot(movie.Plot),
    createListTitle("Directors", movie.Directors),
    createList(movie.Directors),
    createListTitle("Writers", movie.Writers),
    createList(movie.Writers),
    createListTitle("Actors", movie.Actors),
    createList(movie.Actors)
  ];

  appendToContainer(container, ...elementsToAppend);
  
  return container;
}

function createPoster(title, poster) {
  const img = document.createElement("img");
  img.src = poster;
  img.alt = `Movie poster of ${title}`;

  return img;
}

function createMovieTitle(title) {
  const h1 = document.createElement("h1");
  h1.innerText = title;

  return h1;
}

function createMovieDetails(runtime, released) {
  const p = document.createElement("p");

  p.innerHTML = `
      <span>${formatRuntime(runtime)}</span>
      <span>\u{2022}</span>
      <span>${getLocalDateString(released)}</span>
  `;

  return p;
}

function createGenres(genres) {
  const p = document.createElement("p");

  const genreSpans = genres
      .map(genre => `<span class="genre">${genre}</span>`)
      .join("");

  p.innerHTML = genreSpans;

  return p;
}

function createListTitle(title, list) {
  const h2 = document.createElement("h2");
  h2.innerText = list.length > 1 ? title : title.slice(0, -1);

  return h2;
}

function createList(list) {
  const ul = document.createElement("ul");

  const listItems = list
      .map(listItem => `<li>${listItem}</li>`)
      .join("");

  ul.innerHTML = listItems;

  return ul;
}

function createPlot(plot) {
  const p = document.createElement("p");
  p.innerText = plot;

  return p;
}

function getLocalDateString(dateString) {
  const date = new Date(dateString);
  
  return `Released on ${date.toLocaleDateString()}`;
}

function formatRuntime(runtime) {
  const hours = Math.trunc( runtime / 60 );
  const minutes = runtime % 60;
  
  return `Runtime ${hours}h ${minutes}min`;
}

function appendToContainer(container, ...elements) {
  elements.forEach(element => {
      container.appendChild(element);
  });
}

function createEditButton(movieId) {
  const p = document.createElement("p");
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = "Edit";
  p.appendChild(button);

  button.addEventListener('click', () => {
    location.href = `edit.html?imdbID=${movieId}`;
  });

  return p;
}