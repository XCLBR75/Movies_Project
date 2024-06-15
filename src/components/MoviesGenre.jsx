import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function MoviesGenre({ match }) {
    const { genreId } = useParams();
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        axios.defaults.baseURL = 'http://localhost:5000';

        // Fetch movies based on genreId
        axios.get(`/api/movies/genre/${genreId}`)
            .then(response => {
                console.log('Genre Movies data:', response.data);
                setMovies(response.data);
            })
            .catch(error => {
                console.error('Error fetching movies by genre:', error);
            });
    }, [genreId]); // Depend on genreId changes

    return (
        <div className="mt-12">
            <div className="mb-8 font-bold text-2xl text-center">
                Movies by Genre
            </div>

            <table className="w-full border-collapse border border-gray-200">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-200 px-4 py-2">#</th>
                        <th className="border border-gray-200 px-4 py-2">Title</th>
                        <th className="border border-gray-200 px-4 py-2">Year</th>
                        <th className="border border-gray-200 px-4 py-2">Episodes</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map((movie, index) => (
                        <tr key={movie.id} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                            <td className="border border-gray-200 px-4 py-2">{index + 1}</td>
                            <td className="border border-gray-200 px-4 py-2">
                                <Link to={`/watchPage/${movie.id}`} className="text-blue-500 hover:underline">{movie.titla_movive}</Link>
                            </td>
                            <td className="border border-gray-200 px-4 py-2">{movie.year}</td>
                            <td className="border border-gray-200 px-4 py-2">{movie.list_episodes}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default MoviesGenre;
