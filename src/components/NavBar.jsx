import React, { useState } from 'react';
import axios from 'axios';
import Logo from "../download.png";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext'; // Import useAuth hook for authentication

function NavBar() {
  const { loggedIn, isAdmin, logout } = useAuth(); // Destructure loggedIn, isAdmin, and logout from useAuth hook
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const navigate = useNavigate();

  const fetchAutocompleteResults = async (query) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`http://localhost:5000/api/search?q=${query}`);
      setSearchResults(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching autocomplete results:', error);
      setIsLoading(false);
    }
  };

  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query.trim() !== '') {
      fetchAutocompleteResults(query);
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchResultClick = (result) => {
    setSelectedMovie(result); // Set the selected movie
    setSearchQuery(result.titla_movive); // Set searchQuery to display selected title
    setSearchResults([]); // Clear autocomplete results on selection
  };

  const handleWatchButtonClick = () => {
    // Navigate to the watch page based on the selected movie's ID
    if (selectedMovie) {
      navigate(`/watchPage/${selectedMovie.id}`);
    }
  };

  return (
    <div className="border flex items-center justify-between pl-3 py-4 pr-3 relative">
      <div className='flex items-center space-x-8'>
        <Link to="/" className=''>
          <img src={Logo} alt="Logo" className='w-[50px]' />
        </Link>
        <h3 className='text-blue-600 font-bold'><Link to="/Movies">Movies</Link></h3>
        <h3 className='text-blue-600 font-bold'><Link to="/genres">Genres</Link></h3>
        {isAdmin && (
          <h3 className='text-blue-600 font-bold'><Link to="/admin">AdminPage</Link></h3>
        )}
      </div>
      <div className='flex flex-grow max-w-[400px] space-x-4 relative'>
        <input
          type='text'
          name='search'
          className='border-2 rounded-xl border-blue-400 w-full px-4 py-2'
          placeholder='Search...'
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        {isLoading && (
          <div className="absolute top-12 left-0 right-0 bg-white border border-gray-300 shadow-lg rounded-lg mt-2 py-2 px-4">
            <p className="text-gray-600">Loading...</p>
          </div>
        )}
        {searchResults.length > 0 && (
          <div className="absolute top-12 left-0 right-0 bg-white border border-gray-300 shadow-lg rounded-lg mt-2 py-2 px-4">
            {searchResults.map((result, index) => (
              <div
                key={index}
                className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
                onClick={() => handleSearchResultClick(result)}
              >
                {result.titla_movive}
              </div>
            ))}
          </div>
        )}
        {/* Button to watch movie */}
        <button
          className="border-2 border-blue-400 px-4 py-2 rounded-xl"
          onClick={handleWatchButtonClick}
        >
          Watch
        </button>
      </div>
      <div className='flex justify-center '>
        {loggedIn ? (
          <>
            <button className='border-2 border-r-0 p-2 rounded-l-xl border-blue-400' onClick={logout}>Sign out</button>
            {/* Add profile circle component here */}
            <div className="profile-circle"></div>
          </>
        ) : (
          <>
            <Link to="/login" className='border-2 border-r-0 p-2 rounded-l-xl border-blue-400'>Sign in</Link>
            <Link to="/signUp" className='border-2 p-2 rounded-r-xl border-blue-400'>Sign up</Link>
          </>
        )}
      </div>
    </div>
  )
}

export default NavBar;
