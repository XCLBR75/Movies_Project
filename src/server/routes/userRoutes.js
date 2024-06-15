const express = require('express');
const userHandler = require('../handlers/userHandler');
const userRouter = express.Router();

// Route to register a new user
userRouter.post('/signup', userHandler.registerUser);

// Route to login a user
userRouter.post('/login', userHandler.loginUser);

// Route to check if a user is logged in
userRouter.get('/checkLoggedIn', userHandler.checkLoggedIn);

// Route to logout a user
userRouter.get('/logout', userHandler.logoutUser);

// Route to check if a user is an admin
userRouter.get('/checkAdmin', userHandler.checkAdmin);

// Route to get all users
userRouter.get('/userlist', userHandler.getAllUsers);

// Route to delete user
userRouter.delete('/userlist/:id', userHandler.deleteUser);

module.exports = userRouter;
