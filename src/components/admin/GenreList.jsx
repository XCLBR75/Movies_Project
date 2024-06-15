import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GenreList = ({ onDelete }) => {
    const apiUrl = 'http://localhost:5000/api/genres'; 
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        fetchGenres();
    }, []);

    const fetchGenres = async () => {
        try {
            const response = await axios.get(apiUrl);
            setGenres(response.data);
        } catch (error) {
            console.error('Error fetching genres:', error);
        }
    };

    const handleDeleteClick = async (id) => {
        try {
            await axios.delete(`${apiUrl}/${id}`);
            setGenres(genres.filter(genre => genre.id_geners !== id));
            onDelete(id); // Notify parent component (AdminSidebar) about the deletion
        } catch (error) {
            console.error('Error deleting genre:', error);
        }
    };


    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Genre List</h2>
            <table className="w-full border-collapse border border-gray-200">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-200 px-4 py-2">ID</th>
                        <th className="border border-gray-200 px-4 py-2">Name</th>
                        <th className="border border-gray-200 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {genres.map(genre => (
                        <tr key={genre.id_geners} className="bg-white">
                            <td className="border border-gray-200 px-4 py-2">{genre.id_geners}</td>
                            <td className="border border-gray-200 px-4 py-2">{genre.title}</td>
                            <td className="border border-gray-200 px-4 py-2">
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                    onClick={() => handleDeleteClick(genre.id_geners)}
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

export default GenreList;
