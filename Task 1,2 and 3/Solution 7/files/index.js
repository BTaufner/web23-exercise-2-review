window.onload = function () {
  const xhr = new XMLHttpRequest()
  xhr.onload = function () {
      const bodyElement = document.querySelector("body")
      if (xhr.status == 200) {
          const movies = JSON.parse(xhr.responseText)
          movies.forEach((movie) => {
              const movieContainer = createMovieContainer(movie)
              bodyElement.appendChild(movieContainer)
          })
      } else {
          bodyElement.append(
              "Daten konnten nicht geladen werden, Status " +
              xhr.status +
              " - " +
              xhr.statusText
          )
      }
  }
  xhr.open("GET", "/movies")
  xhr.send()
}

function createMovieContainer(movie) {
  const container = document.createElement("article")

  container.id = movie.imdbID

  //Poster
  const img = document.createElement("img")
  img.src = movie.Poster
  img.alt = "Movie poster"
  container.appendChild(img)

  //Title
  const h1 = document.createElement("h1")
  h1.innerText = movie.Title
  container.appendChild(h1)

  //Button
  const buttonElement = document.createElement("button")
  buttonElement.id = "edit-btn"
  buttonElement.textContent = "Edit"
  buttonElement.onclick = function () {
      location.href = 'edit.html?imdbID=' + movie.imdbID
  }
  const pEditButton = document.createElement("p")
  pEditButton.appendChild(buttonElement)
  container.appendChild(pEditButton)

  //Runtime, Release Date
  const pRuntimeReleaseDate = document.createElement("p")

  const runtime = document.createElement("span")
  const dot = document.createElement("span")
  const released = document.createElement("span")

  const hours = Math.trunc(movie.Runtime / 60)
  const minutes = movie.Runtime % 60

  runtime.innerText = "Runtime " + hours + "h " + minutes + "min"
  dot.innerText = "\u{2022}"
  const date = new Date(movie.Released)
  released.innerText = "Released on " + date.toLocaleDateString()

  pRuntimeReleaseDate.appendChild(runtime)
  pRuntimeReleaseDate.appendChild(dot)
  pRuntimeReleaseDate.appendChild(released)

  container.appendChild(pRuntimeReleaseDate)

  //Genres
  const pElementGenre = document.createElement("p")

  movie.Genres.forEach((genre) => {
      const span = document.createElement("span")
      span.innerText = movie.Genres
      span.classList.add("genre")
      pElementGenre.appendChild(span)
  })
  container.appendChild(pElementGenre)

  //Plot
  const pElementDescription = document.createElement("p")
  pElementDescription.innerText = movie.Plot
  container.appendChild(pElementDescription)

  //Director
  const h2ElementDirector = document.createElement("h2")
  h2ElementDirector.innerText = "Director"
  container.appendChild(h2ElementDirector)
  const pElementDirector = document.createElement("p")
  pElementDirector.innerText = movie.Directors

  const ulElementDirector = document.createElement("ul")
  for (let i = 0; i < movie.Directors.length; i++) {
      const liElementDirector = document.createElement("li")
      liElementDirector.innerText = movie.Directors[i]
      ulElementDirector.appendChild(liElementDirector)
  }
  container.appendChild(ulElementDirector)

  //Writers
  const h2ElementWriters = document.createElement("h2")
  h2ElementWriters.innerText = "Writers"
  container.appendChild(h2ElementWriters)
  const pElementWriters = document.createElement("p")
  pElementWriters.innerText = movie.Directors

  const ulElementWriters = document.createElement("ul")
  for (let i = 0; i < movie.Writers.length; i++) {
      const liElementWriters = document.createElement("li")
      liElementWriters.innerText = movie.Writers[i]
      ulElementWriters.appendChild(liElementWriters)
  }
  container.appendChild(ulElementWriters)

  //Actors
  const h2ElementActors = document.createElement("h2")
  h2ElementActors.innerText = "Actors"
  container.appendChild(h2ElementActors)
  const pElementActors = document.createElement("p")
  pElementActors.innerText = movie.Directors

  const ulElementActors = document.createElement("ul")
  for (let i = 0; i < movie.Actors.length; i++) {
      const liElementActors = document.createElement("li")
      liElementActors.innerText = movie.Actors[i]
      ulElementActors.appendChild(liElementActors)
  }

  container.appendChild(ulElementActors)

  return container;
}