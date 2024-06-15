import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

axios.defaults.withCredentials = true; // Ensure cookies are sent with requests

export const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const checkAdminStatus = async () => {
        try {
            const response = await axios.get('http://localhost:5000/checkAdmin');
            console.log('Checking admin status:', response.data); // Log response data
            if (response.data.isAdmin) {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
            }
        } catch (error) {
            console.error('Error checking admin status from Auth:', error);
            setIsAdmin(false);
        }
    };

    const checkLoggedInStatus = async () => {
        try {
            const response = await axios.get('http://localhost:5000/checkLoggedIn');
            console.log('Checking logged in status:', response.data); // Log response data
            if (response.data.loggedIn) {
                setLoggedIn(true);
                await checkAdminStatus(); // Check if the user is an admin
            } else {
                setLoggedIn(false);
                setIsAdmin(false); // Reset admin status if not logged in
            }
        } catch (error) {
            console.error('Error checking logged in status:', error);
            setLoggedIn(false);
            setIsAdmin(false); // Reset admin status on error
        }
    };

    useEffect(() => {
        checkLoggedInStatus();
    }, []);

    const login = async (username, password) => {
        try {
            console.log('Attempting to log in with:', username, password);
            const response = await axios.post('http://localhost:5000/login', { username, password });
            console.log('Login response:', response.data);

            if (response.data.message === 'Login successful') {
                console.log('Auth success', response.data);
                setLoggedIn(true);
                await checkAdminStatus(); // Check if the user is an admin after login
            } else {
                console.error('Login failed:', response.data.error);
                setLoggedIn(false);
                setIsAdmin(false); // Reset admin status on login failure
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setLoggedIn(false);
            setIsAdmin(false); // Reset admin status on error
        }
    };

    const logout = async () => {
        try {
            const response = await axios.get('http://localhost:5000/logout');
            console.log('Logout response:', response.data); // Log logout response
            if (response.data.success) {
                setLoggedIn(false);
                setIsAdmin(false); // Reset admin status on logout
            } else {
                console.error('Logout failed:', response.data.error);
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ loggedIn, isAdmin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
