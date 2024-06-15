import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function WatchPage() {
    const { movieId } = useParams();
    const [episodes, setEpisodes] = useState([]);
    const [videoSrc, setVideoSrc] = useState('');

    useEffect(() => {
        axios.defaults.baseURL = 'http://localhost:5000';

        axios.get(`/api/episodes/movie/${movieId}`)
            .then(response => {
                console.log('Episodes data:', response.data); // Log response to verify structure
                // Sort episodes based on episode number
                const sortedEpisodes = response.data.sort((a, b) => a.episode - b.episode);
                setEpisodes(sortedEpisodes);

                // Set default videoSrc to the first episode's linkphim
                if (sortedEpisodes.length > 0) {
                    const firstEpisode = sortedEpisodes[0];
                    const defaultVideoSrc = extractYouTubeUrl(firstEpisode.linkphim);
                    setVideoSrc(defaultVideoSrc);
                }
            })
            .catch(error => {
                console.error('Error fetching episodes:', error);
            });
    }, [movieId]);

    // Extract the YouTube video URL from the linkphim string
    const extractYouTubeUrl = (linkphim) => {
        const srcRegex = /src="([^"]+)"/;
        const match = linkphim.match(srcRegex);

        if (match && match.length > 1) {
            return match[1];
        } else {
            return '';
        }
    };

    // Function to handle episode button click
    const handleEpisodeClick = (episodeNumber) => {
        const selectedEpisode = episodes.find(ep => ep.episode === episodeNumber);
        if (selectedEpisode) {
            const newVideoSrc = extractYouTubeUrl(selectedEpisode.linkphim);
            setVideoSrc(newVideoSrc);
        }
    };

    // Render episode buttons dynamically based on the number of episodes
    const renderEpisodeButtons = () => {
        return episodes.map((episode) => (
            <button key={episode.id_episode} onClick={() => handleEpisodeClick(episode.episode)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded m-1">
                {episode.episode}
            </button>
        ));
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-4xl w-full h-[700px]">
                <h1 className="text-white text-2xl font-bold mb-3">Watch Video</h1>
                <div className="aspect-w-16 aspect-h-10 mb-4 h-[500px]">
                    <iframe
                        className="w-full h-full"
                        src={videoSrc}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
                <div className="flex justify-between items-center">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Like
                    </button>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        Dislike
                    </button>
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Share
                    </button>
                </div>

                <div className="flex mt-2 flex-wrap">
                    {renderEpisodeButtons()}
                </div>
            </div>
        </div>
    );
}

export default WatchPage;
