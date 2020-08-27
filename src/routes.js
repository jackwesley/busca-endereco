const express = require('express');
const BuscaEndereco = require('./controllers/BuscaEnderecoPorCep');

const routes = express.Router();

routes.post('/busca-endereco', BuscaEndereco.index);


module.exports = routes;