const express = require('express');
const adressController = require('./controllers/adress-controller');
const authController = require('./controllers/auth-controller');
const aserController = require('./controllers/user-controller');

const routes = express.Router();

routes.post('/busca-endereco', adressController.index);
routes.post('/authenticate', authController.authorize);
routes.post('/user', aserController.create);



module.exports = routes;