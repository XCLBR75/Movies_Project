const express = require('express');
const router = express.Router();
const genreHandler = require('../handlers/genreHandler');

// Route to get all genres
router.get('/genres', genreHandler.getGenres);

// Route to get a single genre by ID
router.get('/genres/:id', genreHandler.getGenreById);

// Route to add a new genre
router.post('/genres', genreHandler.addGenre);

// Route to update a genre
router.put('/genres/:id', genreHandler.updateGenre);

// Route to delete a genre
router.delete('/genres/:id', genreHandler.deleteGenre);


module.exports = router;
