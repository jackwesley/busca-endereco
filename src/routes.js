const express = require('express');
const adressController = require('./controllers/adress-controller');
const authController = require('./controllers/auth-controller');
const aserController = require('./controllers/user-controller');
const authService = require('./services/auth-service');

const routes = express.Router();

routes.post('/busca-endereco', authService.authorize, adressController.index);
routes.post('/authenticate', authController.authenticacte);
routes.post('/user', aserController.create);



module.exports = routes;