import React, { useState } from 'react';
import AddMoviesForm from './AddMoviesForm';
import AddGenresForm from './AddGenersForm';
import AddEpisodesForm from './AddEpisodesFrom';
import AddMovieTitlesForm from './AddMovieTitleForm'; // Import form

function AdminSidebar() {
  const [activeForm, setActiveForm] = useState(null);

  const handleAddMovie = (movieData) => {
    fetch('/api/movies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(movieData)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  const handleAddGenre = (genreData) => {
    fetch('/api/genres', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(genreData)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  const handleAddEpisode = (episodeData) => {
    fetch('/api/episodes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(episodeData)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  const handleAddMovieTitle = (movieTitleData) => {
    fetch('/api/movie_titles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(movieTitleData)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <div className="flex">
      <div className="h-screen border-2 rounded-xl border-blue-400 text-white">
        {/*  */}
        <div className="p-4">
          <h1 className="text-2xl font-bold text-blue-600 ">Admin Dashboard</h1>
        </div>
        <nav className="mt-10">
          <a href="#" onClick={() => setActiveForm('dashboard')} className="text-blue-600 border-2 border-r-0 border-l-0 border-blue-400 w-full block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
            Dashboard
          </a>
          <a href="#" onClick={() => setActiveForm('addMovies')} className="text-blue-600 border-2 border-t-0 border-r-0 border-l-0 border-blue-400 w-full block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
            Add Movies
          </a>
          <a href="#" onClick={() => setActiveForm('addGenres')} className="text-blue-600 border-2 border-t-0 border-r-0 border-l-0 border-blue-400 w-full block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
            Add Genres
          </a>
          <a href="#" onClick={() => setActiveForm('addEpisodes')} className="text-blue-600 border-2 border-t-0 border-r-0 border-l-0 border-blue-400 w-full block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
            Add Episodes
          </a>
          <a href="#" onClick={() => setActiveForm('addMovieTitles')} className="text-blue-600 border-2 border-t-0 border-r-0 border-l-0 border-blue-400 w-full block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
            Add Movie Titles
          </a>
          <a href="#" onClick={() => setActiveForm('users')} className="text-blue-600 border-2 border-t-0 border-r-0 border-l-0 border-blue-400 w-full block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
            Users
          </a>
          <a href="#" onClick={() => setActiveForm('settings')} className="text-blue-600 border-2 border-t-0 border-r-0 border-l-0 border-blue-400 w-full block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
            Settings
          </a>
          <a href="#" onClick={() => setActiveForm('logout')} className="text-blue-600 border-2 border-t-0 border-r-0 border-l-0 border-blue-400 w-full block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
            Logout
          </a>
        </nav>
      </div>
      <div className="flex-1 p-10 text-2xl font-bold">
        {activeForm === 'addMovies' && <AddMoviesForm onSubmit={handleAddMovie} />}
        {activeForm === 'addGenres' && <AddGenresForm onSubmit={handleAddGenre} />}
        {activeForm === 'addEpisodes' && <AddEpisodesForm onSubmit={handleAddEpisode} />}
        {activeForm === 'addMovieTitles' && <AddMovieTitlesForm onSubmit={handleAddMovieTitle} />} {/* Add this line */}
        {activeForm === 'dashboard' && <div>Dashboard Content</div>}
        {activeForm === 'users' && <div>Users Content</div>}
        {activeForm === 'settings' && <div>Settings Content</div>}
        {activeForm === 'logout' && <div>Logout Content</div>}
      </div>
    </div>
  );
}

export default AdminSidebar;
