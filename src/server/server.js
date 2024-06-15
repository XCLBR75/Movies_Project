const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session'); 
const movieRoutes = require('./routes/movieRoutes');
const userRoutes = require('./routes/userRoutes');
const episodeRoutes = require('./routes/episodeRoutes');
const genreRoutes = require('./routes/genreRoutes');
const searchRoutes = require('./routes/searchRoutes');

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true })); // Allow requests from http://localhost:3000 with credentials

// Session middleware configuration
app.use(session({
  secret: 'your-secret-key', // Replace with a secure random string for session encryption
  resave: false,
  saveUninitialized: false,
  // Additional configuration options as needed
}));

// Routes
app.use('/api', movieRoutes);
app.use('', userRoutes); // Assuming user routes handle authentication
app.use('/api', episodeRoutes);
app.use('/api', genreRoutes);
app.use('/api', searchRoutes);

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
