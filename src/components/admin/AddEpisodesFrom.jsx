import React, { useState } from 'react';
import axios from 'axios';

const AddEpisodesForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    id_episode: '',
    linkphim: '',
    episode: '',
    movie_id: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make POST request to backend API to add new episode
      const response = await axios.post('http://localhost:5000/api/episodes', formData);
      console.log('Episode added successfully:', response.data);
      // Call onSubmit prop function to handle further actions (e.g., updating state)
      onSubmit(formData);
      // Clear form data after successful submission
      setFormData({
        id_episode: '',
        linkphim: '',
        episode: '',
        movie_id: ''
      });
    } catch (error) {
      console.error('Error adding episode:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Add Episode</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Episode ID</label>
          <input
            name="id_episode"
            value={formData.id_episode}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Enter episode ID"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Link</label>
          <input
            name="linkphim"
            value={formData.linkphim}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Enter episode link"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Episode Number</label>
          <input
            name="episode"
            value={formData.episode}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            placeholder="Enter episode number"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Movie ID</label>
          <input
            name="movie_id"
            value={formData.movie_id}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            placeholder="Enter movie ID"
          />
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl" type="submit">Add Episode</button>
      </form>
    </div>
  );
};

export default AddEpisodesForm;
