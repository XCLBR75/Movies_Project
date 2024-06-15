const db = require('../db'); // Assuming you have a db.js file for database connection

// Get all episodes
const getEpisodes = (req, res) => {
    const query = 'SELECT * FROM episodes';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching episodes:', err);
            res.status(500).json({ error: 'Failed to fetch episodes' });
        } else {
            res.json(results);
        }
    });
};

// Get an episode by ID
const getEpisodeById = (req, res) => {
    const { id } = req.params; 
    const query = 'SELECT * FROM episodes WHERE id_episode = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error fetching episode:', err);
            res.status(500).json({ error: 'Failed to fetch episode' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ message: 'Episode not found' });
            return;
        }
        res.json(results[0]);
    });
};

// Add an episode to a movie
const addEpisode = (req, res) => {
    const { id_episode, linkphim, episode, movie_id } = req.body;

    const episodeQuery = 'INSERT INTO episodes (id_episode, linkphim, episode, movie_id) VALUES (?, ?, ?, ?)';
    db.query(episodeQuery, [id_episode, linkphim, episode, movie_id], (err, results) => {
        if (err) {
            console.error('Error adding episode:', err);
            res.status(500).json({ error: 'Failed to add episode' });
            return;
        }

        // Successfully added episode, now update list_episodes in movies table
        const updateQuery = 'UPDATE movies SET list_episodes = list_episodes + 1 WHERE id = ?';
        db.query(updateQuery, [movie_id], (err, updateResult) => {
            if (err) {
                console.error('Error updating list_episodes:', err);
                res.status(500).json({ error: 'Failed to update list_episodes' });
                return;
            }

            res.status(201).json({ message: 'Episode added', id: results.insertId });
        });
    });
};


// Update an episode
const updateEpisode = (req, res) => {
    const { id } = req.params;
    const { linkphim, episode, movie_id } = req.body;
    const query = 'UPDATE episodes SET linkphim = ?, episode = ?, movie_id = ? WHERE id_episode = ?';
    db.query(query, [linkphim, episode, movie_id, id], (err, results) => {
        if (err) {
            console.error('Error updating episode:', err);
            res.status(500).json({ error: 'Failed to update episode' });
            return;
        }
        res.json({ message: 'Episode updated' });
    });
};

// Delete an episode
const deleteEpisode = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM episodes WHERE id_episode = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error deleting episode:', err);
            res.status(500).json({ error: 'Failed to delete episode' });
            return;
        }
        res.json({ message: 'Episode deleted' });
    });
};

const getEpisodesByMovieId = (req, res) => {
    const { movieId } = req.params;
    const query = 'SELECT * FROM episodes WHERE movie_id = ?';

    db.query(query, [movieId], (err, results) => {
        if (err) {
            console.error('Error fetching episodes by movie ID:', err);
            res.status(500).json({ error: 'Failed to fetch episodes' });
            return;
        }

        if (results.length === 0) {
            res.status(404).json({ message: 'No episodes found for the movie ID' });
            return;
        }

        res.json(results);
    });
};

module.exports = { getEpisodes, getEpisodeById, addEpisode, updateEpisode, deleteEpisode, getEpisodesByMovieId };
