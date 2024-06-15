import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Genres() {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    // Configure base URL for Axios
    axios.defaults.baseURL = 'http://localhost:5000'; // Assuming your backend server is running on port 5000

    // Fetch genres data from the backend API
    axios.get('/api/genres')
      .then(response => {
        setGenres(response.data);
      })
      .catch(error => {
        console.error('Error fetching genres:', error);
      });
  }, []);

  return (
    <div className="mt-12">
      <div className="mb-8 font-bold text-2xl text-center">
        All Genres
      </div>

      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-200 px-4 py-2">#</th>
            <th className="border border-gray-200 px-4 py-2">Title</th>
            <th className="border border-gray-200 px-4 py-2">Description</th>
          </tr>
        </thead>
        <tbody>
          {genres.map((genre, index) => (
            <tr key={genre.id_geners} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
              <td className="border border-gray-200 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-200 px-4 py-2">
                <Link to={`/moviegenre/${genre.id_geners}`} className="text-blue-500 hover:underline">{genre.title}</Link>
              </td>
              <td className="border border-gray-200 px-4 py-2">{genre.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Genres;
