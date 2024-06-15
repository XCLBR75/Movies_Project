import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Banner from './Banner'; // Import the Banner component

function MainPage() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        // Configure base URL for Axios
        axios.defaults.baseURL = 'http://localhost:5000'; // Assuming your backend server is running on port 5000

        // Fetch movies data from the backend API
        axios.get('/api/movies')
            .then(response => {
                // Limit the number of movies to 5
                const limitedMovies = response.data.slice(0, 5);
                setMovies(limitedMovies);
            })
            .catch(error => {
                console.error('Error fetching movies:', error);
            });
    }, []);

    return (
        <div>
            <Banner /> {/* Include the Banner component here */}

            <div className="mt-12">
                <div className="mb-8 font-bold text-2xl text-center">
                    Trending Movies
                </div>

                <div className="grid grid-cols-5 gap-8 justify-items-center">
                    {movies.map(movie => (
                        <div
                            key={movie.id}
                            className="relative rounded-xl overflow-hidden"
                            style={{
                                width: '240px',
                                height: '320px',
                                backgroundImage: `url(${movie.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        >
                            <Link to={`/watchPage/${movie.id}`} className="absolute inset-0 flex items-end justify-center text-white text-lg font-bold py-4 px-2 bg-black bg-opacity-0 hover:bg-opacity-50 transition duration-300">
                                <span className="bg-black bg-opacity-50 px-4 py-2 absolute bottom-0 left-0 right-0 text-center">{movie.titla_movive}</span>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MainPage;
