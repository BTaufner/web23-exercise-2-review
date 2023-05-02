/* Task 1.1. Add your movie data here 
   and export it so it's available in server.js */

   const tt0084789 = {
      imdbID: `tt0084789`,
      Title: `The Thing`,
      Released: `1982-06-25`,
      Runtime: 109,
      Genres: [`Horror`, `Mystery`, `Sci-Fi`],
      Directors: [`John Carpenter`],
      Writers: [`Bill Lancaster`, `John W. Campbell Jr.`],
      Actors: [`Kurt Russell`, `Wilford Brimley`, `Keith David`],
      Plot: `A research team in Antarctica is hunted by a shape-shifting alien that assumes the appearance of its victims.`,
      Poster:
        `https://m.media-amazon.com/images/M/MV5BNGViZWZmM2EtNGYzZi00ZDAyLTk3ODMtNzIyZTBjN2Y1NmM1XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg`,
      Metascore: 57,
      imdbRating: 8.2,
    };

    const tt0126029 = {
        imdbID:'tt0126029',
        Title: "Shrek",
        Released: "2001-05-18",
        Runtime: 90,
        Genres: [
            "Animation",
            "Adventure",
            "Comedy"
        ],
        Directors: [
            "Andrew Adamson",
            "Vicky Jenson"
        ],
        Writers: [
            "William Steig, Ted Elliott", 
            "Terry Rossio"
        ],
        Actors: [
            "Mike Myers",
            "Eddie Murphy",
            "Cameron Diaz"
          ],
        Plot: "A mean lord exiles fairytale creatures to the swamp of a grumpy ogre, who must go on a quest and rescue a princess for the lord in order to get his land back.",
        Poster: "https://m.media-amazon.com/images/M/MV5BOGZhM2FhNTItODAzNi00YjA0LWEyN2UtNjJlYWQzYzU1MDg5L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
        Metascore: 84,
        imdbRating: 7.9,
    };

    const tt0076759 = {
        imdbID:'tt0076759',
        Title: "Shrek2",
        Released: "2001-05-18",
        Runtime: 90,
        Genres: [
            "Animation",
            "Adventure",
            "Comedy"
        ],
        Directors: [
            "Andrew Adamson",
            "Vicky Jenson"
        ],
        Writers: [
            "William Steig, Ted Elliott", 
            "Terry Rossio"
        ],
        Actors: [
            "Mike Myers",
            "Eddie Murphy",
            "Cameron Diaz"
          ],
        Plot: "A mean lord exiles fairytale creatures to the swamp of a grumpy ogre, who must go on a quest and rescue a princess for the lord in order to get his land back.",
        Poster: "https://m.media-amazon.com/images/M/MV5BOGZhM2FhNTItODAzNi00YjA0LWEyN2UtNjJlYWQzYzU1MDg5L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
        Metascore: 84,
        imdbRating: 7.9,
    }

    module.exports.tt0084789 = tt0084789;
    module.exports.tt0076759 = tt0076759;
    module.exports.tt0126029 = tt0126029;

   console.log(module);