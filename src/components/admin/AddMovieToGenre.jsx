import React, { useState } from 'react';
import axios from 'axios';

const AddMovieToGenreForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        id_movie: '',
        id_geners: ''
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
            // Make POST request to backend API to add movie to genre
            const response = await axios.post('http://localhost:5000/api/genres/movieadd', formData);
            console.log('Movie added to genre successfully:', response.data);
            // Clear form data after successful submission
            setFormData({
                id_movie: '',
                id_geners: ''
            });
        } catch (error) {
            console.error('Error adding movie to genre:', error);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Add Movie to Genre</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Movie ID</label>
                    <input
                        name="id_movie"
                        value={formData.id_movie}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        placeholder="Enter movie ID"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Genre ID</label>
                    <input
                        name="id_geners"
                        value={formData.id_geners}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        placeholder="Enter genre ID"
                    />
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl" type="submit">Add Movie to Genre</button>
            </form>
        </div>
    );
};

export default AddMovieToGenreForm;
