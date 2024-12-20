
const stationRoutes = require('./stationRoutes');
const userRoutes = require('./userRoutes')
const mqttRoutes = require('./mqttRoutes')
const testRoutes = require('./testRoutes')


const express = require('express');
const Router = express.Router();


Router.use('/station', stationRoutes);
Router.use('/test', testRoutes);
Router.use('/user', userRoutes);
Router.use('/mqtt', mqttRoutes)

module.exports = Router;