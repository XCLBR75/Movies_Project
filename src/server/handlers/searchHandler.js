const db = require('../db');

// Function to search movies by title
const searchMovies = (req, res) => {
    const { q } = req.query; // Get the search query from request query parameters
    const query = `SELECT id, titla_movive FROM movies WHERE titla_movive LIKE '%${q}%'`; // Include id in the query

    db.query(query, [`%${q}%`], (err, results) => {
        if (err) {
            console.error('Error searching movies:', err);
            res.status(500).json({ error: 'Failed to search movies' });
            return;
        }

        // Return array of movie objects with id and title
        res.json(results);
    });
};

module.exports = { searchMovies };
