import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MovieList = ({ onDelete }) => {
  const apiUrl = 'http://localhost:5000/api/movies'; 
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(apiUrl);
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      setMovies(movies.filter(movie => movie.id !== id));
      onDelete(id); // Notify parent component (AdminSidebar) about the deletion
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Movie List</h2>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-200 px-4 py-2">ID</th>
            <th className="border border-gray-200 px-4 py-2">Title</th>
            <th className="border border-gray-200 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.map(movie => (
            <tr key={movie.id} className="bg-white">
              <td className="border border-gray-200 px-4 py-2">{movie.id}</td>
              <td className="border border-gray-200 px-4 py-2">{movie.titla_movive}</td>
              <td className="border border-gray-200 px-4 py-2">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  onClick={() => handleDeleteClick(movie.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MovieList;
