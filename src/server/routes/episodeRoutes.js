const express = require('express');
const router = express.Router();
const episodeHandler = require('../handlers/episodeHandler'); 

// Route to get all episodes
router.get('/episodes', episodeHandler.getEpisodes);

// Route to get an episode by ID
router.get('/episodes/:id', episodeHandler.getEpisodeById);

// Route to get an episodes by movieID
router.get('/episodes/movie/:movieId', episodeHandler.getEpisodesByMovieId);

// Route to add a new episode
router.post('/episodes', episodeHandler.addEpisode);

// Route to update an episode
router.put('/episodes/:id', episodeHandler.updateEpisode);

// Route to delete an episode
router.delete('/episodes/:id', episodeHandler.deleteEpisode);

module.exports = router;
