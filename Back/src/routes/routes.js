const userRoutes = require('./userRoutes')
const express = require('express');
const Router = express.Router();


Router.use('/user', userRoutes);

module.exports = Router;