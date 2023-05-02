window.onload = function () {
  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    const bodyElement = document.querySelector("body");
    if (xhr.status == 200) {
      const movies1 = JSON.parse(xhr.responseText);
      for (const movies of movies1) {
        /* Task 1.3. Add your code from exercise 1 here 
           and include a non-functional 'Edit' button
           to pass this test */
           let article = document.createElement('article');
           article.setAttribute('id', movies.imdbID);
           //console.log(article.getAttribute('imdbid'));
           
                        let image = document.createElement('img');
                        let headerTitle = document.createElement('h1');
                        let buttonP = document.createElement('p');
                        let buttonElement = document.createElement('button');
                        let pElementMovie = document.createElement('p');
                        let spanRuntime = document.createElement('span');
                        let runtimeMin = movies.Runtime % 60;
                        let runtimeHours = ((movies.Runtime - runtimeMin) / 60);
                        let spanBullet = document.createElement('span');
                        let bullet = '8226';
                        let spanReleasedate = document.createElement('span');
                        let releaseDate = new Date(movies.Released).toLocaleDateString();
                        let pElementGenre = document.createElement('p');
                        let pElementPlot = document.createElement('p');
                        let headerDirector = document.createElement('h2');
                        let listOfDirectors = document.createElement('ul');
                        let headerWriter = document.createElement('h2');
                        let listOfWriters = document.createElement('ul');
                        let headerActor = document.createElement('h2');
                        let listOfActors = document.createElement('ul'); 

                        image.src = movies.Poster;
                        article.appendChild(image);

                        headerTitle.textContent = movies.Title;
                        article.appendChild(headerTitle);

                        buttonElement.type = 'button';
                        buttonElement.textContent = 'Edit';

                        buttonElement.addEventListener('click', () => {
                          
                          const imdbID = buttonElement.dataset.imdbId;
                          
                          window.location.href = `edit.html?imdbID=${imdbID}`;
                        });

                        buttonP.append(buttonElement);
                        article.appendChild(buttonP);
                        
                        spanRuntime.textContent = ("Runtime " + runtimeHours + "h " + runtimeMin + "m");
                        pElementMovie.appendChild(spanRuntime);

                        spanBullet.textContent = String.fromCharCode(bullet);
                        pElementMovie.appendChild(spanBullet);
                        
                        spanReleasedate.textContent = ("Released on " + releaseDate);
                        pElementMovie.append(spanReleasedate);

                        article.appendChild(pElementMovie);
                        
                        for(genres of movies.Genres){
                            let genre = document.createElement('span');
                            genre.textContent = genres;
                            genre.className = 'genre';
                            pElementGenre.appendChild(genre);
                        }
                        article.appendChild(pElementGenre);
                        
                        pElementPlot.textContent = movies.Plot;
                        article.appendChild(pElementPlot);
                        
                        headerDirector.append("Director");
                        article.appendChild(headerDirector);

                        for(directors of movies.Directors){
                            let director = document.createElement('li');
                            director.textContent = directors;
                            listOfDirectors.appendChild(director);
                        }
                        article.appendChild(listOfDirectors);

                        headerWriter.append("Writer");
                        article.appendChild(headerWriter);

                        for(writers of movies.Writers){
                            let writer = document.createElement('li');
                            writer.textContent = writers;
                            listOfWriters.appendChild(writer);
                        }
                        article.appendChild(listOfWriters);

                        headerActor.append("Actor");
                        article.appendChild(headerActor);

                        for(actors of movies.Actors){
                            let actor = document.createElement('li');
                            actor.textContent = actors;
                            listOfActors.appendChild(actor);
                        }
                        article.appendChild(listOfActors);
                        
                        

                        bodyElement.appendChild(article);
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