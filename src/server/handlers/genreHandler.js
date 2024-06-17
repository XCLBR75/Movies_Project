const db = require('../db');

// Get all genres
const getGenres = (req, res) => {
    const query = 'SELECT * FROM geners';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching genres:', err);
            res.status(500).json({ error: 'Failed to fetch genres' });
        } else {
            res.json(results);
        }
    });
};

// Get a genre by ID
const getGenreById = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM geners WHERE id_geners = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error fetching genre:', err);
            res.status(500).json({ error: 'Failed to fetch genre' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ message: 'Genre not found' });
            return;
        }
        res.json(results[0]);
    });
};

// Add a new genre
const addGenre = (req, res) => {
    const { title, description, status } = req.body;
    const query = 'INSERT INTO geners (title, description, status) VALUES (?, ?, ?)';
    db.query(query, [title, description, status], (err, results) => {
        if (err) {
            console.error('Error adding genre:', err);
            res.status(500).json({ error: 'Failed to add genre' });
            return;
        }
        res.status(201).json({ message: 'Genre added', id: results.insertId });
    });
};

// Get genres by movie ID
const getGenresByMovieId = (req, res) => {
    const { movieId } = req.params;
    const query = `
        SELECT g.* 
        FROM geners g
        JOIN movie_genres mg ON g.id_geners = mg.gener_id
        WHERE mg.movie_id = ?
    `;
    db.query(query, [movieId], (err, results) => {
        if (err) {
            console.error('Error fetching genres for movie:', err);
            res.status(500).json({ error: 'Failed to fetch genres for movie' });
            return;
        }
        res.json(results);
    });
};

// Update a genre
const updateGenre = (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const query = 'UPDATE geners SET title = ?, description = ?, status = ? WHERE id_geners = ?';
    db.query(query, [title, description, status, id], (err, results) => {
        if (err) {
            console.error('Error updating genre:', err);
            res.status(500).json({ error: 'Failed to update genre' });
            return;
        }
        res.json({ message: 'Genre updated' });
    });
};

const deleteGenre = (req, res) => {
    const { id } = req.params;

    // First delete from movie_genres where genre_id matches
    const deleteMovieGenresQuery = 'DELETE FROM movie_genres WHERE gener_id = ?';
    db.query(deleteMovieGenresQuery, [id], (err, results) => {
        if (err) {
            console.error('Error deleting from movie_genres:', err);
            res.status(500).json({ error: 'Failed to delete associated movie genres' });
            return;
        }

        // Then delete from genres where id matches
        const deleteGenreQuery = 'DELETE FROM geners WHERE id_geners = ?';
        db.query(deleteGenreQuery, [id], (err, results) => {
            if (err) {
                console.error('Error deleting genre:', err);
                res.status(500).json({ error: 'Failed to delete genre' });
                return;
            }
            res.json({ message: 'Genre deleted' });
        });
    });
};


// Add a movie to a genre
const addMovieToGenre = (req, res) => {
    const { id_movie, id_geners } = req.body;
    const query = 'INSERT INTO movie_genres (movie_genres_id, movie_id, gener_id) VALUES (?, ?, ?)';
    const movie_genres_id = `${id_movie}-${id_geners}`;

    db.query(query, [movie_genres_id, id_movie, id_geners], (err, results) => {
        if (err) {
            console.error('Error adding movie to genre:', err);
            res.status(500).json({ error: 'Failed to add movie to genre' });
            return;
        }
        res.status(201).json({ message: 'Movie added to genre', id: results.insertId });
    });
};

module.exports = { getGenres, getGenreById, addGenre, updateGenre, deleteGenre, addMovieToGenre, getGenresByMovieId};
