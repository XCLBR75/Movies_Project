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

// Delete a genre
const deleteGenre = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM geners WHERE id_geners = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error deleting genre:', err);
            res.status(500).json({ error: 'Failed to delete genre' });
            return;
        }
        res.json({ message: 'Genre deleted' });
    });
};

module.exports = { getGenres, getGenreById, addGenre, updateGenre, deleteGenre };
