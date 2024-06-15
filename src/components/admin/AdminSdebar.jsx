import React, { useState } from 'react';
import AddMoviesForm from './AddMoviesForm';
import AddGenresForm from './AddGenersForm';
import AddEpisodesForm from './AddEpisodesFrom';
import MovieList from './MovieList';
import GenreList from './GenreList';
import UserList from './UserList';
import AddMovieToGenre from './AddMovieToGenre';

function AdminSidebar() {
  const [activeForm, setActiveForm] = useState(null);

  return (
    <div className="flex">
      <div className="h-screen border-2 rounded-xl border-blue-400 text-white">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-blue-600">Admin Dashboard</h1>
        </div>
        <nav className="mt-10">
          <a href="#" onClick={() => setActiveForm('movieList')} className={`text-blue-600 border-2 border-t-0 border-r-0 border-l-0 border-blue-400 w-full block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white ${activeForm === 'movieList' ? 'bg-gray-700 text-white' : ''}`}>
            Movie List
          </a>
          <a href="#" onClick={() => setActiveForm('genreList')} className={`text-blue-600 border-2 border-r-0 border-l-0 border-blue-400 w-full block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white ${activeForm === 'genreList' ? 'bg-gray-700 text-white' : ''}`}>
            Genre List
          </a>
          <a href="#" onClick={() => setActiveForm('addMovies')} className={`text-blue-600 border-2 border-t-0 border-r-0 border-l-0 border-blue-400 w-full block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white ${activeForm === 'addMovies' ? 'bg-gray-700 text-white' : ''}`}>
            Add Movies
          </a>
          <a href="#" onClick={() => setActiveForm('addGenres')} className={`text-blue-600 border-2 border-t-0 border-r-0 border-l-0 border-blue-400 w-full block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white ${activeForm === 'addGenres' ? 'bg-gray-700 text-white' : ''}`}>
            Add Genres
          </a>
          <a href="#" onClick={() => setActiveForm('addEpisodes')} className={`text-blue-600 border-2 border-t-0 border-r-0 border-l-0 border-blue-400 w-full block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white ${activeForm === 'addEpisodes' ? 'bg-gray-700 text-white' : ''}`}>
            Add Episodes
          </a>
          <a href="#" onClick={() => setActiveForm('addMovieToGenre')} className={`text-blue-600 border-2 border-t-0 border-r-0 border-l-0 border-blue-400 w-full block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white ${activeForm === 'addMovieToGenre' ? 'bg-gray-700 text-white' : ''}`}>
            Add Movies to Genre
          </a>
          <a href="#" onClick={() => setActiveForm('userList')} className={`text-blue-600 border-2 border-t-0 border-r-0 border-l-0 border-blue-400 w-full block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white ${activeForm === 'userList' ? 'bg-gray-700 text-white' : ''}`}>
            Users
          </a>
        </nav>
      </div>
      <div className="flex-1 p-10 text-2xl font-bold">
        {/* Render different components based on activeForm state */}
        {activeForm === 'addMovies' && <AddMoviesForm />}
        {activeForm === 'addGenres' && <AddGenresForm />}
        {activeForm === 'addEpisodes' && <AddEpisodesForm />}
        {activeForm === 'addMovieToGenre' && <AddMovieToGenre />}
        {activeForm === 'movieList' && <MovieList onDelete={(movieId) => console.log('Delete movie with ID:', movieId)} />} 
        {activeForm === 'genreList' && <GenreList onDelete={(id) => console.log('Delete Genre with ID:', id)} />} 
        {activeForm === 'userList' && <UserList onDelete={(userId) => console.log('Delete user with ID:', userId)} />}
        {activeForm === 'settings' && <div>Settings Content</div>}
      </div>
    </div>
  );
}

export default AdminSidebar;
