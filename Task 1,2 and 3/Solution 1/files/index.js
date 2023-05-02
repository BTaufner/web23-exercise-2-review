window.onload = function () {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      const bodyElement = document.querySelector("body");
      if (xhr.status == 200) {
          /* Task 1.3. Add your code from exercise 1 here 
             and include a non-functional 'Edit' button
             to pass this test */
        const movieData = JSON.parse(xhr.responseText);
          for (const movie in movieData){
            const article = document.createElement('article');
            const img = new Image();
            const h1 = document.createElement('h1');
            const pButton = document.createElement('p');
            const editButton = document.createElement('button');
            const pBasic = document.createElement('p');
            const spanRuntime = document.createElement('span');
            const spanBullet = document.createElement('span');
            const spanReleased = document.createElement('span');
            const pGenre = document.createElement('p');
            const pPlot = document.createElement('p');
            const h2Directors = document.createElement('h2');
            const ulDirectors = document.createElement('ul');
            const h2Writers = document.createElement('h2');
            const ulWriters = document.createElement('ul');
            const h2Actors = document.createElement('h2');
            const ulActors = document.createElement('ul');
            article.setAttribute('id', movieData[movie].imdbID);
            img.src = movieData[movie].Poster;
            article.append(img);
            h1.innerHTML = movieData[movie].Title;
            article.appendChild(h1);
            editButton.innerHTML = "Edit";
            editButton.onclick = function() {
              location.href = "edit.html?imdbID=" + movieData[movie].imdbID
            }
            pButton.appendChild(editButton);
            article.appendChild(pButton);
            spanRuntime.innerHTML = "Runtime " + Math.trunc(movieData[movie].Runtime / 60) + "h " + (movieData[movie].Runtime - (Math.trunc(movieData[movie].Runtime / 60) * 60)) + "m";
            spanBullet.innerHTML = '\u2022';
            spanReleased.innerHTML = "Released on " + new Date (movieData[movie].Released).toLocaleDateString();
            pBasic.appendChild(spanRuntime);
            pBasic.appendChild(spanBullet);
            pBasic.appendChild(spanReleased);
            article.appendChild(pBasic);
            for (const genre in movieData[movie].Genres){
              const spanGenre = document.createElement('span');
              spanGenre.setAttribute('class', 'genre');
              spanGenre.innerHTML += movieData[movie].Genres[genre];
              pGenre.appendChild(spanGenre);
            }
            article.appendChild(pGenre);
            pPlot.innerHTML = movieData[movie].Plot;
            article.appendChild(pPlot);
            h2Directors.innerHTML = "Directors";
            article.appendChild(h2Directors);
            for (const director in movieData[movie].Directors){
              const directorsList = document.createElement('li');
              directorsList.innerHTML = movieData[movie].Directors[director];
              ulDirectors.appendChild(directorsList);
            }
            article.appendChild(ulDirectors);
            h2Writers.innerHTML = "Writers";
            article.appendChild(h2Writers);
            for (const writer in movieData[movie].Writers){
              const writersList = document.createElement('li');
              writersList.innerHTML = movieData[movie].Writers[writer];
              ulWriters.appendChild(writersList);
            }
            article.appendChild(ulWriters);
            h2Actors.innerHTML = "Actors";
            article.appendChild(h2Actors);
            for (const actor in movieData[movie].Actors){
              const actorsList = document.createElement('li');
              actorsList.innerHTML = movieData[movie].Actors[actor];
              ulActors.appendChild(actorsList);
            }
            article.appendChild(ulActors);
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