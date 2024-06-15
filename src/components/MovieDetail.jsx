import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function MovieDetail() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    // Configure base URL for Axios
    axios.defaults.baseURL = 'http://localhost:5000';

    // Fetch movie details by ID
    axios.get(`/api/movies/${movieId}`)
      .then(response => {
        setMovie(response.data);
      })
      .catch(error => {
        console.error('Error fetching movie:', error);
      });

    // Fetch episodes data from the backend API
    axios.get(`/api/episodes/movie/${movieId}`)
      .then(response => {
        const sortedEpisodes = response.data.sort((a, b) => a.episode - b.episode);
        setEpisodes(sortedEpisodes);
      })
      .catch(error => {
        console.error('Error fetching episodes:', error);
      });
    // Fetch genres data for the movie
    axios.get(`/api/genres/${movieId}`)
      .then(response => {
        if (Array.isArray(response.data)) { // Check if the response is an array
          setGenres(response.data);
        } else {
          console.error('Error: Genres response is not an array', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching genres:', error);
      });

  }, [movieId]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="p-2 bg-gray-600 text-lg text-center border-2 rounded-lg border-black text-white">
        {movie.titla_movive}
      </h1>
      <div className="right flex items-center text-white bg-gray-800 p-2 mb-2 rounded-lg box-border text-center">
        <div className="w-[25%] p-1 bg-black flex items-center justify-center">
          <img
            src={movie.image || 'https://via.placeholder.com/60x80?text=Loading'}
            alt={movie.titla_movive}
            className="object-contain max-h-64"
          />
        </div>
        <div className="left w-[75%] ml-[10px]">
          <div className="name_order p-[2px] mb-5">{movie.titla_movive}</div>
          <div className="genre_list p-[2px] mb-5 flex justify-center">

          </div>
          <div className="status p-[2px] mb-5">{movie.status === 1 ? 'Hoàn thành' : 'Chưa hoàn thành'}</div>
          <div className="year p-[2px] mb-5">{movie.year}</div>
        </div>
      </div>

      <div className="body">
        <div className="list-episode bg-gray-800 p-4 mb-4 rounded-md box-border">
          <div className="text-white font-bold text-lg mb-4 border-b-2 border-dashed border-gray-700 pb-4">
            <span className="text-white">Danh sách tập</span>
            <div className="flex flex-wrap justify-center max-h-300 overflow-auto overflow-x-hidden pr-10">
              {episodes.map((episode) => (
                <Link
                  key={episode.id_episode}
                  to={`/watchPage/${episode.movie_id}/${episode.episode}`}
                  className="w-1/6 border-2 border-gray-600 p-2 m-1 text-center"
                >
                  {episode.episode}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="desc bg-gray-800 p-4 mb-4 rounded-lg box-border text-white">
          <h2>Nội dung</h2>
          <p>{movie.description}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
