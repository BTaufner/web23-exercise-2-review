window.onload = function () {
  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    const bodyElement = document.querySelector("body");
    if (xhr.status == 200) {
      const movies = JSON.parse(xhr.responseText);
      for (const movie of movies) {

       //article
       const article = document.createElement("article")
       article.setAttribute("id", movie.imdbID)
       bodyElement.append(article)

       //img
       const img = document.createElement("img")
       img.src = movie.Poster
       article.append(img)

       //h1
       const h1 = document.createElement("h1")
       h1.innerText = movie.Title
       article.append(h1)

       //button
       const p3 = document.createElement("p")
       article.append(p3)
       const button = document.createElement("button")
       button.innerText = "*Edit*"
       button.setAttribute("button", "console.log('Button clicked!')")
       button.addEventListener('click', function(event){
        location.href = `edit.html?imdbID=${movie.imdbID}`;

       });
       p3.append(button)

       //runtime,bullet,release
       const p = document.createElement("p")
       const runtime = document.createElement("span")
       const hours = Math.trunc(movie.Runtime/60)
       const minutes = movie.Runtime % 60
       runtime.innerText = `Runtime ${hours}h ${minutes}m`

       const bullet = document.createElement("span")
       bullet.innerText = String.fromCharCode(0x2022)

       const released = document.createElement("span")
       released.textContent = "Released on " + new Date(movie.Released).toLocaleDateString()
       
       p.append(runtime,bullet,released)
       article.append(p)  

       //genre
       const p1 = document.createElement("p")

       for (let i = 0; i < movie.Genres.length; i++) {
           const span = document.createElement("span")
           span.innerText = movie.Genres[i]
           span.classList.add("genre")
           p1.append(span)
       }
   
       article.append(p1)

       //plot
       const p2 = document.createElement("p")
       p2.innerText = movie.Plot

       article.append(p2)

       //Directors
       const h2 = document.createElement("h2")
       h2.innerText = "Directors"

       article.append(h2)

       //ul
       const ul = document.createElement("ul")
       ul.setAttribute('id', 'theList')

       for (let i = 0; i < movie.Directors.length; i++) {
           const li = document.createElement("li")

           li.innerText = movie.Directors[i]
           ul.append(li)
       }

       article.append(ul)

       //Writers
       const writers = document.createElement("h2")
       writers.innerHTML = "Writers"

       article.append(writers)

       //ul
       const listwriters = document.createElement("ul")
       listwriters.setAttribute('id', 'theList')

       for (let i = 0; i < movie.Writers.length; i++) {
           const li = document.createElement("li")

           li.innerText = movie.Writers[i]
           listwriters.append(li)
       }

       article.append(listwriters)

       //Actors
       const actors = document.createElement("h2")
       actors.innerText = "Actors"
       
       article.append(actors)

       //ul
       const listactors = document.createElement("ul")

       listactors.setAttribute('id', 'theList')

       for (let i = 0; i < movie.Actors.length; i++) {
           const li = document.createElement("li")

           li.innerText = movie.Actors[i]
           listactors.append(li)
       }

       article.append(listactors)
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