// movieHandler.js
const db = require('../db');

// Get all movies
const getMovies = (req, res) => {
  const query = 'SELECT * FROM movies';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching movies:', err);
      res.status(500).json({ error: 'Failed to fetch movies' });
    } else {
      res.json(results);
    }
  });
};

// Get a movie by ID
const getMovieById = (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM movies WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error fetching movie:', err);
      res.status(500).json({ error: 'Failed to fetch movie' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ message: 'Movie not found' });
      return;
    }
    res.json(results[0]);
  });
};

// Add a new movie
const addMovie = (req, res) => {
  const { titla_movive, description, status, image, year, list_episodes } = req.body;
  const query = 'INSERT INTO movies (titla_movive, description, status, image, year, list_episodes) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [titla_movive, description, status, image, year, list_episodes], (err, results) => {
    if (err) {
      console.error('Error adding movie:', err);
      res.status(500).json({ error: 'Failed to add movie' });
      return;
    }
    res.status(201).json({ message: 'Movie added', id: results.insertId });
  });
};

// Update a movie
const updateMovie = (req, res) => {
  const { id } = req.params;
  const { titla_movive, description, status, image, year, list_episodes } = req.body;
  const query = 'UPDATE movies SET titla_movive = ?, description = ?, status = ?, image = ?, year = ?, list_episodes = ? WHERE id = ?';
  db.query(query, [titla_movive, description, status, image, year, list_episodes, id], (err, results) => {
    if (err) {
      console.error('Error updating movie:', err);
      res.status(500).json({ error: 'Failed to update movie' });
      return;
    }
    res.json({ message: 'Movie updated' });
  });
};

const deleteMovie = (req, res) => {
  const { id } = req.params;

  // Queries to delete episodes, movie genres, and the movie
  const deleteEpisodesQuery = 'DELETE FROM episodes WHERE movie_id = ?';
  const deleteMovieGenresQuery = 'DELETE FROM movie_genres WHERE movie_id = ?';
  const deleteMovieQuery = 'DELETE FROM movies WHERE id = ?';

  // Begin a transaction
  db.beginTransaction((err) => {
    if (err) {
      console.error('Error starting transaction:', err);
      res.status(500).json({ error: 'Failed to delete movie' });
      return;
    }

    // Delete episodes first
    db.query(deleteEpisodesQuery, [id], (err, results) => {
      if (err) {
        return db.rollback(() => {
          if (err.code) {
            console.error('Database error deleting episodes:', err.message, 'Code:', err.code);
          } else {
            console.error('Error deleting episodes:', err);
          }
          res.status(500).json({ error: 'Failed to delete movie' });
        });
      }

      // Delete movie genres
      db.query(deleteMovieGenresQuery, [id], (err, results) => {
        if (err) {
          return db.rollback(() => {
            if (err.code) {
              console.error('Database error deleting movie genres:', err.message, 'Code:', err.code);
            } else {
              console.error('Error deleting movie genres:', err);
            }
            res.status(500).json({ error: 'Failed to delete movie' });
          });
        }

        // Delete the movie
        db.query(deleteMovieQuery, [id], (err, results) => {
          if (err) {
            return db.rollback(() => {
              if (err.code) {
                console.error('Database error deleting movie:', err.message, 'Code:', err.code);
              } else {
                console.error('Error deleting movie:', err);
              }
              res.status(500).json({ error: 'Failed to delete movie' });
            });
          }

          // Commit the transaction
          db.commit((err) => {
            if (err) {
              return db.rollback(() => {
                console.error('Error committing transaction:', err);
                res.status(500).json({ error: 'Failed to delete movie' });
              });
            }

            res.json({ message: 'Movie and related episodes and genres deleted' });
          });
        });
      });
    });
  });
};


// Get movies by genre
const getMoviesByGenre = (req, res) => {
  const { genreId } = req.params;
  const query = `
    SELECT m.*
    FROM movies m
    JOIN movie_genres mg ON m.id = mg.movie_id
    WHERE mg.gener_id = ?
  `;
  db.query(query, [genreId], (err, results) => {
    if (err) {
      console.error('Error fetching movies by genre:', err);
      res.status(500).json({ error: 'Failed to fetch movies by genre' });
      return;
    }
    res.json(results);
  });
};

module.exports = { getMovies, getMovieById, addMovie, updateMovie, deleteMovie, getMoviesByGenre };
