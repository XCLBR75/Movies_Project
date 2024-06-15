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

// Delete a movie
const deleteMovie = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM movies WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error deleting movie:', err);
      res.status(500).json({ error: 'Failed to delete movie' });
      return;
    }
    res.json({ message: 'Movie deleted' });
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
