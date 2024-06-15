import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Movies from './components/Movies';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import WatchPage from './components/WatchPage';
import Login from './components/Login';
import SignUp from './components/SignUp';
import AddAdmin from './components/AddAdmin';
import AdminPage from './components/AdminPage';
import MoviesGenre from './components/MoviesGenre';
import AdminSidebar from './components/admin/AdminSdebar';
import { AuthProvider, useAuth } from './components/contexts/AuthContext';
import Genres from './components/Genres';
import MainPage from './components/MainPage';

function PrivateRoute({ adminOnly = false }) {
    const { loggedIn, isAdmin } = useAuth();
    const location = useLocation();

    if (!loggedIn) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (adminOnly && !isAdmin) {
      return <Navigate to="/" replace />;
    }

    return <Outlet />;
}

function App() {

  const { loggedIn, logout } = useAuth(); // Use context for login status

  return (
    <Router>
      <AuthProvider>
        <div>
          <NavBar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/" element={<MainPage />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/genres" element={<Genres />} />
            <Route path="/moviegenre/:genreId" element={<MoviesGenre />} />

            {/* Private Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/watchPage/:movieId" element={<WatchPage />} />
            </Route>

            {/* Admin Only Routes */}
            <Route element={<PrivateRoute adminOnly={true} />}>
              <Route path="/admin" element={<AdminSidebar />} />
              <Route path="/addAdmin" element={<AddAdmin />} />
              <Route path="/adminPage" element={<AdminPage />} />
            </Route>
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;

