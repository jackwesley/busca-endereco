const express = require('express');
const BuscaEndereco = require('./controllers/BuscaEnderecoPorCep');
const AuthController = require('./controllers/AuthController');
const routes = express.Router();

routes.post('/busca-endereco', BuscaEndereco.index);
routes.post('/authenticate', AuthController.index);



module.exports = routes;