import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = ({ onDelete }) => {
    const apiUrl = 'http://localhost:5000/userlist'; 
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(apiUrl);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleDeleteClick = async (id) => {
        try {
            await axios.delete(`${apiUrl}/${id}`);
            setUsers(users.filter(user => user.id_user !== id));
            onDelete(id); // Notify parent component (AdminSidebar) about the deletion
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">User List</h2>
            <table className="w-full border-collapse border border-gray-200">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-200 px-4 py-2">ID</th>
                        <th className="border border-gray-200 px-4 py-2">Username</th>
                        <th className="border border-gray-200 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id_user} className="bg-white">
                            <td className="border border-gray-200 px-4 py-2">{user.id_user}</td>
                            <td className="border border-gray-200 px-4 py-2">{user.username}</td>
                            <td className="border border-gray-200 px-4 py-2">
                                {user.ut_id !== 1 && (
                                    <button
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                        onClick={() => handleDeleteClick(user.id_user)}
                                    >
                                        Delete
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
