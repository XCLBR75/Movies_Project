const express = require('express');
const router = express.Router();
const searchHandler = require('../handlers/searchHandler');

// Route to search movies by title
router.get('/search', searchHandler.searchMovies);

module.exports = router;
